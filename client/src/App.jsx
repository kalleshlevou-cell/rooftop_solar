import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import Navbar from './components/Navbar';
import HomeownerForm from './components/HomeownerForm';
import BillInspectorModal from './components/BillInspectorModal';
import QuoteStoryView from './components/QuoteStoryView';
import SalesDesk from './components/SalesDesk';
import ProjectTracker from './components/ProjectTracker';
import PublicCustomerTracker from './components/PublicCustomerTracker';
import AdminRulesView from './components/AdminRulesView';
import WhatsAppSimulatorModal from './components/WhatsAppSimulatorModal';
import MockPaymentModal from './components/MockPaymentModal';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import { translations } from './i18n/translations';

// Standalone tracker wrapper used by /track/:token route
function StandaloneTracker() {
  const { token } = useParams();
  const [paymentLead, setPaymentLead] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(10200);
  const t = translations.en;

  return (
    <>
      <PublicCustomerTracker
        trackingToken={token}
        leadData={null}
        t={t}
        onOpenPayment={(amt) => {
          setPaymentAmount(amt);
        }}
      />
      {paymentLead && (
        <MockPaymentModal
          lead={paymentLead}
          amount={paymentAmount}
          isOpen={!!paymentLead}
          onClose={() => setPaymentLead(null)}
          onPaymentSuccess={() => setPaymentLead(null)}
        />
      )}
    </>
  );
}

