import React from 'react';
import {
  Building2,
  Baby,
  Sparkles,
  Activity,
  Award,
  Stethoscope,
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  FileCheck2
} from 'lucide-react';
import { specializationsData } from '../data/healthcareData';

const iconMap = {
  Building2,
  Baby,
  Sparkles,
  Activity,
  Award,
  Stethoscope
};

export default function SpecializationsBento({ onOpenAuditModal }) {
  return (
    <section id="specializations" className="relative py-24 bg-transparent overflow-hidden">

      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-[#0EA5E9]/12 via-[#00E5FF]/5 to-transparent blur-[150px] pointer-events-none" />

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
            Every clinical specialty requires distinct patient trust, ethical compliance, and doctor authority. We build tailored, compliance-backed acquisition pathways for each discipline.
          </p>
        </div>

        {/* Standard Balanced 6-Card Specialty Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {specializationsData.map((item) => {
            const Icon = iconMap[item.iconName] || Stethoscope;

            return (
              <div
                key={item.id}
                className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-[#03152B]/85 via-[#020F20]/95 to-[#010A16]/98 border border-[#38BDF8]/20 hover:border-[#00E5FF]/50 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.30),0_12px_32px_rgba(2,8,19,0.7)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.50),0_18px_45px_rgba(0,229,255,0.22)] transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* Top Specular Edge Line */}
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

                {/* Ambient Hover Glow */}
                <div className="absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br from-[#00E5FF]/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div className="relative z-10">
                  {/* Top Row: Glowing Icon + Discipline Tag */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0EA5E9]/25 to-[#00E5FF]/10 border border-[#38BDF8]/35 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.25)] group-hover:border-[#00E5FF]/70 transition-colors">
                      <Icon className="w-6 h-6 text-[#38BDF8] group-hover:text-white transition-colors" />
                    </div>

                    <span className="text-[11px] uppercase tracking-wider font-semibold text-cyan-300 font-outfit px-3 py-1 rounded-full bg-[#0EA5E9]/10 border border-[#38BDF8]/25">
                      {item.tag}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="font-outfit text-xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#38BDF8] font-sans mb-4">
                    {item.subtitle}
                  </p>

                  {/* Audited Metric Highlight Pill */}
                  <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/25 mb-4">
                    <span className="text-[11px] font-sans text-slate-300 font-medium">Audited Result</span>
                    <span className="font-outfit text-xs sm:text-sm font-extrabold text-[#00E5FF] tracking-wide flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-[#00E5FF]" />
                      {item.metric}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  {/* Feature Deliverables List */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-slate-800/80">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-outfit">
                      Clinical Protocols
                    </div>
                    {item.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#38BDF8] shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Standard CTA Button */}
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="relative z-10 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0EA5E9]/15 to-[#00E5FF]/15 hover:from-[#0EA5E9]/30 hover:to-[#00E5FF]/30 border border-[#38BDF8]/35 hover:border-[#00E5FF] text-white font-outfit text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 group/btn shadow-[0_0_12px_rgba(14,165,233,0.12)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer"
                >
                  <span>Request Specialty Strategy</span>
                  <ArrowRight className="w-4 h-4 text-cyan-300 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Integrated Trust Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#03152B]/90 via-[#020F20]/95 to-[#03152B]/90 border border-[#38BDF8]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <h4 className="font-outfit text-base font-bold text-white mb-1">
                Strict Medical Ethics & Regulatory Review Guarantee
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl">
                Every campaign, clinical video, and patient funnel is pre-reviewed for patient privacy, regulatory compliance, and physician reputation before going live.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAuditModal}
            className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#00E5FF] text-[#01040A] font-outfit text-xs sm:text-sm font-bold uppercase tracking-wider hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all cursor-pointer"
          >
            Schedule Clinical Strategy Call
          </button>
        </div>

      </div>
    </section>
  );
}
