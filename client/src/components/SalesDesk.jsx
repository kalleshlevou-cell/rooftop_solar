import React, { useState } from 'react';
import { Search, Filter, Phone, MapPin, Eye, FileText, CheckCircle2, AlertCircle, ArrowUpRight, TrendingUp, DollarSign, Calendar, Sparkles } from 'lucide-react';

export default function SalesDesk({ leads = [], metrics = {}, onInspectBill, onViewQuote, onAdvanceStage, t }) {
  const [filterScore, setFilterScore] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter leads
  const filteredLeads = leads.filter(lead => {
    const matchesScore = filterScore === 'ALL' || lead.scoreCategory === filterScore || lead.score.toLowerCase().includes(filterScore.toLowerCase());
    const matchesSearch = !searchQuery || 
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (lead.address && lead.address.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (lead.pincode && lead.pincode.includes(searchQuery));
    return matchesScore && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header & Executive Impact Cards */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
                Company A Sales Intelligence
              </span>
              <span className="text-xs text-slate-500 font-mono">Vidarbha Command Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Lead Qualification & Survey Dispatch
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Eliminating ₹86.88L/year in wasted survey visits and delayed quote drop-offs.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <div className="text-right">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">Monthly Bleed Prevented</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-600 font-mono">
                ₹{(metrics.surveyCostSavedInRupees || 5000).toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* 3 Core Success Metric Badges (From Prompt Constraints) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Metric 1: Unqualified Survey Rate */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Unqualified Survey Rate</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">12.8%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  ↓ Down from 40% (Target &lt; 15%)
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Saved ₹26.4L in wasted surveyor travel</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>

          {/* Metric 2: Same-Day Quotes */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Same-Day Quote Delivery</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">91.4%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Target &gt; 90% achieved
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Stopped 14 leads/mo lost to faster rivals</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          {/* Metric 3: Status Calls Reduced */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Inbound Status Calls</span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-2xl font-extrabold text-slate-900">-52%</span>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                  Exceeded 50% goal
                </span>
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">Automated WhatsApp on every stage change</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <Phone className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by customer name, lead ID, locality, or Nagpur pincode..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
          />
        </div>

        {/* Score Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setFilterScore('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterScore === 'ALL'
                ? 'bg-slate-900 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Leads ({leads.length})
          </button>
          <button
            onClick={() => setFilterScore('HIGH')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterScore === 'HIGH'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            High Priority ({leads.filter(l => l.scoreCategory === 'HIGH' || l.score === 'High').length})
          </button>
          <button
            onClick={() => setFilterScore('LOW_TENANT')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterScore === 'LOW_TENANT'
                ? 'bg-amber-600 text-white'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
            }`}
          >
            Tenants ({leads.filter(l => l.scoreCategory === 'LOW_TENANT' || l.score.includes('tenant')).length})
          </button>
          <button
            onClick={() => setFilterScore('LOW_BILL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filterScore === 'LOW_BILL'
                ? 'bg-blue-600 text-white'
                : 'bg-blue-50 text-blue-800 hover:bg-blue-100'
            }`}
          >
            Small Bills (&lt; ₹1k) ({leads.filter(l => l.scoreCategory === 'LOW_BILL' || l.score.includes('small bill')).length})
          </button>
        </div>
      </div>

      {/* Leads Table / Card List */}
      <div className="space-y-4">
        {filteredLeads.map((lead) => {
          const isHigh = lead.scoreCategory === 'HIGH' || lead.score === 'High';
          const isTenant = lead.scoreCategory === 'LOW_TENANT' || lead.score.includes('tenant');
          const isLowBill = lead.scoreCategory === 'LOW_BILL' || lead.score.includes('small bill');

          return (
            <div
              key={lead.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 transition-all shadow-xs hover:shadow-md ${
                isHigh
                  ? 'border-emerald-200 bg-gradient-to-r from-emerald-50/20 to-white'
                  : isTenant
                  ? 'border-amber-200 bg-gradient-to-r from-amber-50/20 to-white'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Left Info Column */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                      {lead.id}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">{lead.name}</h3>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                      isHigh
                        ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        : isTenant
                        ? 'bg-amber-100 text-amber-900 border border-amber-300'
                        : 'bg-blue-100 text-blue-900 border border-blue-300'
                    }`}>
                      {lead.score}
                    </span>
                    {lead.surveyCostSaved > 0 && (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                        Saved ₹2,500 Survey Cost
                      </span>
                    )}
                  </div>

                  {/* Bill & Rooftop Metadata */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-600 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[10px]">Monthly Bill & Units:</span>
                      <span className="font-bold text-slate-800">
                        ₹{lead.monthlyBill?.toLocaleString('en-IN')} ({lead.avgUnits} kWh)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Occupancy & Roof:</span>
                      <span className="font-bold text-slate-800">
                        {lead.occupancyType} • {lead.roofType} ({lead.roofAreaSqFt} sq ft)
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">Recommended kW:</span>
                      <span className="font-bold text-emerald-700">
                        {lead.recommendedKw ? `${lead.recommendedKw} kW Rooftop` : 'Virtual Consult'}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px]">MSEDCL Consumer No:</span>
                      <span className="font-mono font-bold text-slate-800">
                        {lead.billDetails?.maskedConsumerNumber || lead.consumerNumber?.substring(0, 5) + '*****'}
                      </span>
                    </div>
                  </div>

                  {/* Recommendation Action Note */}
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700">
                    <span className="font-bold text-slate-900">Action: </span>
                    {lead.recommendationAction}
                  </div>
                </div>

                {/* Right Action Buttons */}
                <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 justify-end">
                  {/* Inspect Bill Button */}
                  <button
                    onClick={() => onInspectBill(lead)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 shadow-xs"
                  >
                    <Eye className="w-3.5 h-3.5 text-blue-600" />
                    <span>Side-by-Side OCR</span>
                  </button>

                  {/* View / Build Quote */}
                  <button
                    onClick={() => onViewQuote(lead)}
                    className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs shadow-emerald-600/20"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lead.quoteGenerated ? 'View Quote PDF' : 'Build Instant Quote'}</span>
                  </button>

                  {/* Fast Action depending on score */}
                  {isHigh && lead.status === 'LEAD_QUALIFIED' && (
                    <button
                      onClick={() => onAdvanceStage(lead.id, 'SURVEY_COMPLETED', 'Technical roof survey completed by Amit Verma. 850 sq ft unshaded area verified.')}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-[11px] font-semibold"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Mark Survey Done</span>
                    </button>
                  )}

                  {(isTenant || isLowBill) && (
                    <button
                      onClick={() => alert(`Dialing ${lead.phone} for 5-minute phone consultation. Surveyor visit bypassed.`)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-semibold"
                    >
                      <Phone className="w-3 h-3" />
                      <span>Start 5-Min Phone Call</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {filteredLeads.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 p-8">
            <p className="text-sm font-semibold text-slate-600">No leads match the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
