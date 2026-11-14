import React, { useState } from 'react';
import { HelpCircle, HeartHandshake, Layers, Play, Clock, Sparkles } from 'lucide-react';
import { doctorVideoFormats } from '../data/healthcareData';

const iconMap = {
  HelpCircle,
  HeartHandshake,
  Layers
};

export default function DoctorVideoShowcase({ onOpenAuditModal }) {
  const [activeVideo, setActiveVideo] = useState(0);

  return (
    <section id="doctor-branding" className="relative py-24 bg-[#020A17] overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-gradient-to-l from-[#0EA5E9]/15 to-transparent blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#031427]/80 border border-[#38BDF8]/30 shadow-[inset_0_1px_1px_rgba(255,255,255,0.4)]">
            <Sparkles className="w-4 h-4 text-[#00E5FF]" />
            <span className="font-outfit text-xs font-semibold uppercase tracking-wider text-cyan-200">
              Doctor Video Authority
            </span>
          </div>

          <h2 className="font-outfit text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Cinematic Formats That Turn <br />
            <span className="text-gradient-cyan">Surgeons Into Household Names</span>
          </h2>

          <p className="font-sans text-slate-300 text-base sm:text-lg">
            High-converting clinical video content filmed on-site at your hospital with surgical-grade lighting, teleprompters, and medical review.
          </p>
        </div>

        {/* 3 Formats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {doctorVideoFormats.map((format, idx) => {
            const Icon = iconMap[format.iconName] || HelpCircle;

            return (
              <div
                key={format.id}
                className="group relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between bg-gradient-to-b from-[#04162E]/90 to-[#020B18]/95 border border-[#38BDF8]/25 hover:border-[#38BDF8]/60 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.35),0_14px_40px_-6px_rgba(14,165,233,0.22)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.6),0_20px_50px_-4px_rgba(0,229,255,0.35)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* Top Specular Line */}
                <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <div>
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="px-3 py-1 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/35 text-[#00E5FF] text-xs font-bold font-outfit">
                      {format.badge}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#38BDF8]" />
                      <span>{format.duration}</span>
                    </div>
                  </div>

                  {/* Video Player Frame Mockup */}
                  <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-[#062444] to-[#020F20] border border-[#38BDF8]/30 mb-6 overflow-hidden flex items-center justify-center group-hover:border-[#00E5FF]/60 transition-colors">
                    {/* Background Radial Glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0EA5E9]/20 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Simulated Surgeon Silhouette / Wave Graphic */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-25">
                      <Icon className="w-24 h-24 text-[#38BDF8]" />
                    </div>

                    {/* Central Play Button */}
                    <button
                      type="button"
                      onClick={onOpenAuditModal}
                      className="relative z-10 w-14 h-14 rounded-full bg-gradient-to-tr from-[#0284C7] to-[#00E5FF] shadow-[0_0_25px_rgba(0,229,255,0.6)] flex items-center justify-center transform group-hover:scale-110 transition-transform cursor-pointer"
                      aria-label={`Play preview for ${format.title}`}
                    >
                      <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                    </button>

                    {/* Bottom Indicator */}
                    <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300 font-sans z-10">
                      <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">4K Cinema Quality</span>
                      <span className="text-[#00E5FF] font-semibold">{format.reach}</span>
                    </div>
                  </div>

                  {/* Title & Category */}
                  <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white mb-1">
                    {format.title}
                  </h3>
                  <div className="text-xs font-semibold text-[#38BDF8] font-sans mb-3">
                    {format.category}
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
                    {format.description}
                  </p>

                  {/* Typical Topics */}
                  <div className="space-y-2 mb-6">
                    <div className="text-[11px] uppercase tracking-wider font-bold text-slate-400 font-outfit">
                      Popular Clinical Angles:
                    </div>
                    {format.topics.map((topic, tIdx) => (
                      <div key={tIdx} className="text-xs text-slate-200 bg-white/[0.04] p-2 rounded-lg border border-slate-800 flex items-start gap-2">
                        <span className="text-[#00E5FF] font-bold">›</span>
                        <span>{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <button
                  type="button"
                  onClick={onOpenAuditModal}
                  className="w-full py-2.5 rounded-xl font-outfit text-xs font-bold text-white bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#00E5FF] shadow-[0_4px_16px_rgba(14,165,233,0.3)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Doctor Video Script Sample</span>
                </button>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
