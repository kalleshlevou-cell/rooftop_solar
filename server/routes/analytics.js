import express from 'express';
import { db } from '../data/db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const leads = db.getLeads();
  const quotes = db.getQuotes();

  const now = new Date();
  const thisMonth = now.getMonth();
  const thisYear = now.getFullYear();
  const lastMonth = thisMonth === 0 ? 11 : thisMonth - 1;
  const lastMonthYear = thisMonth === 0 ? thisYear - 1 : thisYear;

  const totalLeadsThisMonth = leads.filter(l => {
    const d = new Date(l.createdAt);
    return d.getMonth() === thisMonth && d.getFullYear() === thisYear;
  }).length;

  const totalLeadsLastMonth = leads.filter(l => {
    const d = new Date(l.createdAt);
    return d.getMonth() === lastMonth && d.getFullYear() === lastMonthYear;
  }).length;

  const pctChange = totalLeadsLastMonth > 0
    ? Math.round(((totalLeadsThisMonth - totalLeadsLastMonth) / totalLeadsLastMonth) * 100)
    : null;

  const highCount = leads.filter(l => l.scoreCategory === 'HIGH').length;
  const mediumCount = leads.filter(l => l.scoreCategory === 'MEDIUM').length;
  const lowCount = leads.filter(l => l.scoreCategory === 'LOW_TENANT' || l.scoreCategory === 'LOW_BILL').length;

  const ACTIVE_STAGES = ['QUOTE_APPROVED', 'DISCOM_APPLICATION_SUBMITTED', 'MATERIAL_DISPATCHED_INSTALLED', 'DISCOM_INSPECTION_METERING', 'SUBSIDY_CLAIM_FILED', 'SUBSIDY_CREDITED'];
  const surveysDispatched = leads.filter(l => !['LEAD_QUALIFIED', 'PHONE_CONSULTATION_SCHEDULED'].includes(l.status)).length;
  const quotesBuilt = leads.filter(l => l.quoteGenerated).length;
  const advancesPaid = leads.filter(l => ACTIVE_STAGES.includes(l.status)).length;
  const completed = leads.filter(l => l.status === 'SUBSIDY_CREDITED').length;

  const conversionFunnel = {
    leads: leads.length,
    surveysDispatched,
    quotesBuilt,
    advancesPaid,
    completed
  };

  // Avg days lead-to-quote
  const leadsWithQuote = leads.filter(l => l.quoteId);
  let avgDaysLeadToQuote = null;
  if (leadsWithQuote.length > 0) {
    const totalDays = leadsWithQuote.reduce((acc, l) => {
      const q = quotes.find(q => q.id === l.quoteId);
      if (!q) return acc;
      const diff = (new Date(q.createdAt || q.quoteDate) - new Date(l.createdAt)) / (1000 * 60 * 60 * 24);
      return acc + Math.abs(diff);
    }, 0);
    avgDaysLeadToQuote = Math.round((totalDays / leadsWithQuote.length) * 10) / 10;
  }

  // Avg days quote-to-payment
  const paidLeads = leads.filter(l => ACTIVE_STAGES.includes(l.status) && l.quoteId);
  let avgDaysQuoteToPayment = null;
  if (paidLeads.length > 0) {
    const totalDays = paidLeads.reduce((acc, l) => {
      const q = quotes.find(q => q.id === l.quoteId);
      if (!q) return acc;
      const diff = (new Date(l.updatedAt) - new Date(q.createdAt || q.quoteDate)) / (1000 * 60 * 60 * 24);
      return acc + Math.max(0, diff);
    }, 0);
    avgDaysQuoteToPayment = Math.round((totalDays / paidLeads.length) * 10) / 10;
  }

  const revenuePipeline = advancesPaid * 200000;
  const surveyCostSaved = leads.reduce((acc, l) => acc + (l.surveyCostSaved || 0), 0);

  // Top 5 pincodes
  const pincodeMap = {};
  leads.forEach(l => {
    if (l.pincode) pincodeMap[l.pincode] = (pincodeMap[l.pincode] || 0) + 1;
  });
  const topPincodes = Object.entries(pincodeMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([pincode, count]) => ({ pincode, count }));

  res.json({
    success: true,
    analytics: {
      totalLeadsThisMonth,
      totalLeadsLastMonth,
      pctChange,
      scoreBreakdown: { highCount, mediumCount, lowCount },
      conversionFunnel,
      avgDaysLeadToQuote,
      avgDaysQuoteToPayment,
      revenuePipeline,
      surveyCostSaved,
      topPincodes
    }
  });
});

export default router;
