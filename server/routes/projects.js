import express from 'express';
import { db } from '../data/db.js';
import { formatNotification } from '../services/notificationService.js';

const router = express.Router();

// SLA Thresholds in days for each stage
const STAGE_SLA_DAYS = {
  LEAD_QUALIFIED: 2,
  SURVEY_SCHEDULED: 3,
  SURVEY_COMPLETED: 5,
  QUOTE_APPROVED: 3,
  DISCOM_APPLICATION_SUBMITTED: 10, // MSEDCL Sanction SLA
  MATERIAL_DISPATCHED_INSTALLED: 7,
  DISCOM_INSPECTION_METERING: 10,
  SUBSIDY_CLAIM_FILED: 20 // National portal DBT SLA
};

// GET all projects pipeline view
router.get('/', (req, res) => {
  const leads = db.getLeads();
  // Filter leads that are active projects (not low/rejected)
  const projects = leads.map(l => {
    const quote = db.getQuoteById(l.quoteId || l.id);
    const lastUpdate = new Date(l.updatedAt || l.createdAt);
    const now = new Date();
    const daysAtCurrentStage = Math.max(1, Math.floor((now - lastUpdate) / (1000 * 60 * 60 * 24)));
    const slaDays = STAGE_SLA_DAYS[l.status] || 7;
    const isStuck = daysAtCurrentStage > slaDays && l.status !== 'SUBSIDY_CREDITED' && l.status !== 'PHONE_CONSULTATION_SCHEDULED';

    return {
      ...l,
      quote,
      daysAtCurrentStage,
      slaDays,
      isStuck,
      delayDays: isStuck ? (daysAtCurrentStage - slaDays) : 0
    };
  });

  const stuckProjects = projects.filter(p => p.isStuck);

  res.json({
    success: true,
    totalProjects: projects.length,
    stuckCount: stuckProjects.length,
    projects,
    stuckProjects
  });
});

// GET public customer tracking status by token (no login required)
router.get('/track/:token', (req, res) => {
  const { token } = req.params;
  const lead = db.getLeadById(token);
  if (!lead) {
    return res.status(404).json({ success: false, error: 'Tracking link not found or expired.' });
  }

  const quote = db.getQuoteById(lead.quoteId || lead.id);

  // Standard 8 Stage Timeline for customer display
  const timelineStages = [
    { key: 'LEAD_QUALIFIED', label: '1. Lead Qualified & AI Sized', icon: 'CheckCircle' },
    { key: 'SURVEY_COMPLETED', label: '2. Roof Survey Completed', icon: 'MapPin' },
    { key: 'QUOTE_APPROVED', label: '3. Quote Approved & Advance Paid', icon: 'FileText' },
    { key: 'DISCOM_APPLICATION_SUBMITTED', label: '4. MSEDCL Net Metering Filed', icon: 'Zap' },
    { key: 'MATERIAL_DISPATCHED_INSTALLED', label: '5. Solar Panels & Inverter Installed', icon: 'Sun' },
    { key: 'DISCOM_INSPECTION_METERING', label: '6. Net Meter Tested & Energized', icon: 'Activity' },
    { key: 'SUBSIDY_CLAIM_FILED', label: '7. PM Surya Ghar Subsidy Claim Filed', icon: 'ShieldCheck' },
    { key: 'SUBSIDY_CREDITED', label: '8. ₹78,000 Subsidy Credited to Bank', icon: 'Award' }
  ];

  const stageOrder = timelineStages.map(s => s.key);
  const currentIdx = stageOrder.indexOf(lead.status);

  const formattedTimeline = timelineStages.map((stage, idx) => {
    let state = 'PENDING';
    if (idx < currentIdx || lead.status === 'SUBSIDY_CREDITED') state = 'COMPLETED';
    else if (idx === currentIdx) state = 'CURRENT';

    return {
      ...stage,
      state
    };
  });

  // Available Documents for download in customer portal
  const documents = [
    { name: 'MSEDCL Electricity Bill Copy', type: 'PDF', date: lead.createdAt.split('T')[0], status: 'Verified' },
    { name: 'Technical Feasibility & Survey Report', type: 'PDF', date: lead.createdAt.split('T')[0], status: lead.status !== 'LEAD_QUALIFIED' ? 'Approved' : 'Pending' },
    { name: 'Company A Solar Turnkey Agreement', type: 'PDF', date: lead.updatedAt.split('T')[0], status: quote ? 'Ready' : 'Pending' },
    { name: 'MSEDCL Net Metering Sanction Letter', type: 'PDF', date: '2026-10-18', status: ['DISCOM_APPLICATION_SUBMITTED', 'MATERIAL_DISPATCHED_INSTALLED', 'DISCOM_INSPECTION_METERING', 'SUBSIDY_CLAIM_FILED', 'SUBSIDY_CREDITED'].includes(lead.status) ? 'Sanctioned' : 'Under Process' },
    { name: 'PM Surya Ghar DBT Acknowledgment', type: 'Receipt', date: '2026-10-25', status: lead.status === 'SUBSIDY_CREDITED' ? 'Credited (₹78,000)' : 'Awaiting Commissioning' }
  ];

  res.json({
    success: true,
    tracking: {
      leadId: lead.id,
      trackingToken: lead.trackingToken,
      customerName: lead.name,
      maskedConsumerNumber: lead.billDetails?.maskedConsumerNumber || lead.consumerNumber?.substring(0, 5) + '*****',
      address: lead.address,
      pincode: lead.pincode,
      recommendedKw: lead.recommendedKw || 3,
      currentStatus: lead.status,
      history: lead.history,
      timeline: formattedTimeline,
      quote,
      documents
    }
  });
});

