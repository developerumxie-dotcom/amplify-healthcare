import React, { useState } from 'react';
import { Search, Video, MessageSquare, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import { patientEngineSteps } from '../data/healthcareData';

const iconMap = {
  Search,
  Video,
  MessageSquare,
  Star
};

export default function PatientAcquisitionEngine({ onOpenAuditModal }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="patient-funnel" className="relative py-24 bg-[#01040A] overflow-hidden">
      
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-gradient-to-l from-[#0EA5E9]/15 to-transparent blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[450px] bg-gradient-to-r from-[#00E5FF]/10 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031427]/80 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-cyan-200">
              The 4-Stage Patient Engine
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            How We Convert Searchers <br />
            Into <span className="text-gradient-cyan">Booked Consultations</span>
          </h2>

          <p className="font-sans text-slate-300 text-base sm:text-lg">
            A frictionless, patient-first acquisition flywheel designed for high medical trust, zero missed inquiries, and maximum OPD turnouts.
          </p>
        </div>

        {/* Step Selector Tabs (Desktop & Mobile) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {patientEngineSteps.map((step, idx) => {
            const Icon = iconMap[step.iconName] || Search;
            const isActive = activeStep === idx;

            return (
              <button
                key={step.step}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`group relative text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border ${
                  isActive
                    ? 'bg-gradient-to-br from-[#062444] to-[#031427] border-[#00E5FF]/70 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.45),0_10px_28px_rgba(0,229,255,0.3)] -translate-y-1'
                    : 'bg-[#031020]/70 border-[#38BDF8]/15 hover:border-[#38BDF8]/40 hover:bg-[#04162C]/80'
                }`}
              >
                {/* Top Specular Line for Active */}
                {isActive && (
                  <div className="absolute inset-x-4 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                )}

                <div className="flex items-center justify-between mb-3">
                  <span className={`font-outfit text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                    isActive ? 'bg-[#00E5FF] text-[#020813]' : 'bg-white/10 text-slate-400'
                  }`}>
                    {step.step}
                  </span>
                  <Icon className={`w-5 h-5 transition-colors ${
                    isActive ? 'text-[#00E5FF]' : 'text-slate-400 group-hover:text-cyan-300'
                  }`} />
                </div>

                <div className="text-[11px] uppercase tracking-wider text-cyan-300/80 font-semibold mb-0.5">
                  {step.phase}
                </div>
                <div className={`font-outfit text-sm sm:text-base font-bold leading-tight ${
                  isActive ? 'text-white' : 'text-slate-300'
                }`}>
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Step Interactive Showcase Card */}
        {(() => {
          const current = patientEngineSteps[activeStep];
          const CurrentIcon = iconMap[current.iconName] || Search;

          return (
            <div className="relative rounded-3xl p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-[#041830]/90 to-[#020D1B]/95 border border-[#38BDF8]/35 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.40),0_20px_50px_rgba(2,8,19,0.9)] overflow-hidden">
              
              {/* Top Specular Line */}
              <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Deep Dive Content */}
                <div className="lg:col-span-7 space-y-6">
                  
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-outfit text-3xl sm:text-4xl font-extrabold text-white">
                      Stage {current.step}
                    </span>
                    <span className="px-3.5 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] text-xs font-bold font-outfit shadow-[0_0_12px_rgba(0,229,255,0.25)]">
                      {current.badge}
                    </span>
                  </div>

                  <h3 className="font-outfit text-2xl sm:text-3xl font-extrabold text-white">
                    {current.title}
                  </h3>

                  <p className="font-sans text-base sm:text-lg text-slate-300 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="space-y-3 pt-2">
                    {current.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#00E5FF] shrink-0 mt-0.5" />
                        <span className="font-sans text-sm sm:text-base text-slate-200">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={onOpenAuditModal}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-outfit text-sm font-bold text-white bg-gradient-to-r from-[#0284C7] to-[#00E5FF] shadow-[0_8px_24px_rgba(14,165,233,0.4)] hover:shadow-[0_12px_32px_rgba(0,229,255,0.6)] transition-all transform hover:-translate-y-0.5"
                    >
                      <span>Deploy Stage {current.step} For Your Hospital</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Right: Interactive Graphic Visual */}
                <div className="lg:col-span-5 relative">
                  <div className="relative rounded-2xl p-6 sm:p-8 bg-[#031122]/90 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_12px_36px_rgba(0,229,255,0.15)] flex flex-col items-center text-center">
                    
                    {/* Big Pulse Icon */}
                    <div className="relative w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#0EA5E9]/30 to-[#00E5FF]/20 border border-[#38BDF8]/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.35)]">
                      <CurrentIcon className="w-12 h-12 text-[#00E5FF]" />
                      <span className="absolute -top-2 -right-2 px-2.5 py-0.5 rounded-full bg-[#00E5FF] text-[#020813] font-outfit text-xs font-extrabold">
                        {current.step}
                      </span>
                    </div>

                    <div className="font-outfit text-2xl font-extrabold text-white mb-2">
                      {current.metric}
                    </div>

                    <p className="text-xs text-slate-400 font-sans max-w-xs mb-6">
                      Continuous real-time tracking through hospital EHR & WhatsApp CRM API hooks.
                    </p>

                    {/* Step Navigation Dots */}
                    <div className="flex items-center gap-2">
                      {patientEngineSteps.map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setActiveStep(i)}
                          className={`h-2 rounded-full transition-all duration-300 ${
                            activeStep === i ? 'w-8 bg-[#00E5FF]' : 'w-2 bg-slate-700 hover:bg-slate-500'
                          }`}
                          aria-label={`Jump to stage ${i + 1}`}
                        />
                      ))}
                    </div>

                  </div>
                </div>

              </div>

            </div>
          );
        })()}

      </div>
    </section>
  );
}
