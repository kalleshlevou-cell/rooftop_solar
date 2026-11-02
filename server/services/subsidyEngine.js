/**
 * Subsidy Calculation Engine with Date-Based Rule Tables
 * Central Residential Scheme (PM Surya Ghar: Muft Bijli Yojana)
 * Effective From 2024-02-15 to Present:
 * - ₹30,000 per kW up to 2 kW
 * - ₹18,000 for the 3rd kW
 * - Capped at ₹78,000 for >= 3 kW
 */

export function calculateSubsidy(systemKw, quoteDate = new Date(), subsidyRules = []) {
  const targetDate = new Date(quoteDate);
  const targetDateStr = targetDate.toISOString().split('T')[0];

  // Find the applicable rule active on the given quote date
  const rule = subsidyRules.find(r => {
    const from = r.effectiveFrom;
    const to = r.effectiveTo || '2099-12-31';
    return targetDateStr >= from && targetDateStr <= to;
  }) || subsidyRules.find(r => r.isActive) || subsidyRules[0];

  if (!rule) {
    return {
      ruleId: 'NONE',
      ruleName: 'No Active Subsidy Scheme',
      subsidyAmount: 0,
      cap: 0,
      effectiveDate: targetDateStr,
      formulaExplanation: 'No active subsidy rule found for this date.'
    };
  }

  const kw = Number(systemKw);
  let subsidy = 0;
  let explanation = '';

  if (rule.type === 'TIERED_PER_KW') {
    // PM Surya Ghar Scheme
    const tier1Max = rule.tier1MaxKw || 2;
    const tier1Rate = rule.tier1RatePerKw || 30000;
    const tier2Rate = rule.tier2RatePerKw || 18000;
    const cap = rule.maxCap || 78000;

    if (kw <= 0) {
      subsidy = 0;
      explanation = '0 kW system selected';
    } else if (kw <= tier1Max) {
      subsidy = kw * tier1Rate;
      explanation = `${kw} kW × ₹${tier1Rate.toLocaleString('en-IN')}/kW = ₹${subsidy.toLocaleString('en-IN')}`;
    } else {
      const tier1Amount = tier1Max * tier1Rate; // 60,000
      const tier2Kw = Math.min(kw - tier1Max, 1); // 1 kW for tier 2
      const tier2Amount = tier2Kw * tier2Rate; // 18,000
      subsidy = Math.min(tier1Amount + tier2Amount, cap);
      explanation = `First ${tier1Max} kW @ ₹${tier1Rate.toLocaleString('en-IN')} (₹${tier1Amount.toLocaleString('en-IN')}) + next ${tier2Kw.toFixed(1)} kW @ ₹${tier2Rate.toLocaleString('en-IN')} (₹${tier2Amount.toLocaleString('en-IN')}) = ₹${subsidy.toLocaleString('en-IN')} (Capped at ₹${cap.toLocaleString('en-IN')})`;
    }
  } else if (rule.type === 'PERCENTAGE_BENCHMARK') {
    // Legacy MNRE Phase II scheme
    const benchmarkPerKw = rule.benchmarkCostPerKw || 54000;
    const baseCost = kw * benchmarkPerKw;
    if (kw <= 3) {
      subsidy = baseCost * 0.40;
      explanation = `40% of benchmark cost ₹${baseCost.toLocaleString('en-IN')} = ₹${subsidy.toLocaleString('en-IN')}`;
    } else {
      const first3 = 3 * benchmarkPerKw * 0.40;
      const remainingKw = Math.min(kw - 3, 7);
      const remaining = remainingKw * benchmarkPerKw * 0.20;
      subsidy = Math.min(first3 + remaining, rule.maxCap || 150000);
      explanation = `40% for first 3 kW + 20% up to 10 kW = ₹${subsidy.toLocaleString('en-IN')}`;
    }
  } else {
    // Custom Fixed rate per kW
    const rate = rule.fixedRatePerKw || 25000;
    subsidy = Math.min(kw * rate, rule.maxCap || 78000);
    explanation = `${kw} kW × ₹${rate.toLocaleString('en-IN')} = ₹${subsidy.toLocaleString('en-IN')} (Cap: ₹${(rule.maxCap || 78000).toLocaleString('en-IN')})`;
  }

  return {
    ruleId: rule.id,
    ruleName: rule.name,
    ruleCode: rule.code,
    effectiveFrom: rule.effectiveFrom,
    effectiveTo: rule.effectiveTo,
    systemKw: kw,
    subsidyAmount: Math.round(subsidy),
    maxCap: rule.maxCap,
    explanation,
    discomCode: 'MSEDCL-MAHAVITARAN',
    state: 'Maharashtra (Vidarbha Region)'
  };
}

