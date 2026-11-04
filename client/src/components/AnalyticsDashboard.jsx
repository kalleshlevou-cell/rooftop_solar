import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function AnalyticsDashboard({ t }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAnalytics(data.analytics);
      })
      .catch(err => console.error('Error loading analytics:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading analytics...</p>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="max-w-7xl mx-auto py-16 px-4 text-center">
        <p className="text-sm font-semibold text-slate-600">Could not load analytics data.</p>
      </div>
    );
  }

  const {
    totalLeadsThisMonth,
    totalLeadsLastMonth,
    pctChange,
    scoreBreakdown,
    conversionFunnel,
    avgDaysLeadToQuote,
    avgDaysQuoteToPayment,
    revenuePipeline,
    surveyCostSaved,
    topPincodes
  } = analytics;

  const totalLeads = conversionFunnel.leads || 1;
  const highTotal = (scoreBreakdown.highCount || 0) + (scoreBreakdown.mediumCount || 0) + (scoreBreakdown.lowCount || 0) || 1;

  const funnelStages = [
    { label: 'Leads', count: conversionFunnel.leads, color: 'bg-slate-600' },
    { label: 'Surveys', count: conversionFunnel.surveysDispatched, color: 'bg-blue-600' },
    { label: 'Quotes Built', count: conversionFunnel.quotesBuilt, color: 'bg-amber-500' },
    { label: 'Advances Paid', count: conversionFunnel.advancesPaid, color: 'bg-emerald-600' },
    { label: 'Completed', count: conversionFunnel.completed, color: 'bg-emerald-800' },
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center space-x-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200">
            MD Analytics Dashboard
          </span>
          <span className="text-xs text-slate-500 font-mono">Company A Solar, Nagpur</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Business Intelligence</h1>
        <p className="text-xs sm:text-sm text-slate-500">Real-time metrics computed from active lead and project data.</p>
      </div>

      {/* Section 1: Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Leads This Month */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Leads This Month</span>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-slate-900">{totalLeadsThisMonth}</span>
            {pctChange !== null && (
              <span className={`flex items-center text-xs font-bold px-2 py-0.5 rounded-full ${
                pctChange >= 0
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'bg-rose-50 text-rose-700'
              }`}>
                {pctChange >= 0
                  ? <TrendingUp className="w-3 h-3 mr-0.5" />
                  : <TrendingDown className="w-3 h-3 mr-0.5" />
                }
                {pctChange >= 0 ? '+' : ''}{pctChange}%
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">vs {totalLeadsLastMonth} last month</span>
        </div>

        {/* Revenue Pipeline */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Revenue Pipeline</span>
          <div className="text-3xl font-extrabold text-emerald-700">
            ₹{(revenuePipeline / 100000).toFixed(1)}L
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">{conversionFunnel.advancesPaid} active projects × ₹2L avg</span>
        </div>

        {/* Survey Cost Saved */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Survey Cost Saved</span>
          <div className="text-3xl font-extrabold text-slate-900">
            ₹{surveyCostSaved.toLocaleString('en-IN')}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">₹2,500 saved per LOW lead</span>
        </div>

        {/* Avg Lead to Quote */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 block mb-1">Avg Lead → Quote</span>
          <div className="text-3xl font-extrabold text-slate-900">
            {avgDaysLeadToQuote !== null ? `${avgDaysLeadToQuote}d` : 'N/A'}
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Quote → Payment: {avgDaysQuoteToPayment !== null ? `${avgDaysQuoteToPayment}d` : 'N/A'}
          </span>
        </div>
      </div>

      {/* Section 2: Score Breakdown Visual Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-extrabold text-slate-900 text-sm mb-4">Lead Score Distribution</h3>
        <div className="space-y-3">
          {[
            { label: 'HIGH Priority', count: scoreBreakdown.highCount, color: 'bg-emerald-600', textColor: 'text-emerald-700' },
            { label: 'MEDIUM', count: scoreBreakdown.mediumCount, color: 'bg-amber-500', textColor: 'text-amber-700' },
            { label: 'LOW (Tenant + Small Bill)', count: scoreBreakdown.lowCount, color: 'bg-blue-500', textColor: 'text-blue-700' },
          ].map((item) => (
            <div key={item.label} className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-slate-600 w-40 shrink-0">{item.label}</span>
              <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-3 rounded-full ${item.color} transition-all`}
                  style={{ width: `${Math.round((item.count / highTotal) * 100)}%` }}
                />
              </div>
              <span className={`text-xs font-extrabold w-8 text-right ${item.textColor}`}>{item.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Conversion Funnel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h3 className="font-extrabold text-slate-900 text-sm mb-4">Conversion Funnel</h3>
        <div className="flex flex-wrap items-end gap-2">
          {funnelStages.map((stage, idx) => {
            const pct = idx === 0 ? 100 : Math.round((stage.count / (funnelStages[idx - 1].count || 1)) * 100);
            return (
              <React.Fragment key={stage.label}>
                <div className="flex flex-col items-center flex-1 min-w-[80px]">
                  <span className="text-2xl font-extrabold text-slate-900">{stage.count}</span>
                  <div className={`w-full h-2 rounded-full mt-1 mb-2 ${stage.color}`} />
                  <span className="text-[10px] font-semibold text-slate-600 text-center">{stage.label}</span>
                  {idx > 0 && (
                    <span className="text-[10px] text-slate-400 mt-0.5">{pct}% conv.</span>
                  )}
                </div>
                {idx < funnelStages.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-slate-300 mb-8 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Section 4: Top Pincodes + Avg Days Side-by-Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Pincodes */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <span>Top 5 Pincodes by Lead Volume</span>
          </h3>
          <div className="space-y-2">
            {topPincodes.length === 0 && (
              <p className="text-xs text-slate-400">No pincode data available.</p>
            )}
            {topPincodes.map((p, idx) => (
              <div key={p.pincode} className="flex items-center space-x-3">
                <span className="text-xs font-bold text-slate-400 w-4">{idx + 1}</span>
                <span className="font-mono text-xs font-bold text-slate-800 w-16">{p.pincode}</span>
                <div className="flex-1 bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${Math.round((p.count / (topPincodes[0]?.count || 1)) * 100)}%` }}
                  />
                </div>
                <span className="text-xs font-bold text-slate-700 w-6 text-right">{p.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Timing Metrics */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <h3 className="font-extrabold text-slate-900 text-sm mb-4 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Sales Cycle Timing</span>
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100">
              <span className="text-[10px] font-semibold text-emerald-700 block uppercase">Lead → Quote</span>
              <span className="text-3xl font-extrabold text-emerald-900">
                {avgDaysLeadToQuote !== null ? avgDaysLeadToQuote : '—'}
              </span>
              <span className="text-xs text-emerald-700 block">days avg</span>
            </div>
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
              <span className="text-[10px] font-semibold text-amber-700 block uppercase">Quote → Payment</span>
              <span className="text-3xl font-extrabold text-amber-900">
                {avgDaysQuoteToPayment !== null ? avgDaysQuoteToPayment : '—'}
              </span>
              <span className="text-xs text-amber-700 block">days avg</span>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
            <span className="font-bold">Target: </span>Lead-to-quote &lt; 1 day (same-day delivery goal). Quote-to-payment &lt; 7 days.
          </div>
        </div>
      </div>
    </div>
  );
}
