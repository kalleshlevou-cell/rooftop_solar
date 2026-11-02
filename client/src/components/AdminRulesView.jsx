import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Calendar, Clock, DollarSign, Layers, Save, RefreshCw, CheckCircle, Info, Sparkles, AlertCircle } from 'lucide-react';

export default function AdminRulesView({ subsidyRules = [], pricingConfig = {}, onUpdatePricing, onAddSubsidyRule, onUpdateSubsidyRule, t }) {
  const [rules, setRules] = useState(subsidyRules);
  const [pricing, setPricing] = useState(pricingConfig);
  const [showAddRule, setShowAddRule] = useState(false);
  const [isSavingPricing, setIsSavingPricing] = useState(false);
  const [pricingSavedMessage, setPricingSavedMessage] = useState(false);

  // Time-Travel Subsidy Simulator State
  const [simKw, setSimKw] = useState(3);
  const [simDate, setSimDate] = useState('2026-11-01');
  const [simResult, setSimResult] = useState(null);
  const [isTestingSim, setIsTestingSim] = useState(false);

  // New Rule Form State
  const [newRuleName, setNewRuleName] = useState('PM Surya Ghar 2027 Revision');
  const [newRuleCode, setNewRuleCode] = useState('PM_SURYA_GHAR_REV_2027');
  const [newEffectiveFrom, setNewEffectiveFrom] = useState('2027-01-01');
  const [newEffectiveTo, setNewEffectiveTo] = useState('2099-12-31');
  const [newTier1Rate, setNewTier1Rate] = useState(35000);
  const [newTier2Rate, setNewTier2Rate] = useState(20000);
  const [newMaxCap, setNewMaxCap] = useState(90000);

  useEffect(() => {
    setRules(subsidyRules);
  }, [subsidyRules]);

  useEffect(() => {
    setPricing(pricingConfig);
  }, [pricingConfig]);

  // Test dated subsidy whenever sim inputs change
  useEffect(() => {
    const runTest = async () => {
      setIsTestingSim(true);
      try {
        const res = await fetch('/api/admin/test-subsidy-date', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ systemKw: simKw, testDate: simDate })
        });
        const data = await res.json();
        if (data.success) {
          setSimResult(data.result);
        }
      } catch (err) {
        console.error('Error testing subsidy date:', err);
      } finally {
        setIsTestingSim(false);
      }
    };

    runTest();
  }, [simKw, simDate]);

  const handleSavePricing = async () => {
    setIsSavingPricing(true);
    try {
      await onUpdatePricing(pricing);
      setPricingSavedMessage(true);
      setTimeout(() => setPricingSavedMessage(false), 3000);
    } catch (err) {
      console.error('Error saving pricing:', err);
    } finally {
      setIsSavingPricing(false);
    }
  };

  const handleCreateRule = async (e) => {
    e.preventDefault();
    const payload = {
      name: newRuleName,
      code: newRuleCode,
      effectiveFrom: newEffectiveFrom,
      effectiveTo: newEffectiveTo,
      type: 'TIERED_PER_KW',
      tier1MaxKw: 2,
      tier1RatePerKw: Number(newTier1Rate),
      tier2RatePerKw: Number(newTier2Rate),
      maxCap: Number(newMaxCap),
      notes: 'Custom administrator rule created via dated rules console.'
    };

    await onAddSubsidyRule(payload);
    setShowAddRule(false);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            System Administration & Governance
          </span>
          <span className="text-xs text-slate-500 font-mono">Date-Versioned Rule Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
          Subsidy Rules & Pricing Table Console
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          The hard part: Subsidies change across fiscal years. All calculations are strictly date-governed and never hallucinated by AI.
        </p>
      </div>

      {/* SECTION 1: TIME-TRAVEL DATED SUBSIDY EVALUATOR */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl p-6 sm:p-8 text-white shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-extrabold">Time-Travel Subsidy Calculator</h3>
            <p className="text-xs text-slate-400">
              Pick any date in history or the future to verify that quotes apply the exact legally effective subsidy rule.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Quote Date to Test</label>
            <input
              type="date"
              value={simDate}
              onChange={(e) => setSimDate(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            />
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setSimDate('2023-08-15')}
                className="text-[10px] bg-slate-800 hover:bg-slate-700 px-2 py-0.5 rounded-md text-slate-400"
              >
                2023 (Legacy Phase II)
              </button>
              <button
                type="button"
                onClick={() => setSimDate('2026-11-01')}
                className="text-[10px] bg-emerald-900/50 hover:bg-emerald-800/50 px-2 py-0.5 rounded-md text-emerald-300 border border-emerald-700/50"
              >
                2026 (Active PM Surya Ghar)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">System Capacity (kW)</label>
            <select
              value={simKw}
              onChange={(e) => setSimKw(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs font-bold text-white focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
            >
              {[1, 2, 3, 4, 5, 8, 10].map(kw => (
                <option key={kw} value={kw}>{kw} kW</option>
              ))}
            </select>
          </div>

          <div className="bg-slate-800/60 rounded-2xl p-4 border border-slate-700/80 flex flex-col justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              Evaluated Subsidy Amount
            </span>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono my-1">
              ₹{(simResult?.subsidyAmount || 0).toLocaleString('en-IN')}
            </div>
            <span className="text-[11px] text-slate-300 truncate">
              Rule: {simResult?.ruleName || 'Active Central Scheme'}
            </span>
          </div>
        </div>

        {simResult && (
          <div className="mt-4 p-3 rounded-xl bg-slate-800/40 border border-slate-700 text-xs text-slate-300 flex items-start space-x-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-300">Statutory Formula Applied: </span>
              {simResult.explanation} (Effective {simResult.effectiveFrom} to {simResult.effectiveTo})
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: DATED SUBSIDY RULE TABLE */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="p-6 sm:p-8 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Dated Government Subsidy Rules</h3>
            <p className="text-xs text-slate-500">
              Database stored rules with effective start and end dates. Central scheme verified at launch.
            </p>
          </div>

          <button
            onClick={() => setShowAddRule(true)}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Subsidy Policy</span>
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {rules.map((rule) => (
            <div key={rule.id} className="p-6 hover:bg-slate-50/60 transition-colors">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h4 className="font-extrabold text-slate-900 text-sm">{rule.name}</h4>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      rule.isActive
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600 border border-slate-200'
                    }`}>
                      {rule.isActive ? 'Active Scheme' : 'Historical Archive'}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      Code: {rule.code}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Effective Window:</span>
                      <span className="font-bold text-slate-800">{rule.effectiveFrom} to {rule.effectiveTo}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tier-1 Rate (Up to 2 kW):</span>
                      <span className="font-bold text-slate-800">
                        {rule.tier1RatePerKw ? `₹${rule.tier1RatePerKw.toLocaleString('en-IN')}/kW` : '40% Benchmark'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Tier-2 Rate (3rd kW):</span>
                      <span className="font-bold text-slate-800">
                        {rule.tier2RatePerKw ? `₹${rule.tier2RatePerKw.toLocaleString('en-IN')}` : '20% Benchmark'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Maximum Cap:</span>
                      <span className="font-bold text-emerald-700">₹{rule.maxCap.toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {rule.notes && (
                    <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
                      {rule.notes}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-100 px-2.5 py-1 rounded-md">
                    ID: {rule.id}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: ENGINEERING & PRICING CONFIGURATION */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div>
            <h3 className="font-extrabold text-slate-900 text-base">Solar Engineering & Grid Tariff Parameters</h3>
            <p className="text-xs text-slate-500">
              Configured per client engineering guidelines.
            </p>
          </div>

          <button
            onClick={handleSavePricing}
            disabled={isSavingPricing}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold transition-all shadow-xs"
          >
            {isSavingPricing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5 text-emerald-400" />
            )}
            <span>Save Pricing Constants</span>
          </button>
        </div>

        {pricingSavedMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Pricing and generation parameters updated successfully!</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          {/* Generation factor (The client's exact 1,400 units/kW/yr rule!) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <label className="font-bold text-slate-800 block">
              Generation Factor (Editable)
            </label>
            <div className="relative">
              <input
                type="number"
                value={pricing.generationFactorPerKwYear || 1400}
                onChange={(e) => setPricing({ ...pricing, generationFactorPerKwYear: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2 text-[10px] text-slate-400">units/kW/yr</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Client fixed formula (never AI)</span>
          </div>

          {/* Grid Tariff */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <label className="font-bold text-slate-800 block">
              MSEDCL Residential Tariff
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={pricing.gridTariffPerUnit || 8.20}
                onChange={(e) => setPricing({ ...pricing, gridTariffPerUnit: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2 text-[10px] text-slate-400">₹/kWh</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Vidarbha residential slab average</span>
          </div>

          {/* Tariff Escalation */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <label className="font-bold text-slate-800 block">
              Annual Tariff Escalation
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                value={pricing.tariffEscalationRate || 4.5}
                onChange={(e) => setPricing({ ...pricing, tariffEscalationRate: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2 text-[10px] text-slate-400">% / year</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Compounded over 25 years</span>
          </div>

          {/* Surveyor Cost Per Visit (The ₹2,500 base metric!) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
            <label className="font-bold text-slate-800 block">
              On-Site Survey Cost
            </label>
            <div className="relative">
              <input
                type="number"
                value={pricing.surveyCostPerVisit || 2500}
                onChange={(e) => setPricing({ ...pricing, surveyCostPerVisit: Number(e.target.value) })}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-emerald-500"
              />
              <span className="absolute right-3 top-2 text-[10px] text-slate-400">₹ / visit</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Direct cost saved when replacing with call</span>
          </div>
        </div>
      </div>

      {/* MODAL: ADD NEW DATED SUBSIDY RULE */}
      {showAddRule && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Add Date-Effective Subsidy Rule</h3>
            <p className="text-xs text-slate-500 mb-6">
              Create a new policy version with clear start and expiry dates.
            </p>

            <form onSubmit={handleCreateRule} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Scheme Name</label>
                <input
                  type="text"
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Effective From</label>
                  <input
                    type="date"
                    value={newEffectiveFrom}
                    onChange={(e) => setNewEffectiveFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Effective To</label>
                  <input
                    type="date"
                    value={newEffectiveTo}
                    onChange={(e) => setNewEffectiveTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-semibold focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tier-1 Rate (₹/kW)</label>
                  <input
                    type="number"
                    value={newTier1Rate}
                    onChange={(e) => setNewTier1Rate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Tier-2 Rate (₹)</label>
                  <input
                    type="number"
                    value={newTier2Rate}
                    onChange={(e) => setNewTier2Rate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Max Cap (₹)</label>
                  <input
                    type="number"
                    value={newMaxCap}
                    onChange={(e) => setNewMaxCap(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddRule(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20"
                >
                  Save Subsidy Policy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
