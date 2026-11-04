import React, { useState } from 'react';
import { Upload, Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Home, FileText, ArrowRight, Zap, Info, Eye } from 'lucide-react';

export default function HomeownerForm({ t, onSubmitLead, onSelectSample, isAnalyzing }) {
  const [occupancyType, setOccupancyType] = useState('Owner');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [monthlyBill, setMonthlyBill] = useState(3200);
  const [avgUnits, setAvgUnits] = useState(340);
  const [roofType, setRoofType] = useState('Concrete Flat');
  const [roofAreaSqFt, setRoofAreaSqFt] = useState(850);
  const [pincode, setPincode] = useState('440022');
  const [address, setAddress] = useState('Plot 42, Laxmi Nagar, Nagpur');
  const [dpdpConsent, setDpdpConsent] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [activeSample, setActiveSample] = useState(null);

  // Quick preset bill values for fast exploration
  const billPresets = [
    { label: '₹650 (Ayesha - 85 units)', bill: 650, units: 85, sample: 'ayesha' },
    { label: '₹1,900 (Rohit - 210 units)', bill: 1900, units: 210, sample: 'rohit' },
    { label: '₹3,200 (Prashant - 340 units)', bill: 3200, units: 340, sample: 'prashant' },
    { label: '₹5,800 (Agrawal - 620 units)', bill: 5800, units: 620, sample: 'agrawal' }
  ];

  const handleBillChange = (val) => {
    const num = Number(val);
    setMonthlyBill(num);
    // Standard MSEDCL slab estimation
    setAvgUnits(Math.round(num / 9.4));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setActiveSample(null);
    }
  };

  const handleSampleClick = (sampleType) => {
    setActiveSample(sampleType);
    if (sampleType === 'prashant') {
      setName('Prashant Wankhede');
      setPhone('+91 98230 44102');
      setEmail('prashant.wankhede@gmail.com');
      setOccupancyType('Owner');
      setMonthlyBill(3200);
      setAvgUnits(340);
      setRoofType('Concrete Flat');
      setRoofAreaSqFt(850);
      setPincode('440022');
      setAddress('Plot 42, Laxmi Nagar, Nagpur');
      setPreviewUrl('https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=600');
    } else if (sampleType === 'rohit') {
      setName('Rohit Meshram');
      setPhone('+91 94221 88319');
      setEmail('rohit.meshram@outlook.com');
      setOccupancyType('Tenant');
      setMonthlyBill(1900);
      setAvgUnits(210);
      setRoofType('Metal Sheet');
      setRoofAreaSqFt(400);
      setPincode('440010');
      setAddress('Flat 302, Gokulpeth, Nagpur');
      setPreviewUrl('https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=600');
    } else if (sampleType === 'ayesha') {
      setName('Ayesha Siddiqui');
      setPhone('+91 98902 12948');
      setEmail('ayesha.siddiqui@rediffmail.com');
      setOccupancyType('Owner');
      setMonthlyBill(650);
      setAvgUnits(85);
      setRoofType('Concrete Flat');
      setRoofAreaSqFt(600);
      setPincode('440002');
      setAddress('House 14, Mominpura, Nagpur');
      setPreviewUrl('https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=600');
    } else if (sampleType === 'blurry') {
      setName('Devendra Joshi (Test Blurry Photo)');
      setPhone('+91 99220 11099');
      setEmail('');
      setOccupancyType('Owner');
      setMonthlyBill(2400);
      setAvgUnits(260);
      setRoofType('Concrete Flat');
      setRoofAreaSqFt(700);
      setPincode('440015');
      setAddress('Dhantoli, Nagpur');
      setPreviewUrl('https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=600');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dpdpConsent) {
      alert('Please check the DPDP Act 2023 privacy consent to proceed.');
      return;
    }

    const payload = {
      name: name || 'Vidarbha Homeowner',
      phone: phone || '+91 98230 00000',
      email,
      occupancyType,
      monthlyBill: Number(monthlyBill),
      avgUnits: Number(avgUnits),
      roofType,
      roofAreaSqFt: Number(roofAreaSqFt),
      pincode,
      address,
      dpdpConsent,
      sampleBillName: activeSample ? `sample_${activeSample}.jpg` : 'custom_upload.jpg',
      file: selectedFile
    };

    onSubmitLead(payload);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      {/* Title & Trust Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Vidarbha Solar Intelligence Engine • MSEDCL Net Metering</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          {t.formTitle}
        </h1>
        <p className="mt-2 text-sm text-slate-600 max-w-2xl mx-auto">
          {t.formSubtitle}
        </p>
      </div>

      {/* Quick Sample Selector Bar */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-4 mb-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Load Prompt Test Lead:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSampleClick('prashant')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeSample === 'prashant'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              LD-30881: Prashant (₹3.2k, Owner - High)
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('rohit')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeSample === 'rohit'
                  ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              LD-30902: Rohit (₹1.9k, Tenant - Low)
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('ayesha')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                activeSample === 'ayesha'
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              LD-30915: Ayesha (₹650, Small Bill)
            </button>
            <button
              type="button"
              onClick={() => handleSampleClick('blurry')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border border-dashed transition-all ${
                activeSample === 'blurry'
                  ? 'bg-rose-600 text-white border-rose-600'
                  : 'text-rose-700 border-rose-200 bg-rose-50 hover:bg-rose-100'
              }`}
              title="Test poor photo detection & re-upload warning"
            >
              Blurry Bill (Test Re-upload)
            </button>
          </div>
        </div>
      </div>

      {/* Main Intake Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 space-y-8">
          {/* Section 1: Property Ownership */}
          <div>
            <label className="block text-sm font-bold text-slate-900 mb-3">
              1. {t.step1Occupancy} <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setOccupancyType('Owner')}
                className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all ${
                  occupancyType === 'Owner'
                    ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <Home className={`w-5 h-5 ${occupancyType === 'Owner' ? 'text-emerald-600' : 'text-slate-400'}`} />
                <span className="font-semibold text-sm">{t.owner}</span>
              </button>

              <button
                type="button"
                onClick={() => setOccupancyType('Tenant')}
                className={`flex items-center justify-center space-x-3 p-4 rounded-2xl border-2 transition-all ${
                  occupancyType === 'Tenant'
                    ? 'border-amber-600 bg-amber-50/50 text-amber-900 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <FileText className={`w-5 h-5 ${occupancyType === 'Tenant' ? 'text-amber-600' : 'text-slate-400'}`} />
                <span className="font-semibold text-sm">{t.tenant}</span>
              </button>
            </div>

            {/* Smart Tenant Notice (Solves the ₹26.4L Wasted Survey Cost!) */}
            {occupancyType === 'Tenant' && (
              <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Tenant Workflow Activated:</span> {t.tenantNotice}
                  <div className="mt-1 font-semibold text-amber-900">
                    💡 Benefit to Company A: Automatically converts ₹2,500 physical surveyor visit to a fast phone call!
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Roof Specifications */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              2. {t.step2Roof}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.roofType}</label>
                <select
                  value={roofType}
                  onChange={(e) => setRoofType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                >
                  <option value="Concrete Flat">{t.roofConcrete}</option>
                  <option value="Metal Sheet">{t.roofTin}</option>
                  <option value="Tiled / Slanted">{t.roofTile}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.roofArea}</label>
                <div className="relative">
                  <input
                    type="number"
                    value={roofAreaSqFt}
                    onChange={(e) => setRoofAreaSqFt(e.target.value)}
                    placeholder="e.g. 800"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                  <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-medium">sq ft</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Electricity Bill & Vidarbha Location */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              3. {t.step3Bill}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.monthlyBillLabel}</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold text-sm">₹</span>
                  <input
                    type="number"
                    value={monthlyBill}
                    onChange={(e) => handleBillChange(e.target.value)}
                    className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                  />
                </div>
                <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500">
                  <span>Est. {avgUnits} units/mo</span>
                  {monthlyBill < 1000 && (
                    <span className="text-amber-600 font-medium">Low Bill (&lt; ₹1,000)</span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">{t.pincodeLabel}</label>
                <input
                  type="text"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="440022"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
                <span className="block mt-1 text-[11px] text-slate-400">{t.pincodeHelper}</span>
              </div>
            </div>
          </div>

          {/* Section 4: Customer Contact Info */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              4. Contact & Address
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Prashant Wankhede"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Mobile (WhatsApp for Quote)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98230 XXXXX"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@gmail.com"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Street / Locality</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Plot 42, Laxmi Nagar"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          {/* Section 5: MSEDCL Bill Upload & AI Preview */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-sm font-bold text-slate-900 mb-3">
              5. {t.step4BillUpload}
            </label>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Upload Dropzone */}
              <div className="border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-2xl p-6 text-center bg-slate-50/50 hover:bg-emerald-50/20 transition-all cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-semibold text-slate-800">
                  {selectedFile ? selectedFile.name : t.dropBillHere}
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  MSEDCL Mahavitaran bill photo (JPG, PNG or PDF)
                </p>
              </div>

              {/* Bill Preview Card */}
              <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 flex items-center space-x-4">
                <div className="w-20 h-24 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                  {previewUrl ? (
                    <img src={previewUrl} alt="Bill Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FileText className="w-8 h-8 text-slate-300" />
                  )}
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-bold text-slate-900 flex items-center space-x-1.5">
                    <span>MSEDCL Bill Ready</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-slate-500">
                    AI will automatically read Consumer No., Sanctioned Load, Tariff & Units.
                  </p>
                  <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm inline-block border border-emerald-200">
                    Side-by-side human confirmation enabled
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: DPDP Act 2023 Compliance Checkbox */}
          <div className="pt-2 border-t border-slate-100">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={dpdpConsent}
                  onChange={(e) => setDpdpConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
                />
                <div className="text-xs text-slate-700 leading-relaxed">
                  <span className="font-bold text-slate-900 flex items-center space-x-1 mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{t.dpdpConsentTitle}</span>
                  </span>
                  {t.dpdpConsentText}
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="bg-slate-50 px-6 sm:px-8 py-5 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 flex items-center space-x-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>Generation calculated with 1,400 units/kW/yr Vidarbha rule</span>
          </div>

          <button
            type="submit"
            disabled={isAnalyzing}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all disabled:opacity-60"
          >
            {isAnalyzing ? (
              <>
                <Sparkles className="w-4 h-4 animate-spin" />
                <span>{t.btnAnalyzing}</span>
              </>
            ) : (
              <>
                <span>{t.btnCalculate}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

