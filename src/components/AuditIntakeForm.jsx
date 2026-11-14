import React, { useState } from 'react';
import { Shield, Send, CheckCircle2, Phone, User, Building, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AuditIntakeForm() {
  const [practiceType, setPracticeType] = useState('hospital');
  const [monthlyTarget, setMonthlyTarget] = useState('50-100');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    hospitalName: '',
    isWhatsApp: true
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00E5FF', '#38BDF8', '#0EA5E9', '#FFFFFF']
        });
      } catch (err) {
        // Fallback gracefully
      }
    }, 600);
  };

  return (
    <section id="audit-form" className="relative py-24 bg-[#020A17] overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-tr from-[#0EA5E9]/15 via-[#00E5FF]/8 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031427]/80 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Confidential Medical Assessment
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Schedule Your Confidential <br />
            <span className="text-gradient-cyan">Hospital Marketing Audit</span>
          </h2>

          <p className="font-sans text-slate-300 text-sm sm:text-base">
            Receive a thorough 24-point audit of your hospital's local Google presence, competitor surgical keywords, and OPD intake leakages. 100% confidential.
          </p>
        </div>

        {/* Main Glass Form Card */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#041933]/90 to-[#020F20]/95 border border-[#38BDF8]/30 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.40),0_20px_60px_rgba(2,8,19,0.9)] overflow-hidden">
          
          {/* Top Specular Line */}
          <div className="absolute inset-x-10 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />

          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fadeIn">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-[#0EA5E9]/30 to-[#00E5FF]/20 border border-[#00E5FF]/60 flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.4)]">
                <CheckCircle2 className="w-10 h-10 text-[#00E5FF]" />
              </div>

              <div className="space-y-2">
                <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white">
                  Audit Request Received
                </h3>
                <p className="font-sans text-slate-300 text-sm max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Our healthcare growth strategist will review <span className="text-white font-semibold">{formData.hospitalName || 'your practice'}</span> and contact you within 24 hours.
                </p>
              </div>

              <div className="p-4 max-w-sm mx-auto rounded-xl bg-[#031122] border border-[#38BDF8]/20 text-xs text-slate-300 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4 text-[#00E5FF]" />
                <span>NDA & Medical Confidentiality Protected</span>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-cyan-300 underline underline-offset-4 hover:text-white"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* 1. Practice Type Selection */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-extrabold text-cyan-200 font-outfit">
                  1. Select Medical Practice Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'hospital', label: 'Multispecialty Hospital', desc: '50+ Beds & Tertiary Care' },
                    { id: 'clinic', label: 'Super-Specialty Clinic', desc: 'IVF, Dental, Ortho, Eye' },
                    { id: 'doctor', label: 'Individual Doctor', desc: 'Surgeon Personal Brand' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPracticeType(item.id)}
                      className={`p-4 rounded-2xl text-left border transition-all ${
                        practiceType === item.id
                          ? 'bg-[#0A2E55] border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.3)] text-white'
                          : 'bg-[#031326]/70 border-slate-700/60 text-slate-300 hover:bg-[#061D38]'
                      }`}
                    >
                      <div className="font-outfit text-sm font-bold text-white mb-0.5">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {item.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Monthly Target Consultations */}
              <div className="space-y-3">
                <label className="block text-xs uppercase tracking-wider font-extrabold text-cyan-200 font-outfit">
                  2. Targeted Monthly New Consultations Growth
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: '20-50', label: '+20 - 50 Patients/Mo' },
                    { id: '50-100', label: '+50 - 100 Patients/Mo' },
                    { id: '100+', label: '+100+ High-Ticket IPD' },
                  ].map((target) => (
                    <button
                      key={target.id}
                      type="button"
                      onClick={() => setMonthlyTarget(target.id)}
                      className={`py-3 px-2 sm:px-4 rounded-xl text-center text-xs font-bold font-outfit border transition-all ${
                        monthlyTarget === target.id
                          ? 'bg-[#0284C7] border-white/50 text-white shadow-[0_0_12px_rgba(14,165,233,0.5)]'
                          : 'bg-[#031326]/60 border-slate-700 text-slate-300 hover:bg-[#061D38]'
                      }`}
                    >
                      {target.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3. Contact & Hospital Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Doctor / Administrator Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] focus:outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Hospital / Clinic Brand Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Heart Institute"
                      value={formData.hospitalName}
                      onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] focus:outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Phone / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] focus:outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Hospital City / Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mumbai / Raipur / Delhi"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#031326] border border-slate-700 focus:border-[#00E5FF] focus:outline-none text-white text-sm placeholder:text-slate-500"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Toggle */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="whatsapp-toggle"
                  checked={formData.isWhatsApp}
                  onChange={(e) => setFormData({ ...formData, isWhatsApp: e.target.checked })}
                  className="w-4 h-4 rounded text-[#00E5FF] focus:ring-0 focus:outline-none cursor-pointer"
                />
                <label htmlFor="whatsapp-toggle" className="text-xs text-slate-300 cursor-pointer select-none">
                  Share confidential audit report & summary via WhatsApp
                </label>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full relative group overflow-hidden py-4 rounded-2xl font-outfit text-base font-bold text-white bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#00E5FF] border border-white/40 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.7),0_10px_32px_rgba(14,165,233,0.5)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.9),0_14px_42px_rgba(0,229,255,0.75)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {/* Specular Cut Line */}
                <span className="absolute inset-x-6 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                
                <span className="relative z-10 flex items-center gap-2">
                  {submitting ? 'Analyzing Practice Data...' : 'Request Confidential Hospital Audit'}
                  <Send className="w-4 h-4 ml-1" />
                </span>
              </button>

              <div className="text-center text-[11px] text-slate-400 font-sans">
                🔒 Under strict medical NDA. Your patient numbers and practice revenue are never disclosed.
              </div>

            </form>
          )}

        </div>

      </div>
    </section>
  );
}
