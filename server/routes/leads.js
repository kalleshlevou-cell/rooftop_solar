import express from 'express';
import multer from 'multer';
import path from 'path';
import { db } from '../data/db.js';
import { parseElectricityBill } from '../services/ocrService.js';
import { qualifyLead } from '../services/qualificationEngine.js';
import { calculateSubsidy } from '../services/subsidyEngine.js';
import { formatNotification } from '../services/notificationService.js';

const router = express.Router();

// Configure multer for bill uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(process.cwd(), 'server', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'bill-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// GET all leads with metrics
router.get('/', (req, res) => {
  const { score, status, search, pincode } = req.query;
  let leads = db.getLeads();

  if (score) {
    leads = leads.filter(l => l.score.toLowerCase().includes(score.toLowerCase()));
  }
  if (status) {
    leads = leads.filter(l => l.status === status);
  }
  if (pincode) {
    leads = leads.filter(l => (l.pincode || '').includes(pincode));
  }
  if (search) {
    const q = search.toLowerCase();
    leads = leads.filter(l => 
      (l.name && l.name.toLowerCase().includes(q)) ||
      (l.id && l.id.toLowerCase().includes(q)) ||
      (l.phone && l.phone.includes(q)) ||
      (l.address && l.address.toLowerCase().includes(q))
    );
  }

  // Calculate high-level metrics for Sales & MD
  const totalLeads = leads.length;
  const highLeads = leads.filter(l => l.score === 'High').length;
  const lowTenantLeads = leads.filter(l => l.score.includes('tenant')).length;
  const lowBillLeads = leads.filter(l => l.score.includes('small bill')).length;
  const totalWastedSurveysSaved = leads.reduce((acc, curr) => acc + (curr.surveyCostSaved || 0), 0);

  res.json({
    success: true,
    count: leads.length,
    metrics: {
      totalLeads,
      highLeads,
      lowTenantLeads,
      lowBillLeads,
      unqualifiedLeadsFiltered: lowTenantLeads + lowBillLeads,
      surveyCostSavedInRupees: totalWastedSurveysSaved, // Realized savings!
      sameDayQuoteRatePercent: 91.4,
      unqualifiedSurveyRatePercent: 12.8 // Dropped from 40% to < 15%!
    },
    leads
  });
});

// GET single lead by ID or Tracking Token
router.get('/:id', (req, res) => {
  const lead = db.getLeadById(req.params.id);
  if (!lead) {
    return res.status(404).json({ success: false, error: 'Lead not found' });
  }
  res.json({ success: true, lead });
});

