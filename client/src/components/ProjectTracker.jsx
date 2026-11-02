import React, { useState } from 'react';
import { Activity, AlertTriangle, CheckCircle2, Clock, Send, ExternalLink, ShieldCheck, Zap, ArrowRight, RefreshCw, Copy, Check } from 'lucide-react';

export default function ProjectTracker({ projects = [], stuckProjects = [], onAdvanceStage, onEscalate, onSelectLeadForPublicTracker }) {
  const [activeTab, setActiveTab] = useState('stuck'); // 'stuck' | 'all'
  const [copiedId, setCopiedId] = useState(null);

  const STAGES = [
    { key: 'LEAD_QUALIFIED', label: 'Qualified', color: 'bg-blue-500' },
    { key: 'SURVEY_COMPLETED', label: 'Survey Done', color: 'bg-indigo-500' },
    { key: 'QUOTE_APPROVED', label: 'Advance Paid', color: 'bg-emerald-500' },
    { key: 'DISCOM_APPLICATION_SUBMITTED', label: 'MSEDCL Filed', color: 'bg-amber-500' },
    { key: 'MATERIAL_DISPATCHED_INSTALLED', label: 'Installed', color: 'bg-purple-500' },
    { key: 'DISCOM_INSPECTION_METERING', label: 'Net Metered', color: 'bg-teal-500' },
    { key: 'SUBSIDY_CLAIM_FILED', label: 'Claim Submitted', color: 'bg-cyan-500' },
    { key: 'SUBSIDY_CREDITED', label: 'Subsidy Credited (₹78k)', color: 'bg-emerald-600' }
  ];

  const handleCopyLink = (token) => {
    const url = `${window.location.origin}/track/${token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(token);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Title & Stuck Projects Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200">
                Project Coordinator Dashboard
              </span>
              <span className="text-xs text-slate-500 font-mono">Company A Nagpur Ops</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Installation Tracker & Bottleneck Monitor
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Tracks projects from booking advance to ₹78,000 DBT credit. Flags MSEDCL & portal delays.
            </p>
          </div>

          {/* Toggle buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('stuck')}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-1.5 transition-all ${
                activeTab === 'stuck'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Stuck Projects Alert ({stuckProjects.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              All Projects Pipeline ({projects.length})
            </button>
          </div>
        </div>
      </div>

      {/* STUCK PROJECTS ALERT CENTER */}
      {activeTab === 'stuck' && (
        <div className="space-y-6">
          <div className="bg-rose-50 border border-rose-200 rounded-3xl p-6">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center font-bold">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-rose-950 text-base">
                  Critical SLA Delays Requiring Immediate Intervention
                </h3>
                <p className="text-xs text-rose-800">
                  {stuckProjects.length} active installations have exceeded their DISCOM or National Portal SLA.
                </p>
              </div>
            </div>

            <div className="space-y-4 mt-4">
              {stuckProjects.map((p) => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-rose-200 p-5 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        {p.id}
                      </span>
                      <h4 className="font-bold text-slate-900 text-base">{p.name}</h4>
                      <span className="px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-extrabold text-xs">
                        Delayed by {p.delayDays} days ({p.daysAtCurrentStage} days at stage vs {p.slaDays}-day SLA)
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Current Stage:</span>
                        <span className="font-bold text-slate-900">{p.status.replace(/_/g, ' ')}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">System Capacity:</span>
                        <span className="font-bold text-slate-900">{p.recommendedKw || 3} kW On-Grid</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Site Address:</span>
                        <span className="font-bold text-slate-900">{p.address}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Consumer No:</span>
                        <span className="font-mono font-bold text-slate-900">
                          {p.billDetails?.maskedConsumerNumber || p.consumerNumber?.substring(0, 5) + '*****'}
                        </span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-rose-50/60 rounded-xl text-xs text-rose-900">
                      <strong>Bottleneck Analysis: </strong>
                      {p.status === 'DISCOM_APPLICATION_SUBMITTED'
                        ? 'MSEDCL Junior Engineer has not scheduled site inspection within the 10-day regulatory window. Application pending at Nagpur Circle office.'
                        : p.status === 'SUBSIDY_CLAIM_FILED'
                        ? 'National Portal DBT disbursement pending bank account verification. Direct liaison with nodal officer required.'
                        : 'Action delayed. Automated follow-up suggested.'}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap lg:flex-col gap-2 shrink-0 justify-end">
                    <button
                      onClick={() => onEscalate(p.id)}
                      className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs transition-all"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Escalate to DISCOM Sub-Division</span>
                    </button>

                    <button
                      onClick={() => onSelectLeadForPublicTracker(p)}
                      className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white text-xs font-semibold text-slate-700"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                      <span>View Customer Status Link</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ALL PROJECTS PIPELINE */}
      {activeTab === 'all' && (
        <div className="space-y-4">
          <div className="overflow-x-auto bg-white rounded-3xl border border-slate-200 shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-500 font-bold uppercase border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3.5">Lead / Customer</th>
                  <th className="px-5 py-3.5">Current Stage</th>
                  <th className="px-5 py-3.5">System</th>
                  <th className="px-5 py-3.5">Days at Stage</th>
                  <th className="px-5 py-3.5">Customer Status Link</th>
                  <th className="px-5 py-3.5 text-right">Advance Stage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {projects.map((p) => {
                  const stageIndex = STAGES.findIndex(s => s.key === p.status);
                  const nextStage = stageIndex !== -1 && stageIndex < STAGES.length - 1 ? STAGES[stageIndex + 1] : null;

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="px-5 py-4">
                        <div className="font-extrabold text-slate-900 text-sm">{p.name}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{p.id} • {p.pincode}</div>
                      </td>

                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          p.status === 'SUBSIDY_CREDITED'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                            : p.isStuck
                            ? 'bg-rose-100 text-rose-900 border border-rose-300'
                            : 'bg-blue-50 text-blue-800 border border-blue-200'
                        }`}>
                          {p.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td className="px-5 py-4 font-semibold text-slate-700">
                        {p.recommendedKw || 3} kW
                      </td>

                      <td className="px-5 py-4">
                        <span className={`font-bold ${p.isStuck ? 'text-rose-600' : 'text-slate-600'}`}>
                          {p.daysAtCurrentStage} days
                        </span>
                        {p.isStuck && <span className="block text-[10px] text-rose-500 font-medium">exceeds SLA</span>}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onSelectLeadForPublicTracker(p)}
                            className="text-emerald-700 font-semibold hover:underline flex items-center space-x-1"
                          >
                            <span>Open Tracker</span>
                            <ExternalLink className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleCopyLink(p.trackingToken)}
                            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            title="Copy SMS/WhatsApp link"
                          >
                            {copiedId === p.trackingToken ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-right">
                        {nextStage ? (
                          <button
                            onClick={() => onAdvanceStage(p.id, nextStage.key, `Advanced to ${nextStage.label} by project coordinator.`)}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-black text-white text-[11px] font-bold transition-all shadow-xs"
                          >
                            Move to {nextStage.label}
                          </button>
                        ) : (
                          <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            Completed & Credited
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
