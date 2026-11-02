import express from 'express';
import { db } from '../data/db.js';
import { calculateSubsidy, calculatePayback } from '../services/subsidyEngine.js';

const router = express.Router();

// GET all quotes
router.get('/', (req, res) => {
  const quotes = db.getQuotes();
  res.json({ success: true, count: quotes.length, quotes });
});

// GET single quote by ID
router.get('/:id', (req, res) => {
  const quote = db.getQuoteById(req.params.id);
  if (!quote) return res.status(404).json({ success: false, error: 'Quote not found' });
  res.json({ success: true, quote });
});

// POST calculate / preview quote without saving
router.post('/calculate', (req, res) => {
  try {
    const {
      systemKw = 3,
      panelTierId = 'TIER_STANDARD',
      structureId = 'STANDARD_RCC',
      quoteDate = new Date().toISOString().split('T')[0]
    } = req.body;

    const pricing = db.getPricingConfig();
    const rules = db.getSubsidyRules();

    const kw = Number(systemKw);
    const panelTier = pricing.panelTiers.find(t => t.id === panelTierId) || pricing.panelTiers[0];
    const structure = pricing.structureOptions.find(s => s.id === structureId) || pricing.structureOptions[0];

    // Compute gross cost
    const ratePerKw = panelTier.pricePerKw[kw] || panelTier.pricePerKw.default || 58000;
    const structureSurcharge = (structure.surcharge || 0) * kw;
    const grossCost = (kw * ratePerKw) + structureSurcharge;

    // Subsidy evaluation with date-effective table
    const subsidyResult = calculateSubsidy(kw, quoteDate, rules);

    // Payback calculation
    const paybackResult = calculatePayback({
      systemKw: kw,
      grossCost,
      subsidyAmount: subsidyResult.subsidyAmount,
      generationFactor: pricing.generationFactorPerKwYear || 1400,
      tariffPerUnit: pricing.gridTariffPerUnit || 8.20,
      tariffEscalationPercent: pricing.tariffEscalationRate || 4.5
    });

    const netCost = Math.max(0, grossCost - subsidyResult.subsidyAmount);

    // Payment milestones
    const paymentMilestones = [
      {
        stage: 'Stage 1: Booking Advance (10%)',
        amount: Math.round(netCost * 0.10),
        description: 'Site design, DISCOM feasibility study & net-metering portal application',
        status: 'PENDING'
      },
      {
        stage: 'Stage 2: DISCOM Sanction & Material Dispatch (40%)',
        amount: Math.round(netCost * 0.40),
        description: 'Delivery of Tier-1 solar panels, inverter, and galvanised structure at site',
        status: 'PENDING'
      },
      {
        stage: 'Stage 3: Installation & Electrical Wiring (40%)',
        amount: Math.round(netCost * 0.40),
        description: 'Array mounting, earthing pits, lightning arrester & ACDB/DCDB wiring',
        status: 'PENDING'
      },
      {
        stage: 'Stage 4: DISCOM Net-Meter Commissioning (10%)',
        amount: Math.round(netCost * 0.10),
        description: 'Bi-directional meter installation, grid energization & national portal subsidy claim submission',
        status: 'PENDING'
      }
    ];

    res.json({
      success: true,
      calculation: {
        systemKw: kw,
        panelTierName: panelTier.name,
        structureName: structure.name,
        grossCost,
        subsidyAmount: subsidyResult.subsidyAmount,
        subsidyDetails: subsidyResult,
        netCost,
        generationFactor: pricing.generationFactorPerKwYear || 1400,
        annualGenerationKwh: paybackResult.annualGenerationYear1,
        monthlyAverageUnits: paybackResult.monthlyAverageGeneration,
        annualSavings: paybackResult.annualSavingsYear1,
        monthlySavings: paybackResult.monthlySavingsYear1,
        paybackYears: paybackResult.paybackYears,
        lifetime25YrSavings: paybackResult.lifetime25YrSavings,
        co2OffsetTonnesPerYear: paybackResult.co2OffsetTonnesPerYear,
        co2OffsetTonnesLifetime: paybackResult.co2OffsetTonnesLifetime,
        yearlyProjections: paybackResult.yearlyProjections,
        paymentMilestones
      }
    });
  } catch (err) {
    console.error('Error calculating quote:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST create and save official quote for a lead
router.post('/', (req, res) => {
  try {
    const {
      leadId,
      systemKw = 3,
      panelTierId = 'TIER_STANDARD',
      structureId = 'STANDARD_RCC',
      quoteDate = new Date().toISOString().split('T')[0]
    } = req.body;

    const lead = db.getLeadById(leadId);
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });

    const pricing = db.getPricingConfig();
    const rules = db.getSubsidyRules();

    const kw = Number(systemKw);
    const panelTier = pricing.panelTiers.find(t => t.id === panelTierId) || pricing.panelTiers[0];
    const structure = pricing.structureOptions.find(s => s.id === structureId) || pricing.structureOptions[0];

    const ratePerKw = panelTier.pricePerKw[kw] || panelTier.pricePerKw.default || 58000;
    const structureSurcharge = (structure.surcharge || 0) * kw;
    const grossCost = (kw * ratePerKw) + structureSurcharge;

    const subsidyResult = calculateSubsidy(kw, quoteDate, rules);
    const paybackResult = calculatePayback({
      systemKw: kw,
      grossCost,
      subsidyAmount: subsidyResult.subsidyAmount,
      generationFactor: pricing.generationFactorPerKwYear || 1400,
      tariffPerUnit: pricing.gridTariffPerUnit || 8.20,
      tariffEscalationPercent: pricing.tariffEscalationRate || 4.5
    });

    const netCost = Math.max(0, grossCost - subsidyResult.subsidyAmount);
    const quoteId = `QT-${lead.id.replace('LD-', '')}-${Date.now().toString().slice(-4)}`;

    const newQuote = {
      id: quoteId,
      leadId: lead.id,
      customerName: lead.name,
      customerPhone: lead.phone,
      address: lead.address,
      pincode: lead.pincode,
      quoteDate,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      systemKw: kw,
      panelTierId: panelTier.id,
      panelTierName: panelTier.name,
      structureName: structure.name,
      panelCount: Math.ceil((kw * 1000) / 540), // 540Wp modules
      inverterSpec: `${(kw * 1.1).toFixed(1)} kW High-Frequency Grid-Tied Inverter (IP65, WiFi monitoring)`,
      grossCost,
      subsidyAmount: subsidyResult.subsidyAmount,
      subsidyRuleApplied: subsidyResult.ruleName,
      subsidyExplanation: subsidyResult.explanation,
      netCost,
      generationFactor: pricing.generationFactorPerKwYear || 1400,
      annualGenerationKwh: paybackResult.annualGenerationYear1,
      monthlyAverageUnits: paybackResult.monthlyAverageGeneration,
      annualElectricitySavings: paybackResult.annualSavingsYear1,
      paybackYears: paybackResult.paybackYears,
      lifetime25YrSavings: paybackResult.lifetime25YrSavings,
      co2OffsetTonnesPerYear: paybackResult.co2OffsetTonnesPerYear,
      status: 'SENT',
      createdAt: new Date().toISOString(),
      paymentMilestones: [
        { stage: 'Booking Advance (10%)', amount: Math.round(netCost * 0.10), status: 'PENDING' },
        { stage: 'MSEDCL Sanction & Material Dispatch (40%)', amount: Math.round(netCost * 0.40), status: 'PENDING' },
        { stage: 'Installation & Mechanical Completion (40%)', amount: Math.round(netCost * 0.40), status: 'PENDING' },
        { stage: 'Net Meter Commissioning (10%)', amount: Math.round(netCost * 0.10), status: 'PENDING' }
      ]
    };

    db.createQuote(newQuote);

    // Update lead status
    db.updateLead(lead.id, {
      quoteGenerated: true,
      quoteId,
      recommendedKw: kw
    });

    res.status(201).json({ success: true, quote: newQuote });
  } catch (err) {
    console.error('Error creating quote:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;

