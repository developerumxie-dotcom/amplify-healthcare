import React from 'react';
import { ShieldCheck, TrendingUp, MapPin, CheckCircle2, Quote, ArrowUpRight } from 'lucide-react';
import { caseStudiesData } from '../data/healthcareData';

export default function CaseStudiesSection({ onOpenAuditModal }) {
  return (
    <section id="case-studies" className="relative py-24 bg-[#01040A] overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#0EA5E9]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031427]/80 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <ShieldCheck className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Verified Medical Case Studies
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Documented Clinical Growth & <br />
            <span className="text-gradient-cyan">Measurable Patient Trust</span>
          </h2>

          <p className="font-sans text-slate-300 text-base sm:text-lg">
            Real outcomes from accredited medical centers. Every metric is audited against hospital admission registers and OPD management systems.
          </p>
        </div>

        {/* 3 Deep-Dive Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {caseStudiesData.map((cs) => (
            <div
              key={cs.id}
              className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#04162C]/90 to-[#020C1A]/95 border border-[#38BDF8]/25 hover:border-[#38BDF8]/60 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.35),0_14px_40px_-6px_rgba(14,165,233,0.25)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.6),0_20px_50px_-4px_rgba(0,229,255,0.4)] transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top Specular Line */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

              <div>
                {/* Header: Verified Pill + Highlight */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/35 text-[#00E5FF] text-[11px] font-bold font-outfit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Audit</span>
                  </span>

                  <span className="text-xs font-sans text-slate-400">
                    {cs.period}
                  </span>
                </div>

                {/* Hospital Name & Category */}
                <h3 className="font-outfit text-2xl font-extrabold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                  {cs.client}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-slate-400 font-sans mb-4">
                  <span>{cs.category}</span>
                  <span>•</span>
                  <span className="inline-flex items-center gap-1 text-slate-300">
                    <MapPin className="w-3 h-3 text-[#38BDF8]" />
                    {cs.location}
                  </span>
                </div>

                {/* Big Highlight Banner */}
                <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#062444]/80 to-[#03152B]/90 border border-[#38BDF8]/30 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 font-sans">Primary Outcome</div>
                    <div className="font-outfit text-xl sm:text-2xl font-black text-[#00E5FF] tracking-tight">
                      {cs.highlight}
                    </div>
                  </div>
                  <TrendingUp className="w-7 h-7 text-[#00E5FF]/80" />
                </div>

                {/* Summary */}
                <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  {cs.summary}
                </p>

                {/* Stats 3-Column Grid */}
                <div className="grid grid-cols-3 gap-2 py-4 border-y border-slate-800/80 mb-6 text-center">
                  {cs.stats.map((st, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="font-outfit text-lg sm:text-xl font-extrabold text-white">
                        {st.value}
                      </div>
                      <div className="text-[10px] uppercase font-semibold text-cyan-300 leading-tight">
                        {st.label}
                      </div>
                      <div className="text-[9px] text-slate-400">
                        {st.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quote Box */}
                <div className="relative p-3.5 rounded-xl bg-white/[0.03] border border-slate-800 mb-6">
                  <Quote className="w-4 h-4 text-[#38BDF8] mb-1 opacity-70" />
                  <p className="text-xs italic text-slate-200 leading-relaxed">
                    {cs.quote}
                  </p>
                  <div className="mt-2 text-[11px] font-bold text-white font-outfit">
                    {cs.doctorName}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {cs.doctorTitle}
                  </div>
                </div>
              </div>

              {/* Bottom Action Button */}
              <button
                type="button"
                onClick={onOpenAuditModal}
                className="w-full py-2.5 rounded-xl font-outfit text-xs font-bold text-cyan-200 hover:text-white bg-[#0EA5E9]/15 hover:bg-[#0EA5E9]/30 border border-[#38BDF8]/30 hover:border-[#00E5FF] flex items-center justify-center gap-2 transition-all"
              >
                <span>Read Full Clinical Case Report</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
