import React from 'react';
import { ShieldCheck, Scale, FileCheck, Award, Lock } from 'lucide-react';
import { trustBadgesData } from '../data/healthcareData';

const iconMap = {
  ShieldCheck,
  Scale,
  FileCheck,
  Award
};

export default function TrustBadgesSection() {
  return (
    <section className="relative py-20 bg-[#01040A] overflow-hidden">
      
      {/* Background Subtle Gradient Line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#38BDF8]/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031427]/80 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <Lock className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Zero-Compromise Ethics
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Built On Strict Medical Ethics & <br />
            <span className="text-gradient-cyan">Patient Confidentiality</span>
          </h2>

          <p className="font-sans text-slate-300 text-sm sm:text-base">
            Healthcare marketing carries human responsibility. We protect patient dignity, doctor reputational integrity, and regulatory compliance at every turn.
          </p>
        </div>

        {/* 4 Frosted Trust Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustBadgesData.map((badge) => {
            const Icon = iconMap[badge.iconName] || ShieldCheck;

            return (
              <div
                key={badge.id}
                className="relative rounded-2xl p-6 bg-gradient-to-b from-[#03152B]/80 to-[#020E1C]/90 border border-[#38BDF8]/20 hover:border-[#38BDF8]/50 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.30),0_10px_30px_rgba(2,8,19,0.7)] transition-all duration-300 hover:-translate-y-1 group"
              >
                {/* Top Specular Line */}
                <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#0EA5E9]/25 to-[#00E5FF]/10 border border-[#38BDF8]/30 flex items-center justify-center shadow-[0_0_15px_rgba(14,165,233,0.2)] group-hover:border-[#00E5FF]/60 transition-colors">
                    <Icon className="w-5 h-5 text-[#38BDF8] group-hover:text-white transition-colors" />
                  </div>

                  <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#00E5FF] px-2.5 py-0.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                    {badge.badge}
                  </span>
                </div>

                <h3 className="font-outfit text-base font-bold text-white mb-2 group-hover:text-cyan-200 transition-colors">
                  {badge.title}
                </h3>

                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
