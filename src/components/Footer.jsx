import React from 'react';
import { Mail, MapPin, Activity } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (e, sectionId) => {
    if (e && e.preventDefault) e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 75;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: Math.max(0, elementPosition - (sectionId === 'home' ? 0 : navOffset)),
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative bg-[#01060E] border-t border-[#38BDF8]/15 pt-16 pb-12 overflow-hidden">
      
      {/* Ambient Top Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[150px] bg-gradient-to-b from-[#0EA5E9]/10 to-transparent blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Identity (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')} 
              className="inline-flex items-center gap-3 group"
              aria-label="Amplify Healthcare Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0EA5E9]/30 to-[#00E5FF]/10 border border-[#38BDF8]/40 shadow-[0_0_15px_rgba(0,229,255,0.35)]">
                <Activity className="w-5 h-5 text-[#38BDF8] group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 font-outfit text-lg font-extrabold tracking-tight text-white">
                  <span>AMPLIFY</span>
                  <span className="text-[#38BDF8] tracking-widest text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-[#0EA5E9]/15 border border-[#38BDF8]/30">
                    HEALTHCARE
                  </span>
                </div>
                <span className="text-[10px] tracking-wider text-slate-400 font-sans">
                  Specialized Medical & Hospital Marketing
                </span>
              </div>
            </a>

            <p className="font-outfit text-sm font-semibold tracking-wide text-cyan-200">
              Clinical. Ethical. Global.
            </p>

            <p className="font-sans text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Empowering hospitals, super-specialty clinics and doctors with high-trust patient acquisition, surgical authority, and medical digital transformation.
            </p>
          </div>

          {/* Column 2: Our Verticals (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white">
              Our Verticals
            </h4>
            <ul className="space-y-3 font-sans text-xs sm:text-sm">
              <li>
                <a 
                  href="http://localhost:5173" 
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#A855F7] group-hover:shadow-[0_0_8px_#A855F7]" />
                  <span>Amplify Digital</span>
                  <span className="text-[10px] text-slate-500 font-mono">:5173</span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-2.5 text-white font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-pulse" />
                  <span className="text-cyan-200">Amplify Healthcare</span>
                  <span className="text-[10px] text-[#00E5FF] font-mono px-1 rounded bg-[#00E5FF]/10">Current</span>
                </div>
              </li>
              <li>
                <a 
                  href="http://localhost:5176" 
                  className="flex items-center gap-2.5 text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-2 h-2 rounded-full bg-[#EAB308] group-hover:shadow-[0_0_8px_#EAB308]" />
                  <span>Amplify Academy</span>
                  <span className="text-[10px] text-slate-500 font-mono">:5176</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links (lg:col-span-2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white">
              Quick Links
            </h4>
            <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-slate-400">
              <li>
                <a href="#specializations" onClick={(e) => scrollToSection(e, 'specializations')} className="hover:text-[#38BDF8] transition-colors">
                  Specializations
                </a>
              </li>
              <li>
                <a href="#patient-funnel" onClick={(e) => scrollToSection(e, 'patient-funnel')} className="hover:text-[#38BDF8] transition-colors">
                  Patient Funnel
                </a>
              </li>
              <li>
                <a href="#case-studies" onClick={(e) => scrollToSection(e, 'case-studies')} className="hover:text-[#38BDF8] transition-colors">
                  Case Studies
                </a>
              </li>
              <li>
                <a href="#doctor-branding" onClick={(e) => scrollToSection(e, 'doctor-branding')} className="hover:text-[#38BDF8] transition-colors">
                  Doctor Branding
                </a>
              </li>
              <li>
                <a href="#audit-form" onClick={(e) => scrollToSection(e, 'audit-form')} className="hover:text-[#38BDF8] transition-colors">
                  Hospital Audit
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Get In Touch (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-outfit text-sm font-bold uppercase tracking-wider text-white">
              Get In Touch
            </h4>
            
            <div className="space-y-3 font-sans text-xs sm:text-sm text-slate-400">
              <a 
                href="mailto:support@amplifydigitalservices.com" 
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#00E5FF] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="break-all">support@amplifydigitalservices.com</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span>Raipur, Chhattisgarh, India</span>
              </div>

              {/* Social Vector Icons */}
              <div className="pt-2 flex items-center gap-2.5">
                {/* LinkedIn */}
                <a 
                  href="https://www.linkedin.com/company/amplify-digital-services" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="LinkedIn"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] hover:bg-[#0EA5E9]/20 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.6 1.6 0 0 0 1.6-1.6c0-.88-.72-1.6-1.6-1.6a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.6 1.6 1.6m1.4 9.74v-8.37H5.06v8.37h2.8z"/>
                  </svg>
                </a>

                {/* Instagram */}
                <a 
                  href="https://www.instagram.com/amplifydigital.in" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] hover:bg-[#0EA5E9]/20 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>

                {/* YouTube */}
                <a 
                  href="https://www.youtube.com/@amplifydigital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] hover:bg-[#0EA5E9]/20 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>

                {/* X */}
                <a 
                  href="https://x.com/amplifydigital" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="X"
                  className="w-9 h-9 rounded-xl bg-white/[0.04] border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-white hover:border-[#00E5FF] hover:bg-[#0EA5E9]/20 transition-all"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Sub-Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-sans">
          <p>© 2026 Amplify Healthcare • A division of Amplify Digital Services. All rights reserved.</p>

          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Medical Compliance</a>
            <span>•</span>
            <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
