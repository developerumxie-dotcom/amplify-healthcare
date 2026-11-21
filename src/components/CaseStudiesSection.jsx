import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Quote,
  ArrowRight,
  FileCheck2,
  Building2,
  Clock
} from 'lucide-react';
import { caseStudiesData } from '../data/healthcareData';

export default function CaseStudiesSection({ onOpenAuditModal }) {
  return (
    <section id="case-studies" className="relative py-24 bg-transparent overflow-hidden">

      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-[#0EA5E9]/12 via-[#00E5FF]/5 to-transparent blur-[150px] pointer-events-none" />

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
            Real outcomes from accredited medical centers. Every metric is audited against hospital admission registers, HMIS databases, and OPD management logs.
          </p>
        </div>

        {/* 3 Balanced, Understandable Case Study Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 lg:gap-8">
          {caseStudiesData.map((cs) => (
            <div
              key={cs.id}
              className="group relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-gradient-to-b from-[#03152B]/85 via-[#020F20]/95 to-[#010A16]/98 border border-[#38BDF8]/20 hover:border-[#00E5FF]/50 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.30),0_12px_32px_rgba(2,8,19,0.7)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.50),0_18px_45px_rgba(0,229,255,0.22)] transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Top Specular Edge Line */}
              <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

              {/* Ambient Hover Glow */}
              <div className="absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br from-[#00E5FF]/15 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative z-10 space-y-5">

                {/* Header: Verified Audit Badge + Time Window */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/35 text-[#00E5FF] text-[11px] font-bold font-outfit">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Audited Outcome</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[11px] font-sans text-slate-400">
                    <Clock className="w-3 h-3 text-slate-400" />
                    {cs.period}
                  </span>
                </div>

                {/* Hospital Name & Department */}
                <div>
                  <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-cyan-200 transition-colors">
                    {cs.client}
                  </h3>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-sans">
                    <span className="text-cyan-300 font-medium">{cs.category}</span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1 text-slate-300">
                      <MapPin className="w-3 h-3 text-[#38BDF8]" />
                      {cs.location}
                    </span>
                  </div>
                </div>

                {/* Primary Outcome Highlight Banner */}
                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#062444]/80 to-[#03152B]/90 border border-[#38BDF8]/30 flex items-center justify-between shadow-[0_0_15px_rgba(14,165,233,0.15)]">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400 font-sans tracking-wider">
                      Primary Audited Result
                    </div>
                    <div className="font-outfit text-xl sm:text-2xl font-black text-[#00E5FF] tracking-tight mt-0.5">
                      {cs.highlight}
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
                  </div>
                </div>

                {/* The Challenge & Solution - Structured & Understandable */}
                <div className="space-y-2.5">
                  {/* Challenge Box */}
                  <div className="p-3 rounded-xl bg-[#0B1524]/80 border border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1 font-outfit">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      The Clinical Challenge
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {cs.challenge}
                    </p>
                  </div>

                  {/* Solution Box */}
                  <div className="p-3 rounded-xl bg-[#032038]/60 border border-[#38BDF8]/25">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#00E5FF] mb-1 font-outfit">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00E5FF]" />
                      Amplify Growth Solution
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {cs.solution}
                    </p>
                  </div>
                </div>

                {/* 3 Audited Performance Metrics */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white/[0.02] border border-slate-800/80 text-center">
                  {cs.stats.map((st, sIdx) => (
                    <div key={sIdx} className="p-2 rounded-xl bg-[#031427]/60 border border-[#38BDF8]/15 flex flex-col justify-center">
                      <div className="font-outfit text-base sm:text-lg font-black text-white">
                        {st.value}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-[#38BDF8] tracking-wider leading-tight mt-0.5">
                        {st.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                        {st.change}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Verified Physician Testimonial */}
                <div className="p-3.5 rounded-xl bg-gradient-to-br from-white/[0.04] to-transparent border border-slate-800">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-[#00E5FF] shrink-0 mt-0.5 opacity-80" />
                    <div>
                      <p className="text-xs italic text-slate-200 leading-relaxed font-sans mb-2.5">
                        {cs.quote}
                      </p>
                      <div className="font-outfit text-xs font-bold text-white">
                        {cs.doctorName}
                      </div>
                      <div className="text-[10px] text-cyan-300/80 font-sans">
                        {cs.doctorTitle}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Action Button */}
              <div className="pt-5 mt-2 relative z-10">
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#0EA5E9]/15 to-[#00E5FF]/15 hover:from-[#0EA5E9]/30 hover:to-[#00E5FF]/30 border border-[#38BDF8]/35 hover:border-[#00E5FF] text-white font-outfit text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 group/btn shadow-[0_0_12px_rgba(14,165,233,0.12)] hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] cursor-pointer"
                >
                  <span>Request Full Case Analysis</span>
                  <ArrowRight className="w-4 h-4 text-cyan-300 group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Integrated Audit Guarantee Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#03152B]/90 via-[#020F20]/95 to-[#03152B]/90 border border-[#38BDF8]/25 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)]">
          <div className="flex items-start sm:items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center shrink-0">
              <FileCheck2 className="w-6 h-6 text-[#00E5FF]" />
            </div>
            <div>
              <h4 className="font-outfit text-base font-bold text-white mb-1">
                100% Audited Against Real Hospital Admission Logs
              </h4>
              <p className="font-sans text-xs sm:text-sm text-slate-300 max-w-2xl">
                Every case study metric reflects verified patient footfall, Google search analytics, and hospital HMIS registration records. We never publish unverified vanity figures.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenAuditModal}
            className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#0EA5E9] to-[#00E5FF] text-[#01040A] font-outfit text-xs sm:text-sm font-bold uppercase tracking-wider hover:opacity-95 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] transition-all cursor-pointer"
          >
            Audit Your Hospital Growth
          </button>
        </div>

      </div>
    </section>
  );
}
