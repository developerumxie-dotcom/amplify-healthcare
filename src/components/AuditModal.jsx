import React, { useState, useEffect } from 'react';
import { X, Shield, Send, CheckCircle2, Phone, User, Building, MapPin, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuditModal({ isOpen, onClose }) {
  const [practiceType, setPracticeType] = useState('hospital');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    hospitalName: '',
    notes: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#00E5FF', '#38BDF8', '#0EA5E9', '#FFFFFF']
        });
      } catch (err) {}
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop Scrim */}
      <div 
        className="fixed inset-0 bg-[#01060E]/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#041933] to-[#020F20] border border-[#38BDF8]/40 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.40),0_25px_60px_rgba(2,8,19,0.95)] z-10 overflow-hidden my-auto animate-fadeIn">
        
        {/* Top Specular Line */}
        <div className="absolute inset-x-8 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-[#0EA5E9]/30 to-[#00E5FF]/20 border border-[#00E5FF]/60 flex items-center justify-center shadow-[0_0_25px_rgba(0,229,255,0.4)]">
              <CheckCircle2 className="w-8 h-8 text-[#00E5FF]" />
            </div>

            <div className="space-y-1">
              <h3 className="font-outfit text-2xl font-extrabold text-white">
                Audit Consultation Scheduled
              </h3>
              <p className="font-sans text-slate-300 text-xs sm:text-sm max-w-sm mx-auto">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our healthcare strategist will prepare your hospital's keyword analysis and connect shortly.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full font-outfit text-xs font-bold text-white bg-gradient-to-r from-[#0284C7] to-[#00E5FF] shadow-[0_4px_16px_rgba(14,165,233,0.4)]"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-[#0EA5E9]/20 border border-[#38BDF8]/40 flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#00E5FF]" />
              </div>
              <span className="font-outfit text-xs font-bold text-cyan-300 uppercase tracking-wider">
                Confidential Hospital Audit
              </span>
            </div>

            <h3 className="font-outfit text-xl sm:text-2xl font-extrabold text-white mb-2">
              Schedule Your Patient Growth Strategy
            </h3>
            <p className="font-sans text-xs text-slate-300 mb-6">
              Review current OPD leakages, high-intent local search rankings, and patient conversion opportunities.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Practice Type */}
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'hospital', label: 'Hospital' },
                  { id: 'clinic', label: 'Clinic' },
                  { id: 'doctor', label: 'Doctor' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPracticeType(item.id)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold font-outfit border transition-all ${
                      practiceType === item.id
                        ? 'bg-[#0A2E55] border-[#00E5FF] text-white shadow-[0_0_10px_rgba(0,229,255,0.3)]'
                        : 'bg-[#031326] border-slate-700 text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Doctor Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Doctor / Administrator Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Dr. Name or Admin"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] text-white text-xs"
                  />
                </div>
              </div>

              {/* Hospital Name */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-300">
                  Hospital / Clinic Name *
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Medical Center Name"
                    value={formData.hospitalName}
                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] text-white text-xs"
                  />
                </div>
              </div>

              {/* Phone & City */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] text-white text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-300">
                    City / State *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raipur"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] text-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-2 relative group overflow-hidden py-3 rounded-xl font-outfit text-sm font-bold text-white bg-gradient-to-r from-[#0284C7] to-[#00E5FF] border border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7),0_8px_24px_rgba(14,165,233,0.5)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  {submitting ? 'Submitting...' : 'Confirm Audit Request'}
                  <Send className="w-3.5 h-3.5" />
                </span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 pt-1">
                <Shield className="w-3 h-3 text-[#00E5FF]" />
                <span>Confidential Medical NDA Protected</span>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
}
