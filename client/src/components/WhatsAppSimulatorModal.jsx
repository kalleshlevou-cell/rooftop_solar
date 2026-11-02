import React, { useState } from 'react';
import { X, MessageSquare, CheckCheck, Clock, Send, Globe, Phone, ExternalLink } from 'lucide-react';

export default function WhatsAppSimulatorModal({ isOpen, onClose, notifications = [], onSendCustomMessage }) {
  if (!isOpen) return null;

  const [activeLang, setActiveLang] = useState('all'); // 'all' | 'mr' | 'hi' | 'en'
  const [testLeadId, setTestLeadId] = useState('LD-30881');
  const [customText, setCustomText] = useState('');

  const filtered = activeLang === 'all' 
    ? notifications 
    : notifications.filter(n => n.language === activeLang);

  const handleSend = (e) => {
    e.preventDefault();
    if (!customText) return;
    onSendCustomMessage(testLeadId, customText);
    setCustomText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col max-h-[88vh]">
        {/* WhatsApp Header */}
        <div className="bg-[#075e54] text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white shadow-xs">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Company A Solar • WhatsApp Dispatcher</h3>
              <p className="text-[11px] text-emerald-200">
                Official Mahavitaran & PM Surya Ghar Notification Gateway
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-600/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Language Filter Bar */}
        <div className="bg-[#128c7e] px-4 py-2 flex items-center justify-between text-xs text-white">
          <div className="flex items-center space-x-1">
            <Globe className="w-3.5 h-3.5 text-emerald-200" />
            <span className="font-semibold text-[11px]">Filter Language:</span>
          </div>

          <div className="flex gap-1">
            {['all', 'mr', 'hi', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => setActiveLang(lang)}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase transition-all ${
                  activeLang === lang
                    ? 'bg-white text-[#075e54] shadow-xs'
                    : 'text-emerald-100 hover:bg-emerald-600/40'
                }`}
              >
                {lang === 'all' ? 'All' : lang === 'mr' ? 'मराठी' : lang === 'hi' ? 'हिंदी' : 'English'}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Feed */}
        <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1 bg-[#efeae2]/10" style={{ backgroundImage: 'radial-gradient(#2d3748 1px, transparent 1px)', backgroundSize: '16px 16px' }}>
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              No notifications logged yet in this filter.
            </div>
          ) : (
            filtered.map((msg, i) => (
              <div key={i} className="flex flex-col space-y-1 max-w-[90%] sm:max-w-[80%] bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tl-xs ml-auto shadow-sm">
                <div className="flex items-center justify-between text-[10px] text-emerald-200 pb-1 border-b border-emerald-600/40">
                  <span className="font-semibold">{msg.recipientName} ({msg.recipientPhone})</span>
                  <span className="font-mono">{msg.stage || 'STAGE_UPDATE'}</span>
                </div>

                <p className="text-xs text-white leading-relaxed pt-1">
                  {msg.messageText}
                </p>

                <div className="flex items-center justify-end space-x-1.5 text-[10px] text-emerald-300 pt-1">
                  <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Interactive Send Simulator */}
        <form onSubmit={handleSend} className="p-3 bg-slate-800 border-t border-slate-700 flex items-center space-x-2">
          <input
            type="text"
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            placeholder="Simulate custom WhatsApp notice to customer (e.g. MSEDCL inspection tomorrow)..."
            className="flex-1 px-3 py-2 bg-slate-700 text-white rounded-xl text-xs placeholder:text-slate-400 border border-slate-600 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center space-x-1 shadow-xs"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </form>
      </div>
    </div>
  );
}
