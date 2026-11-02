import React, { useState, useEffect } from 'react';
import { Sun, CheckCircle2, Clock, MapPin, Zap, ShieldCheck, Award, FileText, Download, Phone, MessageSquare, ArrowRight, Activity, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PublicCustomerTracker({ trackingToken, leadData, onOpenPayment, t }) {
  const [trackingInfo, setTrackingInfo] = useState(leadData || null);
  const [loading, setLoading] = useState(!leadData);

  useEffect(() => {
    if (trackingToken) {
      fetch(`/api/projects/track/${trackingToken}`)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setTrackingInfo(data.tracking);
          }
        })
        .catch(err => console.error('Error loading tracking info:', err))
        .finally(() => setLoading(false));
    }
  }, [trackingToken]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm font-semibold text-slate-600">Loading solar project status...</p>
      </div>
    );
  }

  const p = trackingInfo || leadData;
  if (!p) {
    return (
      <div className="max-w-md mx-auto py-16 px-4 text-center">
        <h3 className="text-lg font-bold text-slate-900">Project Not Found</h3>
        <p className="text-xs text-slate-500 mt-1">Please verify your tracking link from WhatsApp/SMS.</p>
      </div>
    );
  }

  const timeline = p.timeline || [
    { key: 'LEAD_QUALIFIED', label: '1. Lead Qualified & AI Sized', state: 'COMPLETED' },
    { key: 'SURVEY_COMPLETED', label: '2. Roof Survey Completed', state: 'COMPLETED' },
    { key: 'QUOTE_APPROVED', label: '3. Quote Approved & Advance Paid', state: 'CURRENT' },
    { key: 'DISCOM_APPLICATION_SUBMITTED', label: '4. MSEDCL Net Metering Filed', state: 'PENDING' },
    { key: 'MATERIAL_DISPATCHED_INSTALLED', label: '5. Solar Panels & Inverter Installed', state: 'PENDING' },
    { key: 'DISCOM_INSPECTION_METERING', label: '6. Net Meter Tested & Energized', state: 'PENDING' },
    { key: 'SUBSIDY_CLAIM_FILED', label: '7. PM Surya Ghar Subsidy Claim Filed', state: 'PENDING' },
    { key: 'SUBSIDY_CREDITED', label: '8. ₹78,000 Subsidy Credited to Bank', state: 'PENDING' }
  ];

  const isCompleted = p.currentStatus === 'SUBSIDY_CREDITED';

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6">
      {/* Mobile-Friendly Customer Portal Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-6 sm:p-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '10s' }} />
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Company A • Vidarbha Solar Tracker
              </span>
            </div>
            <span className="font-mono text-xs bg-emerald-700/60 text-emerald-200 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              {p.leadId || 'LD-30881'}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            {p.customerName || 'Prashant Wankhede'}’s Solar Rooftop
          </h1>
          <p className="text-xs text-emerald-100/80 mt-1">
            {p.address || 'Plot 42, Laxmi Nagar, Nagpur 440022'} • MSEDCL Consumer: {p.maskedConsumerNumber || '04901*****31'}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold flex items-center space-x-1.5 border border-white/10">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>{p.recommendedKw || 3} kW On-Grid System</span>
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold flex items-center space-x-1.5 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
              <span>₹78,000 PM Surya Ghar Subsidy</span>
            </div>
          </div>
        </div>

        {/* Subsidy celebration banner if completed! */}
        {isCompleted && (
          <div className="p-4 bg-emerald-500 text-white text-center font-bold text-xs flex items-center justify-center space-x-2">
            <Award className="w-4 h-4 text-amber-300" />
            <span>Congratulations! ₹78,000 PM Surya Ghar central subsidy has been credited to your bank account!</span>
          </div>
        )}

        {/* Timeline Stepper */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-900 text-sm uppercase tracking-wider">
              Installation & Subsidy Lifecycle
            </h3>
            <span className="text-xs text-slate-500 font-medium">8 Guided Stages</span>
          </div>

          <div className="space-y-4">
            {timeline.map((step, idx) => {
              const isDone = step.state === 'COMPLETED';
              const isCurr = step.state === 'CURRENT';

              return (
                <div
                  key={step.key}
                  className={`flex items-start space-x-4 p-4 rounded-2xl border transition-all ${
                    isCurr
                      ? 'border-emerald-500 bg-emerald-50/40 ring-1 ring-emerald-500 shadow-xs'
                      : isDone
                      ? 'border-slate-200 bg-slate-50/50'
                      : 'border-slate-100 opacity-60'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs ${
                    isDone
                      ? 'bg-emerald-600 text-white'
                      : isCurr
                      ? 'bg-emerald-600 text-white animate-pulse'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : (idx + 1)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className={`text-sm font-bold ${isCurr ? 'text-emerald-950 font-extrabold' : 'text-slate-900'}`}>
                        {step.label}
                      </h4>
                      <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                        isDone
                          ? 'bg-emerald-100 text-emerald-800'
                          : isCurr
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-100 text-slate-500'
                      }`}>
                        {isDone ? 'Completed' : isCurr ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>

                    {isCurr && (
                      <div className="mt-2 text-xs text-slate-600 space-y-2">
                        <p>
                          Our dedicated project engineer is currently managing this phase with MSEDCL Mahavitaran authorities.
                        </p>
                        {step.key === 'QUOTE_APPROVED' && (
                          <div className="pt-2">
                            <button
                              onClick={() => onOpenPayment(10200)}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs flex items-center space-x-1.5"
                            >
                              <span>Pay 10% Booking Advance (₹10,200)</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customer Document Locker */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-sm mb-3">
              Your Solar Project Documents
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[
                { title: 'Technical Roof Survey & Feasibility Report', date: 'Oct 31, 2026', size: '1.2 MB' },
                { title: 'Company A Solar Turnkey Agreement', date: 'Nov 01, 2026', size: '2.4 MB' },
                { title: 'MSEDCL Net Metering Application & Sanction', date: 'In Progress', size: 'Portal Sync' },
                { title: 'PM Surya Ghar DBT Subsidy Certificate', date: isCompleted ? 'Completed' : 'Pending Metering', size: 'Govt DBT' }
              ].map((doc, i) => (
                <div key={i} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2.5">
                    <FileText className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold text-slate-800 block text-xs truncate max-w-[180px]">{doc.title}</span>
                      <span className="text-[10px] text-slate-400">{doc.date}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Downloading verified copy of: ${doc.title}`)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-700 hover:bg-white border border-slate-200"
                    title="Download document"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Need help footer */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Project Coordinator: <strong>Sanjay Patil (+91 712 255XXXX)</strong></span>
            <button
              onClick={() => alert('Connecting to your project coordinator on WhatsApp...')}
              className="text-emerald-700 font-bold hover:underline flex items-center space-x-1"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

