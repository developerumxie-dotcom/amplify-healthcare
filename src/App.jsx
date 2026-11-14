import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import SpecializationsBento from './components/SpecializationsBento';
import PatientAcquisitionEngine from './components/PatientAcquisitionEngine';
import CaseStudiesSection from './components/CaseStudiesSection';
import DoctorVideoShowcase from './components/DoctorVideoShowcase';
import TrustBadgesSection from './components/TrustBadgesSection';
import AuditIntakeForm from './components/AuditIntakeForm';
import Footer from './components/Footer';
import AuditModal from './components/AuditModal';

export default function App() {
  const [auditModalOpen, setAuditModalOpen] = useState(false);

  const openAuditModal = () => setAuditModalOpen(true);
  const closeAuditModal = () => setAuditModalOpen(false);

  return (
    <div className="min-h-screen bg-[#020813] text-slate-100 font-sans selection:bg-[#0EA5E9]/30 selection:text-white relative">
      
      {/* Top Floating Glass Capsule Navbar */}
      <Navbar onOpenAuditModal={openAuditModal} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        
        {/* Section 1 & 2: Signature Hero Section (1:1 Twin with Biometric Heart Canvas) */}
        <HeroSection onOpenAuditModal={openAuditModal} />

        {/* Section 3: Medical Specializations Bento Grid */}
        <SpecializationsBento onOpenAuditModal={openAuditModal} />

        {/* Section 4: 4-Stage Patient Acquisition Engine (Interactive Flow) */}
        <PatientAcquisitionEngine onOpenAuditModal={openAuditModal} />

        {/* Section 5: Verified Medical Case Studies & ROI */}
        <CaseStudiesSection onOpenAuditModal={openAuditModal} />

        {/* Section 6: Doctor Video Production Showcase */}
        <DoctorVideoShowcase onOpenAuditModal={openAuditModal} />

        {/* Section 7: Compliance, Ethics & Trust Badges */}
        <TrustBadgesSection />

        {/* Section 8: Confidential Hospital Audit Intake Form */}
        <AuditIntakeForm />

      </main>

      {/* Section 9: Standard Clean Footer (1:1 Twin with Colored Verticals) */}
      <Footer />

      {/* Interactive Audit Intake Modal */}
      <AuditModal isOpen={auditModalOpen} onClose={closeAuditModal} />

    </div>
  );
}
