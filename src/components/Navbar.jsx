import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, Activity } from 'lucide-react';

export default function Navbar({ onOpenAuditModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, sectionId) => {
    if (e && e.preventDefault) e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - (sectionId === 'home' ? 0 : navOffset);
      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: 'smooth'
      });
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', `#${sectionId}`);
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3 md:py-4 ${scrolled ? 'py-2.5 md:py-3' : ''}`}>
      {/* Seamless Faded Glass Blur Backdrop (feather-soft vertical gradient fade) */}
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 bg-gradient-to-b from-[#020813]/90 via-[#020813]/60 to-transparent backdrop-blur-md ${
          scrolled ? 'opacity-100' : 'opacity-40'
        }`} 
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Medical Wordmark */}
        <a 
          href="#home" 
          onClick={(e) => scrollToSection(e, 'home')} 
          className="group flex items-center gap-2.5 sm:gap-3 text-decoration-none focus:outline-none"
          aria-label="Amplify Healthcare Home"
        >
          {/* Glowing Medical Pulse Badge */}
          <div className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9]/25 to-[#00E5FF]/10 border border-[#38BDF8]/40 shadow-[0_0_15px_rgba(0,229,255,0.35)] transition-all duration-300 group-hover:shadow-[0_0_22px_rgba(0,229,255,0.6)] group-hover:border-[#38BDF8]/80">
            <span className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/30 to-transparent opacity-60 pointer-events-none" />
            <Activity className="w-5 h-5 text-[#38BDF8] group-hover:text-white transition-colors animate-pulse" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 font-outfit text-base sm:text-lg font-extrabold tracking-tight text-white leading-none">
              <span>AMPLIFY</span>
              <span className="text-[#38BDF8] tracking-widest text-[11px] sm:text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-[#0EA5E9]/15 border border-[#38BDF8]/30">
                HEALTHCARE
              </span>
            </div>
            <span className="text-[10px] tracking-wider text-slate-400 font-sans mt-0.5 font-medium hidden sm:inline-block">
              Hospital & Medical Marketing
            </span>
          </div>
        </a>

        {/* Center Floating Glass Capsule Navigation */}
        <nav className="hidden lg:flex items-center relative px-6 py-2 rounded-full bg-[#030E1A]/75 border border-[#38BDF8]/20 backdrop-blur-xl shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.40),0_10px_30px_-5px_rgba(2,8,19,0.8),0_0_20px_-2px_rgba(14,165,233,0.22)]">
          {/* Specular Top Cut-Glass Refraction Line */}
          <div className="absolute inset-x-4 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          
          {/* Diagonal Glass Glare */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none" />

          {/* Navigation Links with Smooth Movement */}
          <div className="flex items-center space-x-1 relative z-10">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')} 
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Home
            </a>

            <a 
              href="#specializations" 
              onClick={(e) => scrollToSection(e, 'specializations')} 
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Specializations
            </a>

            <a 
              href="#patient-funnel" 
              onClick={(e) => scrollToSection(e, 'patient-funnel')} 
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Patient Funnel
            </a>

            <a 
              href="#case-studies" 
              onClick={(e) => scrollToSection(e, 'case-studies')} 
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Case Studies
            </a>

            <a 
              href="#doctor-branding" 
              onClick={(e) => scrollToSection(e, 'doctor-branding')} 
              className="px-3.5 py-1.5 text-xs font-semibold tracking-wide text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
            >
              Doctor Branding
            </a>
          </div>
        </nav>

        {/* Right CTA Button: Book Audit */}
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={onOpenAuditModal} 
            className="relative group overflow-hidden px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-[#0284C7]/80 to-[#0EA5E9]/90 border border-[#38BDF8]/40 shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.55),0_6px_20px_rgba(14,165,233,0.35)] hover:shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.7),0_8px_28px_rgba(0,229,255,0.55)] transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
          >
            {/* Specular Top Cut Line */}
            <span className="absolute inset-x-2 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent pointer-events-none" />
            
            {/* Diagonal Ambient Glare */}
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/15 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />

            <span className="relative z-10 font-outfit">Book Audit</span>
            <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl bg-[#030E1A]/80 border border-[#38BDF8]/30 text-slate-200 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#38BDF8]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-3 rounded-2xl bg-[#030E1A]/95 border border-[#38BDF8]/25 backdrop-blur-2xl shadow-[inset_0_1.5px_1px_0_rgba(255,255,255,0.35),0_16px_40px_rgba(2,8,19,0.9)] p-5 space-y-3 animate-fadeIn">
          <a 
            href="#home" 
            onClick={(e) => scrollToSection(e, 'home')}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Home
          </a>
          <a 
            href="#specializations" 
            onClick={(e) => scrollToSection(e, 'specializations')}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Specializations
          </a>
          <a 
            href="#patient-funnel" 
            onClick={(e) => scrollToSection(e, 'patient-funnel')}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Patient Funnel
          </a>
          <a 
            href="#case-studies" 
            onClick={(e) => scrollToSection(e, 'case-studies')}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Case Studies
          </a>
          <a 
            href="#doctor-branding" 
            onClick={(e) => scrollToSection(e, 'doctor-branding')}
            className="block px-3 py-2 text-sm font-semibold text-slate-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Doctor Branding
          </a>
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuditModal();
              }}
              className="w-full py-2.5 rounded-xl font-semibold text-sm text-center text-white bg-gradient-to-r from-[#0284C7] to-[#00E5FF] shadow-[0_4px_16px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2"
            >
              <span>Schedule Confidential Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
