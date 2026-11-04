import express from 'express';
import { db } from '../data/db.js';
import { calculateSubsidy } from '../services/subsidyEngine.js';

const router = express.Router();

// GET all subsidy rules
router.get('/subsidy-rules', (req, res) => {
  const rules = db.getSubsidyRules();
  res.json({ success: true, count: rules.length, rules });
});

// POST create new dated subsidy rule
router.post('/subsidy-rules', (req, res) => {
  try {
    const {
      name,
      code,
      schemeAuthority,
      effectiveFrom,
      effectiveTo,
      type = 'TIERED_PER_KW',
      tier1MaxKw = 2,
      tier1RatePerKw = 30000,
      tier2RatePerKw = 18000,
      maxCap = 78000,
      benchmarkCostPerKw = 54000,
      notes = ''
    } = req.body;

    const id = `SUB-${Date.now().toString().slice(-6)}`;
    const newRule = {
      id,
      name,
      code: code || `SCHEME_${Date.now()}`,
      schemeAuthority: schemeAuthority || 'Ministry of New and Renewable Energy',
      effectiveFrom: effectiveFrom || new Date().toISOString().split('T')[0],
      effectiveTo: effectiveTo || '2099-12-31',
      isActive: true,
      type,
      tier1MaxKw: Number(tier1MaxKw),
      tier1RatePerKw: Number(tier1RatePerKw),
      tier2RatePerKw: Number(tier2RatePerKw),
      maxCap: Number(maxCap),
      benchmarkCostPerKw: Number(benchmarkCostPerKw),
      notes
    };

    db.createSubsidyRule(newRule);
    res.status(201).json({ success: true, rule: newRule });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// PUT update existing subsidy rule
router.put('/subsidy-rules/:id', (req, res) => {
  const updated = db.updateSubsidyRule(req.params.id, req.body);
  if (!updated) return res.status(404).json({ success: false, error: 'Rule not found' });
  res.json({ success: true, rule: updated });
});

// DELETE (deactivate) subsidy rule — soft-delete, preserves historical quotes
router.delete('/subsidy-rules/:id', (req, res) => {
  const deactivated = db.deleteSubsidyRule(req.params.id);
  if (!deactivated) return res.status(404).json({ success: false, error: 'Rule not found' });
  res.json({ success: true, rule: deactivated, message: 'Rule deactivated (preserved for historical quotes)' });
});

// GET pricing & engineering configuration
router.get('/pricing', (req, res) => {
  const pricing = db.getPricingConfig();
  res.json({ success: true, pricing });
});

// PUT update pricing configuration (e.g. Generation factor 1,400 units/kW/yr)
router.put('/pricing', (req, res) => {
  const updated = db.updatePricingConfig(req.body);
  res.json({ success: true, pricing: updated });
});

// POST test subsidy calculation against a specific historical or future date
router.post('/test-subsidy-date', (req, res) => {
  const { systemKw = 3, testDate = '2026-11-01', customerCategory = 'RESIDENTIAL' } = req.body;
  const rules = db.getSubsidyRules();
  const result = calculateSubsidy(Number(systemKw), testDate, rules, customerCategory);
  res.json({ success: true, result });
});

// GET system notifications stream
router.get('/notifications', (req, res) => {
  const notifications = db.getNotifications();
  res.json({ success: true, count: notifications.length, notifications });
});

export default router;