// Main app shell component
function MainShell() {
  const [currentRole, setCurrentRole] = useState('homeowner'); // 'homeowner' | 'sales' | 'pipeline' | 'admin' | 'tracker' | 'quote' | 'analytics'
  const [currentLang, setCurrentLang] = useState('en');
  const t = translations[currentLang] || translations.en;

  // Global Data State
  const [leads, setLeads] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [subsidyRules, setSubsidyRules] = useState([]);
  const [pricingConfig, setPricingConfig] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [stuckProjects, setStuckProjects] = useState([]);
  const [projectsList, setProjectsList] = useState([]);

  // Active Contexts
  const [selectedLead, setSelectedLead] = useState(null);
  const [activeQuote, setActiveQuote] = useState(null);

  // Modals
  const [inspectingLead, setInspectingLead] = useState(null);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState(false);
  const [paymentLead, setPaymentLead] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState(10200);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Duplicate banner state
  const [duplicateBanner, setDuplicateBanner] = useState(null);

  // Load initial backend data
  const loadLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success) {
        setLeads(data.leads);
        setMetrics(data.metrics);
        // Default selected lead to first high lead (e.g. Prashant Wankhede)
        if (!selectedLead && data.leads.length > 0) {
          setSelectedLead(data.leads[0]);
        }
      }
    } catch (err) {
      console.error('Error loading leads:', err);
    }
  };

  const loadProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjectsList(data.projects);
        setStuckProjects(data.stuckProjects);
      }
    } catch (err) {
      console.error('Error loading projects:', err);
    }
  };

  const loadAdminConfig = async () => {
    try {
      const [resRules, resPricing, resNotifs] = await Promise.all([
        fetch('/api/admin/subsidy-rules'),
        fetch('/api/admin/pricing'),
        fetch('/api/admin/notifications')
      ]);
      const dataRules = await resRules.json();
      const dataPricing = await resPricing.json();
      const dataNotifs = await resNotifs.json();

      if (dataRules.success) setSubsidyRules(dataRules.rules);
      if (dataPricing.success) setPricingConfig(dataPricing.pricing);
      if (dataNotifs.success) setNotifications(dataNotifs.notifications);
    } catch (err) {
      console.error('Error loading admin config:', err);
    }
  };

  useEffect(() => {
    loadLeads();
    loadProjects();
    loadAdminConfig();
  }, []);

  // Helper to fetch and set active quote for a lead
  const fetchAndSetQuote = async (lead) => {
    if (lead && lead.quoteId) {
      try {
        const qRes = await fetch(`/api/quotes/${lead.quoteId}`);
        const qData = await qRes.json();
        if (qData.success) {
          setActiveQuote(qData.quote);
        }
      } catch (qErr) {
        console.error('Error loading saved quote:', qErr);
        // Fall through — QuoteStoryView will recalculate via its own useEffect
      }
    }
  };

  // Form Submit Handler
  const handleSubmitLead = async (formData) => {
    setIsAnalyzing(true);
    try {
      const body = new FormData();
      Object.keys(formData).forEach(k => {
        if (formData[k] !== undefined && formData[k] !== null) {
          body.append(k, formData[k]);
        }
      });
      body.append('preferredLanguage', currentLang);

      const res = await fetch('/api/leads', {
        method: 'POST',
        body
      });
      const data = await res.json();

      if (data.success) {
        if (data.isDuplicate) {
          // Duplicate lead found — show welcome back banner
          setSelectedLead(data.lead);
          await loadLeads();
          setDuplicateBanner(data.lead);
        } else {
          setSelectedLead(data.lead);
          await loadLeads();
          await loadProjects();
          await loadAdminConfig();

          // Show side-by-side verification modal or jump to quote
          setInspectingLead(data.lead);
        }
      }
    } catch (err) {
      console.error('Error submitting lead:', err);
      alert('Error analyzing bill: ' + err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Confirm OCR Changes
  const handleConfirmOCR = async (leadId, updates) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/ocr-confirm`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      if (data.success) {
        setSelectedLead(data.lead);
        await loadLeads();
        // Bug B1: Load saved quote before transitioning to quote view
        await fetchAndSetQuote(data.lead);
        // Transition to Quote View!
        setCurrentRole('quote');
      }
    } catch (err) {
      console.error('Error confirming OCR:', err);
    }
  };

  // Stage Advancement
  const handleAdvanceStage = async (leadId, newStage, note) => {
    try {
      const res = await fetch(`/api/leads/${leadId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newStage, note, preferredLanguage: currentLang })
      });
      const data = await res.json();
      if (data.success) {
        await loadLeads();
        await loadProjects();
        await loadAdminConfig();
      }
    } catch (err) {
      console.error('Error advancing stage:', err);
    }
  };

  // Escalate Stuck Project
  const handleEscalate = async (leadId) => {
    try {
      const res = await fetch(`/api/projects/${leadId}/escalate`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message);
        await loadProjects();
        await loadAdminConfig();
      }
    } catch (err) {
      console.error('Error escalating project:', err);
    }
  };

  // Payment Success
  const handlePaymentSuccess = async (leadId, amount, paymentMethod) => {
    try {
      const res = await fetch('/api/projects/mock-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, amount, paymentMethod })
      });
      const data = await res.json();
      if (data.success) {
        await loadLeads();
        await loadProjects();
        await loadAdminConfig();
        // Transition to Customer Tracker to show the updated project progress!
        setCurrentRole('tracker');
      }
    } catch (err) {
      console.error('Error processing mock payment:', err);
    }
  };

  // Admin Pricing Update
  const handleUpdatePricing = async (updatedConfig) => {
    const res = await fetch('/api/admin/pricing', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedConfig)
    });
    const data = await res.json();
    if (data.success) {
      setPricingConfig(data.pricing);
    }
  };

  // Admin Subsidy Rule Add
  const handleAddSubsidyRule = async (ruleData) => {
    const res = await fetch('/api/admin/subsidy-rules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ruleData)
    });
    const data = await res.json();
    if (data.success) {
      await loadAdminConfig();
    }
  };

  const currentViewLead = selectedLead || leads[0];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Top Navigation */}
      <Navbar
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        currentLang={currentLang}
        setCurrentLang={setCurrentLang}
        t={t}
        notifCount={notifications.length}
        onOpenWhatsApp={() => setIsWhatsAppOpen(true)}
      />

      {/* Main Role Content Views with comfortable spacing */}
      <main className="flex-1 pb-20 pt-4 sm:pt-6">
        {/* Duplicate lead welcome-back banner */}
        {duplicateBanner && (
          <div className="max-w-4xl mx-auto mt-4 px-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-sm">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-emerald-900">
                  Welcome back! We found your existing enquiry ({duplicateBanner.id} – {duplicateBanner.name}).
                </span>
              </div>
              <button onClick={() => setDuplicateBanner(null)} className="text-emerald-600 hover:text-emerald-800 text-xs font-bold">Dismiss</button>
            </div>
          </div>
        )}

        {currentRole === 'homeowner' && (
          <HomeownerForm
            t={t}
            onSubmitLead={handleSubmitLead}
            isAnalyzing={isAnalyzing}
          />
        )}

        {currentRole === 'quote' && (
          <QuoteStoryView
            lead={currentViewLead}
            quote={activeQuote}
            t={t}
            onOpenPayment={(amt) => {
              setPaymentLead(currentViewLead);
              setPaymentAmount(amt);
            }}
          />
        )}

        {currentRole === 'sales' && (
          <SalesDesk
            leads={leads}
            metrics={metrics}
            t={t}
            onInspectBill={(lead) => setInspectingLead(lead)}
            onViewQuote={async (lead) => {
              setSelectedLead(lead);
              await fetchAndSetQuote(lead);
              setCurrentRole('quote');
            }}
            onAdvanceStage={handleAdvanceStage}
          />
        )}

        {currentRole === 'pipeline' && (
          <ProjectTracker
            projects={projectsList}
            stuckProjects={stuckProjects}
            onAdvanceStage={handleAdvanceStage}
            onEscalate={handleEscalate}
            onSelectLeadForPublicTracker={(lead) => {
              setSelectedLead(lead);
              setCurrentRole('tracker');
            }}
          />
        )}

        {currentRole === 'tracker' && (
          <PublicCustomerTracker
            trackingToken={currentViewLead?.trackingToken}
            leadData={currentViewLead}
            t={t}
            onOpenPayment={(amt) => {
              setPaymentLead(currentViewLead);
              setPaymentAmount(amt);
            }}
          />
        )}

        {currentRole === 'admin' && (
          <AdminRulesView
            subsidyRules={subsidyRules}
            pricingConfig={pricingConfig}
            t={t}
            onUpdatePricing={handleUpdatePricing}
            onAddSubsidyRule={handleAddSubsidyRule}
          />
        )}

        {currentRole === 'analytics' && (
          <AnalyticsDashboard t={t} />
        )}
      </main>

      {/* Side-by-Side OCR Verification Modal */}
      {inspectingLead && (
        <BillInspectorModal
          lead={inspectingLead}
          isOpen={!!inspectingLead}
          onClose={() => setInspectingLead(null)}
          onConfirmUpdates={handleConfirmOCR}
        />
      )}

      {/* Mock Payment Gateway Modal */}
      {paymentLead && (
        <MockPaymentModal
          lead={paymentLead}
          amount={paymentAmount}
          isOpen={!!paymentLead}
          onClose={() => setPaymentLead(null)}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* WhatsApp & SMS Communication Simulator */}
      <WhatsAppSimulatorModal
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        notifications={notifications}
        onSendCustomMessage={(leadId, text) => {
          const newNotif = {
            id: 'NOTIF-' + Date.now(),
            leadId,
            recipientName: currentViewLead?.name || 'Customer',
            recipientPhone: currentViewLead?.phone || '+91 98230 XXXXX',
            channel: 'WhatsApp',
            stage: 'CUSTOM_ADVICE',
            language: currentLang,
            messageText: text,
            timestamp: new Date().toISOString(),
            status: 'DELIVERED'
          };
          setNotifications(prev => [newNotif, ...prev]);
        }}
      />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/track/:token" element={<StandaloneTracker />} />
      <Route path="/*" element={<MainShell />} />
    </Routes>
  );
}
