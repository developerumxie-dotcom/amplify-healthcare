import React from 'react';
import { Building2, Baby, Sparkles, Activity, Award, ChevronRight, CheckCircle2 } from 'lucide-react';
import { specializationsData } from '../data/healthcareData';

const iconMap = {
  Building2,
  Baby,
  Sparkles,
  Activity,
  Award
};

export default function SpecializationsBento({ onOpenAuditModal }) {
  return (
    <section id="specializations" className="relative py-24 bg-[#020813] overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-[#0EA5E9]/15 via-[#00E5FF]/5 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031427]/80 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Clinical Specializations
            </span>
          </div>
          
          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Tailored Patient Growth For <br />
            <span className="text-gradient-cyan">Every Medical Discipline</span>
          </h2>
          
          <p className="font-sans text-slate-300 text-base sm:text-lg">
            We don't use generic e-commerce templates. Each specialty has unique medical ethics, patient decision psychology, and clinical conversion pathways.
          </p>
        </div>

        {/* Bento Grid: 5 Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specializationsData.map((item, idx) => {
            const Icon = iconMap[item.iconName] || Activity;
            const isLarge = idx === 0 || idx === 3;

            return (
              <div
                key={item.id}
                className={`group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 ${
                  isLarge ? 'lg:col-span-2 bg-gradient-to-br from-[#04162B]/85 to-[#020D1B]/95' : 'bg-gradient-to-br from-[#031224]/85 to-[#020A16]/95'
                } border border-[#38BDF8]/20 hover:border-[#38BDF8]/50 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.35),0_12px_36px_-6px_rgba(14,165,233,0.22)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.6),0_18px_48px_-4px_rgba(0,229,255,0.35)] hover:-translate-y-1`}
              >
                {/* Top Specular Line */}
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                {/* Subtle Ambient Hover Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00E5FF]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Card Top: Icon, Tag & Metric Pill */}
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/30 to-[#00E5FF]/10 border border-[#38BDF8]/40 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.25)] group-hover:border-[#00E5FF]/70 transition-colors">
                        <Icon className="w-6 h-6 text-[#38BDF8] group-hover:text-white transition-colors" />
                      </div>
                      <span className="text-xs uppercase tracking-wider font-semibold text-cyan-300 font-outfit px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#38BDF8]/20">
                        {item.tag}
                      </span>
                    </div>

                    <div className="px-3.5 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] font-outfit text-xs font-bold shadow-[0_0_10px_rgba(0,229,255,0.2)]">
                      {item.metric}
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-100 transition-colors">
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#38BDF8] font-sans mb-3">
                    {item.subtitle}
                  </div>

                  <p className="font-sans text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Card Bottom: Features & Action Pill */}
                <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {item.features.map((feat, fIdx) => (
                      <span
                        key={fIdx}
                        className="inline-flex items-center gap-1.5 text-xs text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-slate-700/60"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8]" />
                        <span>{feat}</span>
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={onOpenAuditModal}
                    className="self-end sm:self-center shrink-0 w-9 h-9 rounded-full bg-[#0EA5E9]/20 hover:bg-[#00E5FF]/30 border border-[#38BDF8]/40 hover:border-[#00E5FF] flex items-center justify-center transition-all duration-200 group/btn"
                    aria-label={`Inquire about ${item.title}`}
                  >
                    <ChevronRight className="w-4 h-4 text-cyan-200 group-hover/btn:text-white group-hover/btn:translate-x-0.5 transition-all" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
