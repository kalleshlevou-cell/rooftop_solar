import React from 'react';
import { Sun, Shield, LayoutDashboard, FileText, Activity, MessageSquare, Globe, Sparkles, BarChart3 } from 'lucide-react';

export default function Navbar({ currentRole, setCurrentRole, currentLang, setCurrentLang, t, notifCount = 0, onOpenWhatsApp }) {
  const roles = [
    { 
      id: 'homeowner', 
      label: t.navHomeowner, 
      shortLabel: currentLang === 'mr' ? 'सोलर कॅल्क्युलेटर' : currentLang === 'hi' ? 'सोलर कैलकुलेटर' : 'Solar Estimator',
      icon: Sun 
    },
    { 
      id: 'sales', 
      label: t.navSales, 
      shortLabel: currentLang === 'mr' ? 'विक्री डेस्क' : currentLang === 'hi' ? 'सेल्स डेस्क' : 'Sales Desk',
      icon: LayoutDashboard 
    },
    { 
      id: 'pipeline', 
      label: t.navPipeline, 
      shortLabel: currentLang === 'mr' ? 'प्रकल्प ट्रॅकर' : currentLang === 'hi' ? 'प्रोजेक्ट ट्रॅकर' : 'Pipeline & SLA',
      icon: Activity 
    },
    { 
      id: 'admin', 
      label: t.navAdmin, 
      shortLabel: currentLang === 'mr' ? 'नियम व दर' : currentLang === 'hi' ? 'नियम व दर' : 'Subsidy Rules',
      icon: Shield 
    },
    { 
      id: 'tracker', 
      label: t.navCustomerStatus, 
      shortLabel: currentLang === 'mr' ? 'माझी स्थिती' : currentLang === 'hi' ? 'मेरा स्टेटस' : 'Customer Status',
      icon: FileText 
    },
    {
      id: 'analytics',
      label: 'Analytics Dashboard',
      shortLabel: currentLang === 'mr' ? 'विश्लेषण' : currentLang === 'hi' ? 'विश्लेषण' : 'Analytics',
      icon: BarChart3
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Bar with generous padding and gap */}
        <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
          
          {/* Left: Brand Identity & City Badge */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer shrink-0 select-none group" 
            onClick={() => setCurrentRole('homeowner')}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-600 to-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/25 group-hover:scale-105 transition-transform">
              <Sun className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 tracking-tight text-lg sm:text-xl">
                  Company A
                </span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold border border-emerald-200/80 shadow-2xs">
                  Nagpur & Vidarbha
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block mt-0.5">
                Rooftop Solar EPC • PM Surya Ghar Authorized
              </p>
            </div>
          </div>

          {/* Center: Desktop Navigation Bar with pill container and comfortable spacing */}
          <nav className="hidden xl:flex items-center gap-1.5 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 shadow-2xs">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setCurrentRole(role.id)}
                  className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-900/5 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap">{role.shortLabel}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Actions, WhatsApp Simulator & Language Selector */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* WhatsApp Trigger Button */}
            <button
              onClick={onOpenWhatsApp}
              className="relative px-3 py-2 rounded-xl text-slate-700 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200/90 hover:border-emerald-300 transition-all flex items-center space-x-2 text-xs font-bold shadow-2xs cursor-pointer"
              title="Open WhatsApp & SMS Notification Feed"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="hidden sm:inline">{t.navWhatsAppLog}</span>
              {notifCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-black leading-none text-white bg-emerald-600 rounded-full animate-bounce">
                  {notifCount}
                </span>
              )}
            </button>

            {/* Language Switcher Pill */}
            <div className="flex items-center bg-slate-100/90 p-1 rounded-xl border border-slate-200 text-xs font-semibold shadow-2xs">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentLang === 'en' 
                    ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('mr')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentLang === 'mr' 
                    ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="मराठीमध्ये बदला"
              >
                मराठी
              </button>
              <button
                onClick={() => setCurrentLang('hi')}
                className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                  currentLang === 'hi' 
                    ? 'bg-white text-slate-900 shadow-2xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="हिंदी में बदलें"
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Sub-Header Mobile / Tablet Navigation with proper spacing & smooth scrolling */}
        <div className="xl:hidden py-2.5 border-t border-slate-100 flex items-center overflow-x-auto gap-2 no-scrollbar">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setCurrentRole(role.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                <span>{role.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
