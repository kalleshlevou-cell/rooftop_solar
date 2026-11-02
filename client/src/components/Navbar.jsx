import React from 'react';
import { Sun, Shield, LayoutDashboard, FileText, Activity, MessageSquare, Globe, Sparkles } from 'lucide-react';

export default function Navbar({ currentRole, setCurrentRole, currentLang, setCurrentLang, t, notifCount = 0, onOpenWhatsApp }) {
  const roles = [
    { id: 'homeowner', label: t.navHomeowner, icon: Sun },
    { id: 'sales', label: t.navSales, icon: LayoutDashboard },
    { id: 'pipeline', label: t.navPipeline, icon: Activity },
    { id: 'admin', label: t.navAdmin, icon: Shield },
    { id: 'tracker', label: t.navCustomerStatus, icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Company Identity */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentRole('homeowner')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20">
              <Sun className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-900 tracking-tight text-lg">Company A</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium border border-emerald-200">
                  Nagpur & Vidarbha
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">120+ Monthly Installations • PM Surya Ghar Approved</p>
            </div>
          </div>

          {/* Role Navigation Switcher */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-xl border border-slate-200/80">
            {roles.map((role) => {
              const Icon = role.icon;
              const isActive = currentRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setCurrentRole(role.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-slate-500'}`} />
                  <span>{role.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language & WhatsApp Feed */}
          <div className="flex items-center space-x-2">
            {/* WhatsApp Feed Trigger */}
            <button
              onClick={onOpenWhatsApp}
              className="relative p-2 rounded-lg text-slate-600 hover:text-emerald-600 hover:bg-slate-100 transition-colors border border-slate-200 flex items-center space-x-1 text-xs"
              title="Open WhatsApp & SMS Notification Feed"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline font-medium text-slate-700">{t.navWhatsAppLog}</span>
              {notifCount > 0 && (
                <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-emerald-600 rounded-full">
                  {notifCount}
                </span>
              )}
            </button>

            {/* Language Switcher */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-medium">
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-2 py-1 rounded-md transition-all ${currentLang === 'en' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                EN
              </button>
              <button
                onClick={() => setCurrentLang('mr')}
                className={`px-2 py-1 rounded-md transition-all ${currentLang === 'mr' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                मराठी
              </button>
              <button
                onClick={() => setCurrentLang('hi')}
                className={`px-2 py-1 rounded-md transition-all ${currentLang === 'hi' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'}`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-1 border-t border-slate-100 no-scrollbar">
          {roles.map((role) => {
            const Icon = role.icon;
            const isActive = currentRole === role.id;
            return (
              <button
                key={role.id}
                onClick={() => setCurrentRole(role.id)}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs whitespace-nowrap ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{role.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
}
