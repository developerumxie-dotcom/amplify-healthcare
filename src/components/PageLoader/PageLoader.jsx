import React, { useEffect, useState, useRef } from 'react';
import { getAssetUrl } from '../../utils/assetUrl';
import styles from './PageLoader.module.css';

/**
 * AMPLIFY HEALTHCARE — PREMIUM RESPONSIVE PRELOADER
 * Pixel-Accurate UI Recreation | React.js + Vanilla CSS Modules
 *
 * Visual Components:
 * 1. Deep midnight navy-blue background (#010817 to #020B1B)
 * 2. Luminous cyan-blue sweeping curved gradient in top-left corner
 * 3. Matching luminous cyan-blue sweeping curved gradient in bottom-right corner
 * 4. Thin glowing circular rotating loading ring with white-cyan leading head
 * 5. Original Amplify geometric origami bird centered inside ring (sharp & stationary)
 * 6. Three animated glowing dots beneath the ring in sequential wave
 * 7. Zero text, zero percentage indicators, spacious and premium
 */
export default function PageLoader() {
  const [isMounted, setIsMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const MIN_DISPLAY_TIME = prefersReducedMotion ? 400 : 2200; // ~2.2s for complete smooth rotation
    const MAX_TIMEOUT = 3200; // Safety cap to prevent infinite loading

    let exitTimeoutId = null;
    let unmountTimeoutId = null;

    const triggerExit = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const remainingTime = Math.max(0, MIN_DISPLAY_TIME - elapsed);

      exitTimeoutId = setTimeout(() => {
        setIsExiting(true);
        unmountTimeoutId = setTimeout(() => {
          setIsMounted(false);
        }, 420); // 420ms smooth dissolve into hero section
      }, remainingTime);
    };

    if (document.readyState === 'complete') {
      triggerExit();
    } else {
      const handleLoad = () => triggerExit();
      window.addEventListener('load', handleLoad, { once: true });
    }

    const safetyTimerId = setTimeout(() => {
      triggerExit();
    }, MAX_TIMEOUT);

    return () => {
      clearTimeout(exitTimeoutId);
      clearTimeout(unmountTimeoutId);
      clearTimeout(safetyTimerId);
    };
  }, []);

  if (!isMounted) return null;

  const birdUrl = getAssetUrl('assets/preloader-bird.png');

  return (
    <aside
      className={`${styles.loaderWrapper} ${isExiting ? styles.isExiting : ''}`}
      role="progressbar"
      aria-label="Loading Amplify Healthcare"
      aria-busy={!isExiting}
    >
      {/* ── 1. Top-Left Luminous Curved Gradient (SVG + Radial Bloom) ── */}
      <div className={styles.cornerTL}>
        <svg
          className={styles.curveSvg}
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMinYMin meet"
        >
          <defs>
            <radialGradient
              id="tlBloom"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(0, 0) scale(460, 460)"
            >
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.55" />
              <stop offset="25%" stopColor="#0EA5E9" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#0284C7" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#010817" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="tlStrokeGrad" x1="0" y1="420" x2="420" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.15" />
              <stop offset="25%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="55%" stopColor="#E0F7FF" stopOpacity="1" />
              <stop offset="80%" stopColor="#00E5FF" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
            </linearGradient>

            <filter id="tlGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blurDeep" />
              <feGaussianBlur stdDeviation="2.5" result="blurMid" />
              <feMerge>
                <feMergeNode in="blurDeep" />
                <feMergeNode in="blurMid" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Volumetric corner bloom filling behind the curve */}
          <path d="M 0,0 L 480,0 C 370,190 190,370 0,480 Z" fill="url(#tlBloom)" />

          {/* Diffused outer aura stroke */}
          <path
            d="M -30,420 C 150,390 390,150 420,-30"
            stroke="#00E5FF"
            strokeWidth="12"
            strokeOpacity="0.25"
            filter="url(#tlGlowFilter)"
          />

          {/* Primary crisp luminous curved crescent line */}
          <path
            d="M -30,420 C 150,390 390,150 420,-30"
            stroke="url(#tlStrokeGrad)"
            strokeWidth="3.2"
            filter="url(#tlGlowFilter)"
          />

          {/* High-intensity specular core line */}
          <path
            d="M 40,340 C 180,300 300,180 340,40"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />
        </svg>
      </div>

      {/* ── 2. Bottom-Right Luminous Curved Gradient (SVG + Radial Bloom) ── */}
      <div className={styles.cornerBR}>
        <svg
          className={styles.curveSvg}
          viewBox="0 0 540 540"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMaxYMax meet"
        >
          <defs>
            <radialGradient
              id="brBloom"
              cx="540"
              cy="540"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(540, 540) scale(460, 460)"
            >
              <stop offset="0%" stopColor="#00E5FF" stopOpacity="0.55" />
              <stop offset="25%" stopColor="#0EA5E9" stopOpacity="0.32" />
              <stop offset="55%" stopColor="#0284C7" stopOpacity="0.12" />
              <stop offset="85%" stopColor="#010817" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="brStrokeGrad" x1="120" y1="540" x2="540" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0284C7" stopOpacity="0.2" />
              <stop offset="20%" stopColor="#00E5FF" stopOpacity="0.95" />
              <stop offset="45%" stopColor="#E0F7FF" stopOpacity="1" />
              <stop offset="75%" stopColor="#38BDF8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#00E5FF" stopOpacity="0.15" />
            </linearGradient>

            <filter id="brGlowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="8" result="blurDeep" />
              <feGaussianBlur stdDeviation="2.5" result="blurMid" />
              <feMerge>
                <feMergeNode in="blurDeep" />
                <feMergeNode in="blurMid" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Volumetric corner bloom filling behind the curve */}
          <path d="M 540,540 L 60,540 C 170,350 350,170 540,60 Z" fill="url(#brBloom)" />

          {/* Diffused outer aura stroke */}
          <path
            d="M 120,570 C 150,390 390,150 570,120"
            stroke="#00E5FF"
            strokeWidth="12"
            strokeOpacity="0.25"
            filter="url(#brGlowFilter)"
          />

          {/* Primary crisp luminous curved crescent line */}
          <path
            d="M 120,570 C 150,390 390,150 570,120"
            stroke="url(#brStrokeGrad)"
            strokeWidth="3.2"
            filter="url(#brGlowFilter)"
          />

          {/* High-intensity specular core line */}
          <path
            d="M 200,500 C 240,360 360,240 500,200"
            stroke="#FFFFFF"
            strokeWidth="1.2"
            strokeOpacity="0.85"
          />
        </svg>
      </div>

      {/* Atmospheric center vignette */}
      <div className={styles.atmosphereOverlay} />

      {/* ── 3. Center Loader Composition (Ring, Bird, Dots) ── */}
      <div className={styles.loaderCenter}>
        {/* Circular Rotating Ring */}
        <div className={styles.ringContainer}>
          {/* Subtle static circular track */}
          <div className={styles.ringTrack} />

          {/* High-speed rotating neon conic gradient ring */}
          <div className={styles.ringSpinner}>
            {/* Bright luminous leading white-cyan tip */}
            <div className={styles.ringHead} />
          </div>

          {/* Stationary Original Amplify Origami Bird */}
          <div className={styles.birdWrapper}>
            <img
              src={birdUrl}
              alt="Amplify Healthcare"
              className={styles.birdLogo}
              width="268"
              height="234"
              loading="eager"
              decoding="sync"
            />
          </div>
        </div>

        {/* ── 4. Three Centered Glowing Dots ── */}
        <div className={styles.dotsContainer}>
          <span className={styles.dot} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </aside>
  );
}
