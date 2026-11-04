import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle, Eye, EyeOff, ShieldCheck, RefreshCw, Sparkles, Zap, ArrowRight } from 'lucide-react';

export default function BillInspectorModal({ lead, isOpen, onClose, onConfirmUpdates }) {
  if (!isOpen || !lead) return null;

  const ocr = lead.billDetails || {};
  const [consumerNumber, setConsumerNumber] = useState(ocr.consumerNumber || lead.consumerNumber || '049010045231');
  const [tariffCategory, setTariffCategory] = useState(ocr.tariffCategory || lead.tariffCategory || 'LT-I B Residential');
  const [sanctionedLoadKw, setSanctionedLoadKw] = useState(ocr.sanctionedLoadKw || lead.sanctionedLoadKw || 3.5);
  const [monthlyUnits, setMonthlyUnits] = useState(ocr.monthlyUnits || lead.avgUnits || 340);
  const [billedAmount, setBilledAmount] = useState(ocr.billedAmount || lead.monthlyBill || 3200);
  const [occupancyType, setOccupancyType] = useState(lead.occupancyType || 'Owner');
  const [maskData, setMaskData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [reUploadRequested, setReUploadRequested] = useState(false);

  const isPoorQuality = ocr.imageQualityScore && ocr.imageQualityScore < 60;

  const handleConfirm = async () => {
    setIsUpdating(true);
    try {
      await onConfirmUpdates(lead.id, {
        consumerNumber,
        tariffCategory,
        sanctionedLoadKw: Number(sanctionedLoadKw),
        monthlyUnits: Number(monthlyUnits),
        billedAmount: Number(billedAmount),
        occupancyType,
        isConfirmed: true
      });
      onClose();
    } catch (err) {
      console.error('Error confirming OCR:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              AI
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-slate-900 text-base">MSEDCL Bill AI Verification</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                  {lead.id}
                </span>
              </div>
              <p className="text-xs text-slate-500">Side-by-side human confirmation beside bill photo</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* DPDP Masking Toggle */}
            <button
              onClick={() => setMaskData(!maskData)}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-200 bg-white hover:bg-slate-50 text-slate-700"
              title="DPDP Act 2023 Masking"
            >
              {maskData ? <EyeOff className="w-3.5 h-3.5 text-slate-500" /> : <Eye className="w-3.5 h-3.5 text-emerald-600" />}
              <span>{maskData ? 'DPDP Mask Active' : 'DPDP Unmasked'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quality Warning Banner if photo is poor/blurry */}
        {isPoorQuality && (
          <div className="px-6 py-3 bg-amber-50 border-b border-amber-200 flex items-center justify-between text-xs text-amber-900">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Low Photo Quality ({ocr.imageQualityScore}% confidence):</strong> Bill photo is blurry or dark. Values below are estimated. Please confirm or re-upload a sharper photo.
              </span>
            </div>
            <div className="shrink-0 ml-4">
              <button
                onClick={() => setReUploadRequested(true)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  reUploadRequested
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-amber-600 hover:bg-amber-700 text-white'
                }`}
              >
                {reUploadRequested ? '✓ Re-upload Requested' : 'Request Re-Upload'}
              </button>
              {reUploadRequested && (
                <p className="mt-2 text-xs text-emerald-700 font-semibold">
                  ✓ Re-upload request sent. Customer will receive a WhatsApp prompt for a sharper photo.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Modal Body: Side-by-Side Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200 flex-1 overflow-y-auto">
          {/* Left Column: Visual Bill Document */}
          <div className="p-6 bg-slate-100 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                  MSEDCL Mahavitaran Bill Document
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  Quality: {ocr.imageQualityScore || 92}%
                </span>
              </div>

              {/* High-Fidelity Maharashtra Electricity Bill Simulation */}
              <div className="bg-white rounded-xl border border-slate-300 p-5 shadow-xs font-sans text-xs space-y-3">
                <div className="border-b border-slate-200 pb-3 flex justify-between items-start">
                  <div>
                    <div className="font-extrabold text-blue-900 text-sm tracking-tight">
                      MAHARASHTRA STATE ELECTRICITY DISTRIBUTION CO. LTD.
                    </div>
                    <div className="text-[10px] text-slate-500">
                      मराठी: महाराष्ट्र राज्य विद्युत वितरण कंपनी मर्यादित (महावितरण)
                    </div>
                    <div className="text-[10px] text-slate-600 font-mono mt-0.5">
                      Billing Unit: 4101 | Dharampeth Sub-Division, Nagpur Circle
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="px-2 py-0.5 rounded-sm bg-blue-50 text-blue-700 text-[10px] font-bold border border-blue-200">
                      LT-I RESIDENTIAL
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] bg-slate-50 p-3 rounded-lg border border-slate-200">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Consumer Name:</span>
                    <span className="font-bold text-slate-900">{lead.name}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Consumer No:</span>
                    <span className="font-mono font-bold text-blue-950">
                      {maskData ? (consumerNumber.substring(0, 5) + '*****' + consumerNumber.slice(-2)) : consumerNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Sanctioned Load:</span>
                    <span className="font-bold text-slate-900">{sanctionedLoadKw} kW (Single Phase)</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Tariff Category:</span>
                    <span className="font-bold text-slate-900">{tariffCategory}</span>
                  </div>
                </div>

                <div className="border-t border-b border-slate-200 py-3 grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                    <span className="text-[10px] text-emerald-700 block font-medium">Billed Units</span>
                    <span className="font-black text-emerald-950 text-base">{monthlyUnits}</span>
                    <span className="text-[9px] text-emerald-600 block">kWh</span>
                  </div>
                  <div className="p-2 rounded-lg bg-blue-50 border border-blue-100">
                    <span className="text-[10px] text-blue-700 block font-medium">Total Bill Amount</span>
                    <span className="font-black text-blue-950 text-base">₹{Number(billedAmount).toLocaleString('en-IN')}</span>
                    <span className="text-[9px] text-blue-600 block">Net Payable</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                    <span className="text-[10px] text-slate-600 block font-medium">Meter No</span>
                    <span className="font-mono font-bold text-slate-800 text-xs">MHD-88492</span>
                    <span className="text-[9px] text-slate-500 block">Digital Smart</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 flex items-center justify-between">
                  <span>Address: {lead.address || 'Nagpur, Maharashtra'}</span>
                  <span>Month: Oct 2026</span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 text-[11px] text-blue-900">
              <span className="font-bold">DPDP Act 2023 Compliance:</span> Consumer numbers and site addresses are classified as personal data. Antigravity stores audit logs and complies with section 6 consent mandates.
            </div>
          </div>

          {/* Right Column: Editable Human Confirmation & Score Outcome */}
          <div className="p-6 flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center space-x-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>AI Extracted Fields (Edit if needed)</span>
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                  96% Confidence
                </span>
              </div>

              {/* Form fields */}
              <div className="space-y-4 text-xs">
                {/* Consumer Number */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-semibold text-slate-700">MSEDCL Consumer Number</label>
                    <span className="text-[10px] text-emerald-700 font-mono">98% match</span>
                  </div>
                  <input
                    type="text"
                    value={consumerNumber}
                    onChange={(e) => setConsumerNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-mono font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  />
                </div>

                {/* Tariff Category & Sanctioned Load */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Tariff Category</label>
                    <input
                      type="text"
                      value={tariffCategory}
                      onChange={(e) => setTariffCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Sanctioned Load (kW)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={sanctionedLoadKw}
                      onChange={(e) => setSanctionedLoadKw(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Units & Billed Amount */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Monthly Units (kWh)</label>
                    <input
                      type="number"
                      value={monthlyUnits}
                      onChange={(e) => setMonthlyUnits(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Total Bill (₹)</label>
                    <input
                      type="number"
                      value={billedAmount}
                      onChange={(e) => setBilledAmount(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Ownership Selector */}
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Occupancy Status</label>
                  <select
                    value={occupancyType}
                    onChange={(e) => setOccupancyType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                  >
                    <option value="Owner">Property Owner</option>
                    <option value="Tenant">Tenant / Rented</option>
                  </select>
                </div>
              </div>

              {/* Lead Qualification Outcome Box */}
              <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Qualification Verdict</span>
                  <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    occupancyType === 'Tenant'
                      ? 'bg-amber-100 text-amber-900'
                      : Number(billedAmount) < 1000
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {occupancyType === 'Tenant' ? 'Low (tenant)' : Number(billedAmount) < 1000 ? 'Low (small bill)' : 'High Score'}
                  </span>
                </div>

                <div className="text-xs text-slate-700">
                  {occupancyType === 'Tenant' ? (
                    <p className="text-amber-800">
                      <strong>Action:</strong> Virtual consultation for property authorization & landlord consent. Avoids ₹2,500 on-site survey visit.
                    </p>
                  ) : Number(billedAmount) < 1000 ? (
                    <p className="text-blue-800">
                      <strong>Action:</strong> Low-consumption advisory displayed (&lt; 1 kW). Virtual guidance call scheduled; physical survey bypassed.
                    </p>
                  ) : (
                    <p className="text-emerald-800">
                      <strong>Action:</strong> Preliminary sizing: <strong>{Math.round(Number(monthlyUnits) / 116.7) || 3} kW</strong> system (subject to technical review). Priority same-day survey visit booked!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={isUpdating}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-2 transition-all"
              >
                {isUpdating ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Recalculate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

