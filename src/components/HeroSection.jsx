import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroBirdVisual from './HeroBirdVisual';
import styles from './HeroSection.module.css';

/**
 * AMPLIFY HEALTHCARE — HERO SECTION
 *
 * Sized and tuned with comfortable breathing room, scaled headline,
 * generous action buttons, clinical lighting trails, and the signature 3D
 * revolving healthcare bird sculpture.
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
    <section id="home" className={styles.heroSection}>

      {/* ── Background Atmospheric Volumetric Nebulae ─────────────────── */}
      <div className={styles.atmosphereNebulae}>
        {/* Cyan glow focused around 3D bird */}
        <div className={styles.glowBirdCyan} />

        {/* Deep sapphire upper-right illumination */}
        <div className={styles.glowUpperRight} />

        {/* Cyan lower-right illumination */}
        <div className={styles.glowLowerRight} />

        {/* Bottom-center floor illumination */}
        <div className={styles.glowFloorCyan} />

        {/* Dark obsidian subtle haze behind headline for clean contrast */}
        <div className={styles.glowHeadlineNavy} />
      </div>

      {/* ── Sparse Pinpoint Star Particles ────────────────────────────── */}
      <div className={styles.starField}>
        <span
          className={`${styles.starParticle} ${styles.star1}`}
          style={{ left: '50.3%', top: '26.4%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star2}`}
          style={{ left: '52.0%', top: '54.6%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star3}`}
          style={{ left: '71.1%', top: '20.2%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star4}`}
          style={{ left: '78.7%', top: '34.1%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star5}`}
          style={{ left: '87.4%', top: '50.6%' }}
        />
        <span
          className={`${styles.starParticle} ${styles.star6}`}
          style={{ left: '95.5%', top: '27.3%' }}
        />
      </div>

      {/* ── Main Hero Content Grid ────────────────────────────────────── */}
      <div className={styles.contentContainer}>
        <div className={styles.gridRow}>

          {/* Left Column: Headline, Copy & CTAs */}
          <div className={styles.leftCol}>

            {/* Tag Badge: Healthcare • Strategy • Growth */}
            <div className={styles.tagBadge}>
              <span className={styles.tagTopReflect} />
              <span className={styles.tagDot} />
              <span className={styles.tagText}>
                Healthcare • Strategy • Growth
              </span>
            </div>

            {/* Main Headline */}
            <h1 className={styles.headline}>
              We Turn Healthcare <br />
              Into <span className="text-gradient-cyan">Impact.</span>
            </h1>

            {/* Supporting Copy */}
            <p className={styles.subCopy}>
              A 360° healthcare marketing, patient growth and medical authority studio<br className={styles.breakInline} /> for ambitious hospitals, clinics and doctors.
            </p>

            {/* Action Buttons */}
            <div className={styles.actionsRow}>
              {/* Primary CTA: Schedule Hospital Audit */}
              <button
                type="button"
                onClick={onOpenAuditModal}
                className={styles.btnPrimary}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnSpecularCut} />

                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlareLuminous} />

                <span className={styles.btnText}>Schedule Hospital Audit</span>
                <ArrowRight className={styles.btnIcon} />
              </button>

              {/* Secondary CTA: Explore Case Studies */}
              <a
                href="#case-studies"
                onClick={(e) => scrollToSection(e, 'case-studies')}
                className={styles.btnSecondary}
              >
                {/* Specular Top Cut-Glass Refraction Line */}
                <span className={styles.btnSpecularCutClear} />

                {/* Diagonal Ambient Studio Glare */}
                <span className={styles.btnGlareClear} />

                <span className={styles.btnText}>Explore Case Studies</span>
                <span className={styles.secondaryDotIndicator} />
              </a>
            </div>

            {/* Mouse Scroll Indicator */}
            <div className={styles.scrollIndicator}>
              <div className={styles.scrollMouse}>
                <span className={styles.scrollDot} />
              </div>
              <span className={styles.scrollText}>Scroll to explore</span>
            </div>
          </div>

          {/* Right Column: 3D Origami Bird Sculpture */}
          <div className={styles.rightCol}>
            <HeroBirdVisual />
          </div>

        </div>
      </div>
    </section>
  );
}
