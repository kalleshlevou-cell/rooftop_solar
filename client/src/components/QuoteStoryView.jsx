import React, { useState, useEffect } from 'react';
import { Download, ShieldCheck, Zap, Sun, Calendar, Clock, ArrowRight, CheckCircle2, ChevronRight, BarChart3, Leaf, Layers, DollarSign } from 'lucide-react';
import { generateQuotePDF } from '../utils/pdfGenerator';
import confetti from 'canvas-confetti';

export default function QuoteStoryView({ lead, quote, t, onOpenPayment, onRecalculate }) {
  const [selectedKw, setSelectedKw] = useState(quote?.systemKw || lead?.recommendedKw || 3);
  const [panelTier, setPanelTier] = useState(quote?.panelTierId || 'TIER_STANDARD');
  const [structure, setStructure] = useState('STANDARD_RCC');
  const [activeTab, setActiveTab] = useState('summary'); // 'summary' | 'breakdown' | 'projections' | 'milestones'
  const [calcData, setCalcData] = useState(quote || null);
  const [isRecalculating, setIsRecalculating] = useState(false);

  // Sizing options
  const kwOptions = [1, 2, 3, 4, 5, 8, 10];

  useEffect(() => {
    // Fetch calculation when options change
    const fetchCalc = async () => {
      setIsRecalculating(true);
      try {
        const res = await fetch('/api/quotes/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            systemKw: selectedKw,
            panelTierId: panelTier,
            structureId: structure,
            quoteDate: new Date().toISOString().split('T')[0]
          })
        });
        const data = await res.json();
        if (data.success) {
          setCalcData(data.calculation);
        }
      } catch (err) {
        console.error('Error calculating quote:', err);
      } finally {
        setIsRecalculating(false);
      }
    };

    fetchCalc();
  }, [selectedKw, panelTier, structure]);

  const handleDownloadPDF = () => {
    const quotePayload = {
      id: quote?.id || `QT-${lead?.id?.replace('LD-', '') || '30881'}-A`,
      quoteDate: new Date().toISOString().split('T')[0],
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      systemKw: selectedKw,
      panelTierName: panelTier === 'TIER_STANDARD' ? 'Tier-1 Mono PERC DCR (540Wp)' : 'High-Gain TOPCon Bifacial (580Wp)',
      structureName: structure === 'STANDARD_RCC' ? 'Standard Elevated GI Structure' : 'High-Rise Usable Terrace Structure',
      grossCost: calcData?.grossCost || 180000,
      subsidyAmount: calcData?.subsidyAmount || 78000,
      netCost: calcData?.netCost || 102000,
      generationFactor: calcData?.generationFactor || 1400,
      annualGenerationKwh: calcData?.annualGenerationKwh || 4200,
      annualElectricitySavings: calcData?.annualSavings || 34440,
      paybackYears: calcData?.paybackYears || 3.0,
      lifetime25YrSavings: calcData?.lifetime25YrSavings || 861000
    };

    generateQuotePDF(quotePayload, lead);
  };

  const handleCelebratePayment = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    onOpenPayment(calcData?.netCost ? Math.round(calcData.netCost * 0.1) : 10200);
  };

  const netCost = calcData?.netCost || 102000;
  const grossCost = calcData?.grossCost || 180000;
  const subsidy = calcData?.subsidyAmount || 78000;
  const payback = calcData?.paybackYears || 3.0;
  const annualSavings = calcData?.annualSavings || 34440;
  const annualGen = calcData?.annualGenerationKwh || 4200;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      {/* Customer Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-200 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Verified Rooftop Solar Quote
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Lead: {lead?.id || 'LD-30881'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {lead?.name || 'Prashant Wankhede'}’s Solar Quotation
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            {lead?.address || 'Plot 42, Laxmi Nagar, Nagpur 440022'} • MSEDCL Consumer No: {lead?.consumerNumber ? (lead.consumerNumber.substring(0, 5) + '*****' + lead.consumerNumber.slice(-2)) : '04901*****31'}
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0">
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold transition-all shadow-xs"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>{t.btnDownloadPdf}</span>
          </button>

          <button
            onClick={handleCelebratePayment}
            className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
          >
            <span>{t.btnPayAdvance}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* THE SIMPLE STORY FIRST (As requested by founder!) */}
      <div className="mb-10">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center space-x-1.5">
          <Zap className="w-4 h-4 text-amber-500" />
          <span>{t.quoteStoryTitle}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: System Size */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">{t.recommendedSystem}</span>
              <Sun className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                {selectedKw} <span className="text-xl font-bold text-slate-500">kW</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Generates ~{(annualGen).toLocaleString('en-IN')} units/year
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-emerald-700">
              1,400 kWh/kW/yr Vidarbha standard
            </div>
          </div>

          {/* Card 2: Cost After Subsidy */}
          <div className="bg-gradient-to-br from-emerald-900 to-emerald-950 text-white rounded-3xl p-6 shadow-md shadow-emerald-950/20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-700/20 rounded-full blur-xl pointer-events-none" />
            <div className="flex items-center justify-between text-emerald-300 mb-2">
              <span className="text-xs font-semibold uppercase">{t.netCostTitle}</span>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                ₹{netCost.toLocaleString('en-IN')}
              </div>
              <div className="flex items-center space-x-2 mt-1 text-xs">
                <span className="line-through text-emerald-300/60">₹{grossCost.toLocaleString('en-IN')}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 text-[11px] font-bold border border-emerald-400/30">
                  -₹{subsidy.toLocaleString('en-IN')} DBT
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-emerald-800/60 text-[11px] text-emerald-200 font-medium">
              PM Surya Ghar Muft Bijli Yojana
            </div>
          </div>

          {/* Card 3: Payback Period */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">{t.paybackTitle}</span>
              <Clock className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">
                {payback} <span className="text-xl font-bold text-slate-500">Years</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Full payback in ~{Math.round(payback * 12)} months
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-amber-700">
              Free electricity for next 22+ years
            </div>
          </div>

          {/* Card 4: Yearly Electricity Savings */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all flex flex-col justify-between">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-semibold uppercase">{t.annualSavingsTitle}</span>
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                ₹{annualSavings.toLocaleString('en-IN')}
              </div>
              <p className="text-xs text-slate-500 mt-1">
                ~₹{Math.round(annualSavings / 12).toLocaleString('en-IN')}/month off your bill
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] font-medium text-emerald-700">
              ₹{(calcData?.lifetime25YrSavings || 861000).toLocaleString('en-IN')} 25-yr lifetime savings
            </div>
          </div>
        </div>
      </div>

      {/* Interactive System Customizer */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-8 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center space-x-2">
          <Layers className="w-4 h-4 text-emerald-600" />
          <span>Customize System Size & Equipment Tiers</span>
        </h3>

        <div className="space-y-6">
          {/* Sizing Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-2">
              Select Solar Capacity (kW)
            </label>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {kwOptions.map((kw) => (
                <button
                  key={kw}
                  type="button"
                  onClick={() => setSelectedKw(kw)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    selectedKw === kw
                      ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30 ring-2 ring-emerald-600 ring-offset-2'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                  }`}
                >
                  {kw} kW {kw === (lead?.recommendedKw || 3) && '★ (Recommended)'}
                </button>
              ))}
            </div>
          </div>

          {/* Module & Structure Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Solar Module Technology
              </label>
              <select
                value={panelTier}
                onChange={(e) => setPanelTier(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="TIER_STANDARD">Tier-1 Mono PERC DCR (540Wp, 25-Yr Warranty)</option>
                <option value="TIER_PREMIUM_BIFACIAL">High-Gain TOPCon Bifacial (+15% rear generation)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                Rooftop Mounting Structure
              </label>
              <select
                value={structure}
                onChange={(e) => setStructure(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
              >
                <option value="STANDARD_RCC">Standard Elevated GI Structure (3-4 ft height)</option>
                <option value="HIGH_RISE_TERRACE">High-Rise Usable Terrace Super-Structure (&gt; 7 ft)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed In-Depth Information: Breakdown, Projections, Milestones */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 px-4 sm:px-6 pt-3 space-x-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('summary')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'summary'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Financial & Subsidy Breakdown
          </button>
          <button
            onClick={() => setActiveTab('projections')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'projections'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            25-Year Savings Projections
          </button>
          <button
            onClick={() => setActiveTab('milestones')}
            className={`pb-3 text-xs font-bold border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'milestones'
                ? 'border-emerald-600 text-emerald-900'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Payment Milestones (10% Advance)
          </button>
        </div>

        {/* Tab Content 1: Financial & Subsidy Breakdown */}
        {activeTab === 'summary' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3 rounded-l-xl">Cost Item / Component</th>
                    <th className="px-4 py-3">Specification / Formula</th>
                    <th className="px-4 py-3 text-right rounded-r-xl">Amount (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-800">
                  <tr>
                    <td className="px-4 py-3 font-semibold">Turnkey Solar EPC Base Cost</td>
                    <td className="px-4 py-3 text-slate-500">Modules, Inverter, HDG Structure, ACDB/DCDB, Installation</td>
                    <td className="px-4 py-3 text-right font-mono font-bold">₹{grossCost.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="bg-emerald-50/50 text-emerald-900">
                    <td className="px-4 py-3 font-bold flex items-center space-x-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>PM Surya Ghar: Muft Bijli Yojana</span>
                    </td>
                    <td className="px-4 py-3 text-emerald-800">
                      ₹30,000/kW up to 2 kW + ₹18,000 for 3rd kW (Direct DBT to Bank)
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-emerald-700">
                      -₹{subsidy.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="font-extrabold text-sm bg-slate-50">
                    <td className="px-4 py-3.5 text-slate-900">NET CUSTOMER INVESTMENT</td>
                    <td className="px-4 py-3.5 text-slate-500">Total payable across 4 construction milestones</td>
                    <td className="px-4 py-3.5 text-right font-mono text-emerald-700 text-base">
                      ₹{netCost.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
              <span className="font-bold text-slate-800">Subsidies are date-governed:</span>
              <p>
                Calculated according to the active central residential scheme rule (effective 15 Feb 2024 to present). Company A provides 100% turnkey liaisoning with MSEDCL Mahavitaran and national portal registration.
              </p>
            </div>
          </div>
        )}

        {/* Tab Content 2: 25-Year Projections */}
        {activeTab === 'projections' && (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900">
                <span className="text-[11px] font-semibold block text-emerald-700">Year 1 Generation</span>
                <span className="text-2xl font-black">{annualGen.toLocaleString('en-IN')} kWh</span>
                <span className="text-[10px] block text-emerald-600 mt-0.5">At 1,400 units/kW/year</span>
              </div>
              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900">
                <span className="text-[11px] font-semibold block text-blue-700">25-Yr Net Financial Profit</span>
                <span className="text-2xl font-black">₹{((calcData?.lifetime25YrSavings || 861000) - netCost).toLocaleString('en-IN')}</span>
                <span className="text-[10px] block text-blue-600 mt-0.5">Savings minus initial cost</span>
              </div>
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 text-amber-900">
                <span className="text-[11px] font-semibold block text-amber-700">CO₂ Carbon Avoidance</span>
                <span className="text-2xl font-black">{calcData?.co2OffsetTonnesPerYear || 3.4} Tonnes/yr</span>
                <span className="text-[10px] block text-amber-600 mt-0.5">Equivalent to ~160 trees planted</span>
              </div>
            </div>

            {/* Projections Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-2.5">Timeline</th>
                    <th className="px-4 py-2.5">Annual Units (Degraded @ 0.7%/yr)</th>
                    <th className="px-4 py-2.5">MSEDCL Slab Tariff (₹/kWh)</th>
                    <th className="px-4 py-2.5">Annual Savings (₹)</th>
                    <th className="px-4 py-2.5 text-right">Cumulative Savings (₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono text-slate-700">
                  {(calcData?.yearlyProjections || [
                    { year: 1, generation: 4200, tariff: 8.20, annualSavings: 34440, cumulativeSavings: 34440 },
                    { year: 3, generation: 4141, tariff: 8.95, annualSavings: 37062, cumulativeSavings: 107250 },
                    { year: 5, generation: 4083, tariff: 9.78, annualSavings: 39932, cumulativeSavings: 184500 },
                    { year: 10, generation: 3942, tariff: 12.19, annualSavings: 48053, cumulativeSavings: 408000 },
                    { year: 25, generation: 3546, tariff: 23.36, annualSavings: 82835, cumulativeSavings: 861000 }
                  ]).map((p) => (
                    <tr key={p.year} className={p.year === Math.ceil(payback) ? 'bg-amber-50/70 font-bold' : ''}>
                      <td className="px-4 py-2 font-sans font-semibold">Year {p.year} {p.year === Math.ceil(payback) && '🎯 (Payback Recovered)'}</td>
                      <td className="px-4 py-2">{p.generation.toLocaleString('en-IN')} kWh</td>
                      <td className="px-4 py-2">₹{p.tariff}</td>
                      <td className="px-4 py-2">₹{p.annualSavings.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-2 text-right font-bold text-emerald-800">₹{p.cumulativeSavings.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content 3: Milestones */}
        {activeTab === 'milestones' && (
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-xs text-slate-600">
              Clear stage-based milestone payments ensure complete security and transparency. No large upfront deposits required.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { stage: '1. Booking Advance (10%)', amount: Math.round(netCost * 0.1), desc: 'Trigger: Site survey verification, agreement signing & MSEDCL online portal filing.', status: 'DUE NOW' },
                { stage: '2. Material Delivery (40%)', amount: Math.round(netCost * 0.4), desc: 'Trigger: Solar panels, inverter, and galvanised mounting structure arrive at your site.', status: 'Pending Delivery' },
                { stage: '3. Installation & Wiring (40%)', amount: Math.round(netCost * 0.4), desc: 'Trigger: Mechanical roof mounting, earthing pit test & electrical cabling done.', status: 'Pending Install' },
                { stage: '4. Commissioning & Net Meter (10%)', amount: Math.round(netCost * 0.1), desc: 'Trigger: MSEDCL bi-directional net-meter installed and subsidy claim submitted.', status: 'Pending Meter' }
              ].map((m, idx) => (
                <div key={idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-xs text-slate-900">{m.stage}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        idx === 0 ? 'bg-amber-100 text-amber-900' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {m.status}
                      </span>
                    </div>
                    <div className="text-2xl font-black text-slate-900 font-mono mb-2">
                      ₹{m.amount.toLocaleString('en-IN')}
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      {m.desc}
                    </p>
                  </div>
                  {idx === 0 && (
                    <button
                      onClick={handleCelebratePayment}
                      className="mt-4 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
                    >
                      Pay Booking Advance (₹{m.amount.toLocaleString('en-IN')})
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
