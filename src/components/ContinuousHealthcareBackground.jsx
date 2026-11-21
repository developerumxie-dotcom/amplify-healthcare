import React from 'react';
import InteractiveGalaxyCanvas from './InteractiveGalaxyCanvas';
import styles from './ContinuousHealthcareBackground.module.css';

/**
 * AMPLIFY HEALTHCARE — MASTER CONTINUOUS BACKGROUND
 * 
 * Features:
 * - Interactive Galaxy Canvas: Living white galaxy dots, stars, and responsive cursor spotlight.
 * - Subtle Cybernetic Dot-Matrix & Coordinate Grid with glowing cyan nodal intersections.
 * - Left Flank: Living fluid cyan (#00E5FF), sky blue (#0EA5E9) & deep sapphire (#0284C7) plasma fields.
 * - Right Flank: Luminous mint teal (#00FF88), electric cyan (#38BDF8) & deep navy plasma fields.
 * - Strategic White Galaxy Dots & Star Nodes throughout the entire page with multi-frequency breathing pulses.
 * - Dark Center Column Vignette ensuring 100% high-contrast legibility for all text, cards, and forms.
 * - Preserved Footer cyan wave ribbon at the base with zero cut-off lines.
 * - GPU-accelerated (will-change: transform, opacity) locked for 60Hz/120Hz smooth performance.
 */