/**
 * Payback Calculation Engine
 * Generation: fixed formula 1,400 units (kWh) per kW per year
 * Tariff: MSEDCL residential slab average ~₹8.20/kWh with 4% annual tariff hike
 */
export function calculatePayback({
  systemKw,
  grossCost,
  subsidyAmount,
  generationFactor = 1400, // units per kW per year
  tariffPerUnit = 8.20,
  tariffEscalationPercent = 4.0,
  annualDegradationPercent = 0.7
}) {
  const netInvestment = Math.max(0, grossCost - subsidyAmount);
  const annualGenerationYear1 = Math.round(systemKw * generationFactor);
  const annualSavingsYear1 = Math.round(annualGenerationYear1 * tariffPerUnit);

  let cumulativeSavings = 0;
  let paybackYears = 0;
  const yearlyProjections = [];

  for (let year = 1; year <= 25; year++) {
    const degradation = Math.pow(1 - (annualDegradationPercent / 100), year - 1);
    const generationThisYear = Math.round(annualGenerationYear1 * degradation);
    const tariffThisYear = tariffPerUnit * Math.pow(1 + (tariffEscalationPercent / 100), year - 1);
    const savingsThisYear = Math.round(generationThisYear * tariffThisYear);

    cumulativeSavings += savingsThisYear;

    if (paybackYears === 0 && cumulativeSavings >= netInvestment) {
      // Linear interpolation for exact fractional year
      const prevSavings = cumulativeSavings - savingsThisYear;
      const deficit = netInvestment - prevSavings;
      paybackYears = Number(((year - 1) + (deficit / savingsThisYear)).toFixed(1));
    }

    if (year <= 10 || year === 15 || year === 20 || year === 25) {
      yearlyProjections.push({
        year,
        generation: generationThisYear,
        tariff: Number(tariffThisYear.toFixed(2)),
        annualSavings: savingsThisYear,
        cumulativeSavings: Math.round(cumulativeSavings),
        netROI: Math.round(cumulativeSavings - netInvestment)
      });
    }
  }

  // If net investment is 0 (unlikely) or very quick:
  if (paybackYears === 0 && netInvestment <= 0) paybackYears = 0;
  else if (paybackYears === 0) paybackYears = Number((netInvestment / Math.max(1, annualSavingsYear1)).toFixed(1));

  return {
    systemKw,
    generationFactor,
    annualGenerationYear1,
    monthlyAverageGeneration: Math.round(annualGenerationYear1 / 12),
    tariffPerUnit,
    annualSavingsYear1,
    monthlySavingsYear1: Math.round(annualSavingsYear1 / 12),
    netInvestment,
    paybackYears: Math.min(paybackYears, 25),
    lifetime25YrSavings: Math.round(cumulativeSavings),
    lifetime25YrProfit: Math.round(cumulativeSavings - netInvestment),
    co2OffsetTonnesPerYear: Number((annualGenerationYear1 * 0.00082).toFixed(2)),
    co2OffsetTonnesLifetime: Number((annualGenerationYear1 * 25 * 0.00075).toFixed(1)),
    yearlyProjections
  };
}
