import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroHeartVisual from './HeroHeartVisual';

/**
 * AMPLIFY HEALTHCARE — HERO SECTION
 * 
 * Twin 2-column layout with dark pitch-obsidian backdrop:
 * - Ultra-deep clinical obsidian black (#01040A)
 * - Left column with pill badge, headline, subtitle, dual CTAs, mouse scroll
 * - Right column with signature 3D Glass Heart & ECG Three.js Visual
 */
export default function HeroSection({ onOpenAuditModal }) {
  const scrollToSection = (e, sectionId) => {
    if (e && e.preventDefault) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - navOffset),
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-[92vh] flex items-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden bg-[#01040A]">
      
      {/* ─── Background Atmospheric Volumetric Nebulae (Deep Obsidian Mood) ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle cyan glow focused around 3D heart */}
        <div className="absolute top-[20%] right-[8%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#0EA5E9]/14 via-[#00E5FF]/6 to-transparent blur-[110px]" />
        
        {/* Deep pitch navy ambient shading */}
        <div className="absolute top-[10%] right-[32%] w-[500px] h-[500px] rounded-full bg-[#020B18]/30 blur-[130px]" />

        {/* Ambient bottom sweep cyan glow */}
        <div className="absolute -bottom-28 left-[18%] w-[600px] h-[320px] rounded-full bg-gradient-to-r from-[#0284C7]/12 to-[#00E5FF]/8 blur-[100px]" />

        {/* Deep obsidian vignette behind headline for 100% crisp contrast */}
        <div className="absolute top-[18%] left-[-10%] w-[580px] h-[480px] rounded-full bg-[#000206]/95 blur-[90px]" />
      </div>

      {/* ─── Sparse Pinpoint Star/Micro Glint Particles ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute w-1 h-1 rounded-full bg-[#38BDF8] opacity-50 animate-ping" style={{ left: '50.3%', top: '24.4%', animationDuration: '4s' }} />
        <span className="absolute w-1 h-1 rounded-full bg-[#00E5FF] opacity-40" style={{ left: '54.0%', top: '56.6%' }} />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-white opacity-60" style={{ left: '71.1%', top: '18.2%' }} />
        <span className="absolute w-1 h-1 rounded-full bg-[#38BDF8] opacity-35 animate-pulse" style={{ left: '82.7%', top: '32.1%', animationDuration: '3s' }} />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-[#00E5FF] opacity-50" style={{ left: '89.4%', top: '52.6%' }} />
        <span className="absolute w-1 h-1 rounded-full bg-white opacity-40" style={{ left: '94.5%', top: '26.3%' }} />
      </div>

      {/* ─── SVG Decorative Lighting Trails & Horizon Waves ─── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
        viewBox="0 0 1024 454"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="hcBottomWaveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0369A1" stopOpacity="0" />
            <stop offset="25%" stopColor="#0284C7" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#0EA5E9" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.65" />
          </linearGradient>

          <filter id="hcWaveGlow" x="-10%" y="-40%" width="120%" height="180%">
            <feGaussianBlur stdDeviation="3.0" result="blur1" />
            <feGaussianBlur stdDeviation="6.0" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Sweeping Bottom Horizon Wave */}
        <path
          d="M 320,454 C 480,432 620,404 740,394 C 830,386 930,370 1024,388"
          fill="none"
          stroke="url(#hcBottomWaveGrad)"
          strokeWidth="2.2"
          filter="url(#hcWaveGlow)"
        />
      </svg>

      {/* ─── Main Hero Content Grid (2-Column Split) ─── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-6 flex flex-col items-start text-left space-y-6 pt-4 lg:pt-0">

            {/* Top Glass Pill Badge: Healthcare • Strategy • Growth */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#020A16]/85 border border-[#38BDF8]/30 backdrop-blur-md shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.35),0_4px_16px_rgba(14,165,233,0.18)]">
              <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse shadow-[0_0_8px_#00E5FF]" />
              <span className="font-outfit text-xs sm:text-sm font-semibold tracking-wide text-cyan-200">
                Healthcare • Strategy • Growth
              </span>
            </div>

            {/* Main Headline (Outfit 800, Bold & Imposing) */}
            <h1 className="font-outfit text-4xl sm:text-5xl md:text-6xl xl:text-[68px] font-extrabold text-white tracking-tight leading-[1.08]">
              We Turn Healthcare <br className="hidden sm:inline" />
              Into{' '}
              <span className="text-gradient-cyan">
                Impact.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="font-sans text-base sm:text-lg lg:text-xl text-slate-300 max-w-xl font-normal leading-relaxed">
              A 360° healthcare marketing, patient growth and medical authority studio for ambitious hospitals, clinics and doctors.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              {/* Primary CTA: Schedule Hospital Audit */}
              <button
                type="button"
                onClick={onOpenAuditModal}
                className="group relative overflow-hidden px-6 sm:px-8 py-3.5 rounded-full font-outfit text-sm sm:text-base font-bold text-white bg-gradient-to-r from-[#0284C7] via-[#0EA5E9] to-[#00E5FF] border border-white/40 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.7),0_8px_28px_rgba(14,165,233,0.5)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.9),0_12px_36px_rgba(0,229,255,0.75)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5"
              >
                {/* Specular Cut Line */}
                <span className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
                
                {/* Glare Sheen */}
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

                <span className="relative z-10">Schedule Hospital Audit</span>
                <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-1" />
              </button>

              {/* Secondary CTA: Explore Case Studies */}
              <a
                href="#case-studies"
                onClick={(e) => scrollToSection(e, 'case-studies')}
                className="group relative overflow-hidden px-6 sm:px-7 py-3.5 rounded-full font-outfit text-sm sm:text-base font-semibold text-slate-100 bg-[#020914]/85 border border-[#38BDF8]/25 backdrop-blur-md shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.30),0_6px_20px_rgba(1,4,10,0.8)] hover:bg-[#031024]/90 hover:border-[#38BDF8]/50 transition-all duration-200 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
              >
                {/* Specular Cut Line */}
                <span className="absolute inset-x-3 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                <span className="relative z-10">Explore Case Studies</span>
                
                {/* Pulsing Cyan Dot Indicator */}
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5FF] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#38BDF8]" />
                </span>
              </a>
            </div>

            {/* Mouse Scroll Indicator */}
            <div className="pt-6 sm:pt-10 flex items-center gap-3 text-slate-400">
              <div className="w-5 h-8 rounded-full border-2 border-slate-600/60 flex items-start justify-center p-1">
                <span className="w-1 h-2 rounded-full bg-[#38BDF8] animate-bounce" />
              </div>
              <span className="text-xs tracking-wider uppercase font-medium font-sans text-slate-400">
                Scroll to explore
              </span>
            </div>
          </div>

          {/* Right Column: Signature 3D Glass Heart & Traversing ECG Three.js Visual */}
          <div className="lg:col-span-6 relative w-full flex items-center justify-center">
            <HeroHeartVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
