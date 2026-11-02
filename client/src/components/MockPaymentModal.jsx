import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, Zap, Lock, CreditCard, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function MockPaymentModal({ isOpen, onClose, lead, amount = 10200, onPaymentSuccess }) {
  if (!isOpen) return null;

  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiId, setUpiId] = useState('prashant@okhdfcbank');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentDone(true);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
      setTimeout(() => {
        onPaymentSuccess(lead.id, amount, paymentMethod);
        onClose();
      }, 1800);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-white">Company A Secure Gateway</h3>
              <p className="text-[10px] text-slate-400">256-Bit Encrypted • Mock Payment Simulator</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {paymentDone ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-extrabold text-slate-900">
              Advance Payment Confirmed!
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ₹{Number(amount).toLocaleString('en-IN')} received for Lead {lead?.id || 'LD-30881'}. MSEDCL Net Metering application sequence initiated. WhatsApp acknowledgment dispatched.
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Amount Summary */}
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  10% Booking Advance
                </span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  ₹{Number(amount).toLocaleString('en-IN')}
                </span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white text-emerald-800 border border-emerald-200 shadow-2xs">
                Milestone 1 / 4
              </span>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-2">
                Choose Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['UPI', 'NetBanking', 'Card'].map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPaymentMethod(method)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      paymentMethod === method
                        ? 'border-emerald-600 bg-emerald-50/50 text-emerald-900 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* UPI ID input */}
            {paymentMethod === 'UPI' && (
              <div className="space-y-1 text-xs">
                <label className="font-semibold text-slate-600">Enter UPI ID</label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@okhdfcbank"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                />
                <span className="text-[10px] text-slate-400">Supports Google Pay, PhonePe, Paytm, BHIM UPI</span>
              </div>
            )}

            {/* Simulated Action */}
            <button
              type="button"
              onClick={handlePay}
              disabled={isProcessing}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition-all"
            >
              {isProcessing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Processing Mock UPI Payment...</span>
                </>
              ) : (
                <>
                  <span>Confirm & Authorize ₹{Number(amount).toLocaleString('en-IN')}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center space-x-1.5 text-[10px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulated Payment Gateway for Evaluation & Demo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