// POST mock payment gateway (Razorpay / UPI simulation)
router.post('/mock-payment', (req, res) => {
  const { leadId, amount, paymentMethod = 'UPI' } = req.body;
  const lead = db.getLeadById(leadId);
  if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });

  const paymentId = 'PAY-MOCK-' + Math.floor(10000000 + Math.random() * 90000000);
  
  lead.history.push({
    timestamp: new Date().toISOString(),
    stage: 'QUOTE_APPROVED',
    note: `Advance payment of ₹${Number(amount).toLocaleString('en-IN')} received successfully via ${paymentMethod} (Txn: ${paymentId}). Project agreement initiated.`
  });

  db.updateLead(lead.id, {
    status: 'QUOTE_APPROVED',
    history: lead.history,
    advancePaymentDetails: {
      paymentId,
      amount: Number(amount),
      method: paymentMethod,
      paidAt: new Date().toISOString()
    }
  });

  // Notify customer
  const notif = formatNotification('QUOTE_APPROVED', {
    name: lead.name,
    link: `http://localhost:5173/track/${lead.trackingToken}`
  });
  notif.leadId = lead.id;
  db.addNotification(notif);

  res.json({
    success: true,
    message: 'Payment received successfully!',
    paymentId,
    newStatus: 'QUOTE_APPROVED'
  });
});

// POST trigger stuck project escalation
router.post('/:id/escalate', (req, res) => {
  const { id } = req.params;
  const lead = db.getLeadById(id);
  if (!lead) return res.status(404).json({ success: false, error: 'Project not found' });

  const escalationNote = `Automated Escalation triggered to MSEDCL Sub-Division Office (Nagpur Urban) for Stage "${lead.status}". SMS reminder sent to client coordinator.`;
  
  lead.history.push({
    timestamp: new Date().toISOString(),
    stage: 'ESCALATION_TRIGGERED',
    note: escalationNote
  });

  db.updateLead(lead.id, {
    history: lead.history,
    isEscalated: true,
    escalatedAt: new Date().toISOString()
  });

  const notif = formatNotification('STUCK_STAGE_REMINDER', {
    leadId: lead.id,
    name: lead.name,
    currentStage: lead.status,
    days: 18,
    slaDays: 10,
    link: `http://localhost:5173/track/${lead.trackingToken}`
  });
  notif.leadId = lead.id;
  db.addNotification(notif);

  res.json({
    success: true,
    message: 'Escalation notice dispatched to DISCOM liaison team and customer updated via WhatsApp.',
    lead
  });
});

export default router;
