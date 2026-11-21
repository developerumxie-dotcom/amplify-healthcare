import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ContinuousHealthcareBackground from './components/ContinuousHealthcareBackground';
import SpecializationsBento from './components/SpecializationsBento';
import ClientLogoBar from './components/ClientLogoBar';
import SelectedWorksSection from './components/SelectedWorksSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import DoctorVideoShowcase from './components/DoctorVideoShowcase';
import BriefBlueprintSection from './components/BriefBlueprintSection';
import AuditIntakeForm from './components/AuditIntakeForm';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';
import AmplifyAI from './features/amplify-ai/AmplifyAI';

export default function App() {
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const openAuditModal = () => setAuditModalOpen(true);
  const closeAuditModal = () => setAuditModalOpen(false);

  return (
    <div className="min-h-screen bg-[#01040A] text-slate-100 font-sans selection:bg-[#0EA5E9]/30 selection:text-white relative flex flex-col">
      
      {/* Background Cosmic Starfield / Light Gradients for Hero */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[900px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(14,165,233,0.16),transparent)]" />
      </div>

      {/* Main Page Layout Sections — Seamless Single One-Page Continuous Canvas */}
      <div className="relative z-10 flex flex-col flex-1">
        
        {/* Top Floating Glass Capsule Navbar */}
        <Navbar onOpenAuditModal={openAuditModal} />

        {/* ── Single Unified Continuous Canvas (Zero Cut Lines, True One-Page Flow) ── */}
        <main className="relative w-full flex-1 overflow-hidden">
          
          {/* Master Continuous High-Tech Background with Living Color Shades & White Galaxy Dots */}
          <ContinuousHealthcareBackground />

          {/* Seamless Sections Stack */}
          <div className="relative z-10">
            {/* Section 1: Signature 3D Bird Hero */}
            <HeroSection onOpenAuditModal={openAuditModal} />

            {/* Section 2: Medical Specializations Bento Grid */}
            <SpecializationsBento onOpenAuditModal={openAuditModal} />

            {/* Section 3: 3D Convex Cylinder Curve Section with 20 Verified Institution Logos */}
            <ClientLogoBar />

            {/* Section 4: Selected Clinical Works — 3D Perspective Coverflow Carousel */}
            <SelectedWorksSection onOpenAuditModal={openAuditModal} />
            
            {/* Section 5: Verified Medical Case Studies & Documented Outcomes */}
            <CaseStudiesSection onOpenAuditModal={openAuditModal} />

            {/* Section 6: Doctor Video Production Showcase */}
            <DoctorVideoShowcase onOpenAuditModal={openAuditModal} />

            {/* Section 7: Brief > Blueprint Interactive Plan Generator */}
            <BriefBlueprintSection onOpenAuditModal={openAuditModal} />

            {/* Section 8: Confidential Hospital Audit Intake Form */}
            <AuditIntakeForm />

            {/* Section 9: Seamless Footer */}
            <Footer />
          </div>
        </main>
      </div>

      {/* Interactive Audit Intake Modal */}
      <AuditModal isOpen={auditModalOpen} onClose={closeAuditModal} />

      {/* AMPLIFY AI — 3D Interactive Virtual Assistant Mascot */}
      <AmplifyAI />

    </div>
  );
}