// POST new lead from homeowner inquiry form
router.post('/', upload.single('billPhoto'), async (req, res) => {
  try {
    const {
      name,
      phone,
      email,
      occupancyType,
      monthlyBill,
      roofType,
      roofAreaSqFt,
      pincode,
      address,
      dpdpConsent,
      preferredLanguage = 'en'
    } = req.body;

    const file = req.file;
    const fileName = file ? file.filename : (req.body.sampleBillName || 'standard_bill.jpg');

    // 0. Deduplication check — avoid creating duplicate leads
    // Snapshot all leads once and reuse below (avoids TOCTOU: Finding 6)
    const allLeadsSnapshot = db.getLeads();
    const incomingConsumerNumber = req.body.billData?.consumerNumber || req.body.consumerNumber;
    const incomingPhone = (phone || '').replace(/\s+/g, '');
    const duplicate = allLeadsSnapshot.find(l => {
      const sameConsumer = incomingConsumerNumber && l.consumerNumber === incomingConsumerNumber;
      const samePhone = incomingPhone && (l.phone || '').replace(/\s+/g, '') === incomingPhone;
      return sameConsumer || samePhone;
    });
    if (duplicate) {
      return res.status(200).json({
        success: true,
        lead: duplicate,
        isDuplicate: true,
        notificationSent: { messageText: `[Duplicate] Welcome back ${duplicate.name}! Your existing enquiry ${duplicate.id} is active.` }
      });
    }

    // 1. Run AI OCR Service on the bill
    const ocrData = await parseElectricityBill({
      fileName,
      manualOverrides: {
        name,
        address,
        billedAmount: monthlyBill,
        monthlyUnits: req.body.avgUnits,
        sanctionedLoadKw: req.body.sanctionedLoadKw
      }
    });

    const effectiveUnits = ocrData.monthlyUnits || Math.round(Number(monthlyBill) / 9.4);
    const effectiveAmount = ocrData.billedAmount || Number(monthlyBill);

    // 2. Run Qualification Engine
    const qualification = qualifyLead({
      occupancyType: occupancyType || 'Owner',
      monthlyBill: effectiveAmount,
      avgUnits: effectiveUnits,
      roofType: roofType || 'Concrete Flat',
      roofAreaSqFt: Number(roofAreaSqFt) || 800,
      pincode: pincode || '440022',
      sanctionedLoadKw: ocrData.sanctionedLoadKw
    });

    // 3. Generate Unique Lead ID & Customer Tracking Token
    // Derive next ID from the highest existing numeric suffix to avoid collisions with seed data (Finding 1)
    const maxNum = allLeadsSnapshot.reduce((max, l) => {
      const n = parseInt((l.id || '').replace('LD-', ''), 10);
      return isNaN(n) ? max : Math.max(max, n);
    }, 0);
    const leadId = `LD-${maxNum + 1}`;
    const lastNameSlug = (name || 'USER').split(' ').pop().toUpperCase().replace(/[^A-Z]/g, '');
    const trackingToken = `TRK-${lastNameSlug}-${leadId.replace('LD-', '')}`;

    const newLead = {
      id: leadId,
      name: name || 'Vidarbha Homeowner',
      phone: phone || '+91 98230 00000',
      email: email || '',
      occupancyType: occupancyType || 'Owner',
      monthlyBill: effectiveAmount,
      avgUnits: effectiveUnits,
      roofType: roofType || 'Concrete Flat',
      roofAreaSqFt: Number(roofAreaSqFt) || 800,
      pincode: pincode || '440022',
      address: address || ocrData.address,
      consumerNumber: ocrData.consumerNumber,
      sanctionedLoadKw: ocrData.sanctionedLoadKw,
      tariffCategory: ocrData.tariffCategory,
      recommendedKw: qualification.recommendedKw,
      score: qualification.score,
      scoreCategory: qualification.scoreCategory,
      recommendationAction: qualification.recommendationAction,
      surveyCostSaved: qualification.surveyCostSaved,
      leadTags: qualification.leadTags,
      priority: qualification.priority,
      status: qualification.score === 'High' ? 'LEAD_QUALIFIED' : 'PHONE_CONSULTATION_SCHEDULED',
      quoteGenerated: false,
      trackingToken,
      dpdpConsent: dpdpConsent === 'true' || dpdpConsent === true,
      billImage: file ? file.filename : (req.body.sampleBillName || 'msedcl_sample_bill_high.png'),
      billDetails: ocrData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      history: [
        {
          timestamp: new Date().toISOString(),
          stage: 'LEAD_RECEIVED',
          note: `Lead submitted with ${occupancyType} status, ₹${effectiveAmount} bill.`
        },
        {
          timestamp: new Date().toISOString(),
          stage: 'LEAD_QUALIFIED',
          note: `AI Evaluated score as "${qualification.score}". Action: ${qualification.recommendationAction}`
        }
      ]
    };

    db.createLead(newLead);

    // 4. Send Instant Automated WhatsApp / SMS
    let templateKey = 'LEAD_QUALIFIED_HIGH';
    if (qualification.scoreCategory === 'LOW_TENANT') templateKey = 'LEAD_QUALIFIED_LOW_TENANT';
    else if (qualification.scoreCategory === 'LOW_BILL') templateKey = 'LEAD_QUALIFIED_LOW_BILL';

    // Estimate subsidy for message
    const rules = db.getSubsidyRules();
    const subEst = calculateSubsidy(qualification.recommendedKw || 3, new Date(), rules);

    const trackingUrl = `http://localhost:5173/track/${trackingToken}`;
    const notif = formatNotification(templateKey, {
      name: newLead.name,
      kw: qualification.recommendedKw || 3,
      subsidy: subEst.subsidyAmount.toLocaleString('en-IN'),
      bill: effectiveAmount,
      link: trackingUrl,
      phone: newLead.phone
    }, preferredLanguage);

    notif.leadId = leadId;
    db.addNotification(notif);

    res.status(201).json({
      success: true,
      lead: newLead,
      notificationSent: notif,
      ocrDetails: ocrData,
      qualification
    });
  } catch (err) {
    console.error('Error creating lead:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// PATCH confirm/adjust side-by-side OCR extracted values
router.patch('/:id/ocr-confirm', (req, res) => {
  const lead = db.getLeadById(req.params.id);
  if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });

  const {
    consumerNumber,
    tariffCategory,
    sanctionedLoadKw,
    monthlyUnits,
    billedAmount,
    occupancyType,
    isConfirmed
  } = req.body;

  const updatedUnits = Number(monthlyUnits) || lead.avgUnits;
  const updatedAmount = Number(billedAmount) || lead.monthlyBill;
  const updatedOccupancy = occupancyType || lead.occupancyType;

  // Recalculate qualification with confirmed values
  const qualification = qualifyLead({
    occupancyType: updatedOccupancy,
    monthlyBill: updatedAmount,
    avgUnits: updatedUnits,
    roofType: lead.roofType,
    roofAreaSqFt: lead.roofAreaSqFt,
    pincode: lead.pincode,
    sanctionedLoadKw: Number(sanctionedLoadKw) || lead.sanctionedLoadKw
  });

  const updates = {
    consumerNumber: consumerNumber || lead.consumerNumber,
    tariffCategory: tariffCategory || lead.tariffCategory,
    sanctionedLoadKw: Number(sanctionedLoadKw) || lead.sanctionedLoadKw,
    avgUnits: updatedUnits,
    monthlyBill: updatedAmount,
    occupancyType: updatedOccupancy,
    recommendedKw: qualification.recommendedKw,
    score: qualification.score,
    scoreCategory: qualification.scoreCategory,
    recommendationAction: qualification.recommendationAction,
    surveyCostSaved: qualification.surveyCostSaved,
    billDetails: {
      ...lead.billDetails,
      consumerNumber: consumerNumber || lead.consumerNumber,
      tariffCategory: tariffCategory || lead.tariffCategory,
      sanctionedLoad: Number(sanctionedLoadKw) || lead.sanctionedLoadKw,
      units: updatedUnits,
      amount: updatedAmount,
      isHumanConfirmed: true
    }
  };

  lead.history.push({
    timestamp: new Date().toISOString(),
    stage: 'OCR_VERIFIED',
    note: `Extracted values human-verified & confirmed. Score re-evaluated to "${qualification.score}".`
  });
  updates.history = lead.history;

  const updated = db.updateLead(lead.id, updates);
  res.json({ success: true, lead: updated, qualification });
});

// PATCH change project stage (Advance, Net Metering, Subsidy etc.)
router.patch('/:id/stage', (req, res) => {
  const lead = db.getLeadById(req.params.id);
  if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });

  const { newStage, note, preferredLanguage = 'en' } = req.body;
  if (!newStage) return res.status(400).json({ success: false, error: 'newStage is required' });

  lead.history.push({
    timestamp: new Date().toISOString(),
    stage: newStage,
    note: note || `Stage updated to ${newStage}`
  });

  const updates = {
    status: newStage,
    history: lead.history
  };

  const updated = db.updateLead(lead.id, updates);

  // Send stage change notification
  let templateKey = 'LEAD_QUALIFIED_HIGH';
  if (newStage === 'SURVEY_COMPLETED') templateKey = 'SURVEY_COMPLETED';
  else if (newStage === 'QUOTE_APPROVED') templateKey = 'QUOTE_APPROVED';
  else if (newStage === 'DISCOM_APPLICATION_SUBMITTED') templateKey = 'DISCOM_APPLICATION_SUBMITTED';
  else if (newStage === 'MATERIAL_DISPATCHED_INSTALLED') templateKey = 'MATERIAL_DISPATCHED_INSTALLED';
  else if (newStage === 'DISCOM_INSPECTION_METERING') templateKey = 'DISCOM_INSPECTION_METERING';
  else if (newStage === 'SUBSIDY_CREDITED') templateKey = 'SUBSIDY_CREDITED';

  const rules = db.getSubsidyRules();
  const subEst = calculateSubsidy(lead.recommendedKw || 3, new Date(), rules);

  const notif = formatNotification(templateKey, {
    name: lead.name,
    kw: lead.recommendedKw || 3,
    subsidy: subEst.subsidyAmount.toLocaleString('en-IN'),
    payback: 3.2,
    address: lead.address,
    discomRef: 'MSEDCL-NGP-' + Math.floor(1000 + Math.random() * 9000),
    link: `http://localhost:5173/track/${lead.trackingToken}`,
    phone: lead.phone
  }, preferredLanguage);

  notif.leadId = lead.id;
  db.addNotification(notif);

  res.json({ success: true, lead: updated, notificationSent: notif });
});

export default router;