// Strategic white galaxy dots and healthcare data node coordinates with multi-phase breathing pulses
const GALAXY_NODES = [
  // Upper Atmosphere (Clinical Specializations & 3D Logo Strip)
  { left: '11%', top: '15.5%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode1, halo: true },
  { left: '21%', top: '18.2%', sizeClass: styles.size2_5, colorClass: styles.colorCyan200, animClass: styles.animNode2 },
  { left: '87%', top: '17.8%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode3, halo: true },
  { left: '81%', top: '22.4%', sizeClass: styles.size2_5, colorClass: styles.colorSky200, animClass: styles.animNode1 },
  { left: '6%', top: '24.0%', sizeClass: styles.size2, colorClass: styles.colorSky300, animClass: styles.animNode2 },
  { left: '94%', top: '25.5%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode3 },

  // Middle-Upper Atmosphere (Selected Works / 3D Coverflow)
  { left: '13%', top: '33.0%', sizeClass: styles.size4, colorClass: styles.colorWhite, animClass: styles.animNode1, halo: true },
  { left: '8%', top: '37.4%', sizeClass: styles.size2_5, colorClass: styles.colorCyan300, animClass: styles.animNode3 },
  { left: '86%', top: '35.8%', sizeClass: styles.size3, colorClass: styles.colorMint200, animClass: styles.animNode2 },
  { left: '92%', top: '39.5%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode1 },

  // Middle Atmosphere (Case Studies & Verified ROI)
  { left: '9%', top: '47.5%', sizeClass: styles.size4, colorClass: styles.colorWhite, animClass: styles.animNode1, halo: true },
  { left: '22%', top: '51.0%', sizeClass: styles.size2, colorClass: styles.colorSky200, animClass: styles.animNode2 },
  { left: '89%', top: '49.8%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode3 },
  { left: '79%', top: '54.4%', sizeClass: styles.size3, colorClass: styles.colorCyan300, animClass: styles.animNode1, halo: true },
  { left: '7%', top: '58.0%', sizeClass: styles.size2_5, colorClass: styles.colorSky300, animClass: styles.animNode2 },
  { left: '93%', top: '60.5%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode3 },

  // Doctor Video Showcase Atmosphere
  { left: '12%', top: '66.2%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode2 },
  { left: '85%', top: '68.8%', sizeClass: styles.size3, colorClass: styles.colorCyan300, animClass: styles.animNode1, halo: true },

  // Lower Atmosphere (Brief Blueprint, Audit Intake Form & Footer)
  { left: '8%', top: '77.0%', sizeClass: styles.size3, colorClass: styles.colorCyan200, animClass: styles.animNode3 },
  { left: '89%', top: '78.4%', sizeClass: styles.size4, colorClass: styles.colorWhite, animClass: styles.animNode2, halo: true },
  { left: '18%', top: '85.5%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode1 },
  { left: '80%', top: '87.2%', sizeClass: styles.size3, colorClass: styles.colorCyan300, animClass: styles.animNode3, halo: true },
  { left: '10%', top: '93.0%', sizeClass: styles.size3, colorClass: styles.colorSky200, animClass: styles.animNode1 },
  { left: '88%', top: '96.5%', sizeClass: styles.size3, colorClass: styles.colorWhite, animClass: styles.animNode2 },
];

export default function ContinuousHealthcareBackground() {
  return (
    <>
      {/* ── Fixed Viewport Interactive Canvas (Full Viewport Galaxy Stars & Shards) ── */}
      <InteractiveGalaxyCanvas />

      {/* ── Continuous Seamless Canvas (Full Height Page Flow) ── */}
      <div
        className={styles.canvasWrapper}
        aria-hidden="true"
      >
        {/* ══════════════════════════════════════════════════════════════════
            1. SUBTLE CYBERNETIC DOT-MATRIX & COORDINATE GRID
           ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.cyberGridWrap}>
          <svg className={styles.cyberGridSvg} xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hcCyberGrid"
                width="56"
                height="56"
                patternUnits="userSpaceOnUse"
              >
                {/* Subtle matrix grid lines */}
                <path
                  d="M 56 0 L 0 0 0 56"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.035)"
                  strokeWidth="1"
                />
                {/* Pinpoint intersection dot */}
                <circle cx="0" cy="0" r="1.1" fill="rgba(0, 229, 255, 0.35)" />
                {/* Micro cyber crosshair at grid midpoint */}
                <path
                  d="M 27 28 L 29 28 M 28 27 L 28 29"
                  stroke="rgba(56, 189, 248, 0.22)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hcCyberGrid)" />
          </svg>

          {/* Ambient diagonal quantum sweep line */}
          <div className={styles.quantumSweepWrap}>
            <div className={styles.quantumSweepLine} />
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            2. LEFT FLANK — LIVING CYBER CYAN & SAPPHIRE PLASMA FIELDS
           ══════════════════════════════════════════════════════════════════ */}

        {/* Upper-Left Cyber Cyan Aurora */}
        <div className={styles.plasmaLeft1} />

        {/* Upper-Left Accent Cyan Glow Pulse */}
        <div className={styles.plasmaCyanPulse} />

        {/* Middle-Left Vivid Sapphire Plasma */}
        <div className={styles.plasmaLeft2} />

        {/* Middle-Left Electric Cyan/Sapphire */}
        <div className={styles.plasmaLeft3} />

        {/* Lower-Middle Left Deep Sapphire Plasma */}
        <div className={styles.plasmaLeft4} />

        {/* Doctor Video Zone Left Electric Cyan Plasma */}
        <div className={styles.plasmaLeft5} />

        {/* Lower-Left Deep Sapphire Rising Bloom */}
        <div className={styles.plasmaLeft6} />

        {/* ══════════════════════════════════════════════════════════════════
            3. RIGHT FLANK — LIVING MINT TEAL & LUMINOUS CYAN PLASMA FIELDS
           ══════════════════════════════════════════════════════════════════ */}

        {/* Upper-Right Mint Teal & Cyan Plasma */}
        <div className={styles.plasmaRight1} />

        {/* Lower-Middle Right Sapphire & Cyan Glow */}
        <div className={styles.plasmaRight2} />

        {/* Doctor Video Zone Right Mint Teal & Cyan Plasma */}
        <div className={styles.plasmaRight3} />

        {/* Lower-Right Deep Sapphire & Radiant Cyan Nebula */}
        <div className={styles.plasmaRight4} />

        {/* ── Dark Center Column Vignette (Guarantees Razor-Sharp Content Contrast) ── */}
        <div className={styles.centerVignette} />

        {/* ══════════════════════════════════════════════════════════════════
            4. PINPOINT WHITE GALAXY DOTS & BREATHING HALO PINGS
           ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.nodesContainer}>
          {GALAXY_NODES.map((node, idx) => (
            <div
              key={idx}
              className={styles.nodeAnchor}
              style={{
                left: node.left,
                top: node.top,
              }}
            >
              {/* Core pinpoint white galaxy dot */}
              <span
                className={`${styles.nodeDot} ${node.sizeClass} ${node.colorClass} ${node.animClass}`}
              />
              {/* Optional expanding cyber halo ping for key flagship nodes */}
              {node.halo && (
                <span className={styles.nodeHalo} />
              )}
            </div>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            5. FOOTER CYAN WAVE RIBBON (PRESERVED AT FOOTER BASE)
           ══════════════════════════════════════════════════════════════════ */}
        <div className={styles.footerWaveWrap}>
          <svg
            className={styles.footerWaveSvg}
            viewBox="0 0 1440 220"
            fill="none"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="neonGradFooterHc" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="#0369A1" stopOpacity="0.85" />
                <stop offset="25%" stopColor="#0284C7" stopOpacity="0.95" />
                <stop offset="50%" stopColor="#0EA5E9" stopOpacity="1" />
                <stop offset="75%" stopColor="#38BDF8" stopOpacity="1" />
                <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.95" />
              </linearGradient>

              <filter id="footerWaveGlowHc" x="-20%" y="-100%" width="140%" height="300%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Diffuse Luminous Aura Layer */}
            <path
              d="M 0 120 C 260 150, 520 160, 760 135 C 1000 105, 1220 70, 1440 45"
              stroke="url(#neonGradFooterHc)"
              strokeWidth="7"
              strokeOpacity="0.50"
              filter="url(#footerWaveGlowHc)"
            />

            {/* Sharp High-Precision Core Filament */}
            <path
              d="M 0 120 C 260 150, 520 160, 760 135 C 1000 105, 1220 70, 1440 45"
              stroke="url(#neonGradFooterHc)"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* ── Seamless Bottom Termination ─────────────────────────────── */}
        <div className={styles.bottomTermination} />
      </div>
    </>
  );
}
