import React, { useEffect, useRef } from 'react';

/**
 * HeroHeartVisual
 * 
 * Lightweight biometric cardioid ribbon with real-time P-Q-R-S-T ECG pulse wave,
 * 4-second breathing cycle, orbiting neon cyan ring with glint, and bioluminescent
 * micro-particles responsive to mouse parallax.
 */
export default function HeroHeartVisual() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = 0;
    let height = 0;

    // Responsive High-DPI Canvas Resizing
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Mouse Tracking for Gentle Parallax
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      mouseRef.current.targetX = Math.max(-1, Math.min(1, nx));
      mouseRef.current.targetY = Math.max(-1, Math.min(1, ny));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize 36 Bioluminescent Micro-Particles
    const particles = Array.from({ length: 36 }, (_, i) => ({
      x: (Math.random() - 0.5) * 440,
      y: (Math.random() - 0.5) * 360,
      radius: Math.random() * 1.8 + 0.8,
      baseAlpha: Math.random() * 0.5 + 0.25,
      speed: Math.random() * 0.002 + 0.001,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.8 + 0.2,
      color: i % 3 === 0 ? '#00E5FF' : i % 3 === 1 ? '#38BDF8' : '#7DD3FC'
    }));

    // Generate Standard P-Q-R-S-T ECG Wave Value for a given normalized phase [0..1]
    const getECGValue = (phase) => {
      // phase 0 to 1
      if (phase < 0.15) return 0;
      // P wave (small upward bump)
      if (phase >= 0.15 && phase < 0.25) {
        return Math.sin((phase - 0.15) / 0.1 * Math.PI) * 0.18;
      }
      if (phase >= 0.25 && phase < 0.35) return 0;
      // Q wave (small dip)
      if (phase >= 0.35 && phase < 0.38) {
        return -Math.sin((phase - 0.35) / 0.03 * Math.PI) * 0.15;
      }
      // R wave (sharp steep spike up)
      if (phase >= 0.38 && phase < 0.44) {
        return Math.sin((phase - 0.38) / 0.06 * Math.PI) * 1.0;
      }
      // S wave (sharp steep dip down)
      if (phase >= 0.44 && phase < 0.49) {
        return -Math.sin((phase - 0.44) / 0.05 * Math.PI) * 0.35;
      }
      if (phase >= 0.49 && phase < 0.55) return 0;
      // T wave (smooth medium dome)
      if (phase >= 0.55 && phase < 0.72) {
        return Math.sin((phase - 0.55) / 0.17 * Math.PI) * 0.32;
      }
      return 0;
    };

    let startTime = performance.now();

    const render = (currentTime) => {
      const elapsed = (currentTime - startTime) * 0.001; // seconds

      // Mouse Parallax Smooth Damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;
      const mx = mouseRef.current.x * 20;
      const my = mouseRef.current.y * 15;

      ctx.clearRect(0, 0, width, height);

      // Center Anchor Point
      const cx = width * 0.5 + mx * 0.5;
      const cy = height * 0.48 + my * 0.5;

      // 4-Second Breathing Cycle (Inhale: expands scale & brightens; Exhale: settles)
      const breathPhase = (elapsed % 4.0) / 4.0;
      // smooth sine curve: 0 to 1 to 0
      const breathSine = (Math.sin(breathPhase * Math.PI * 2 - Math.PI / 2) + 1) * 0.5;
      const breathScale = 1.0 + breathSine * 0.07;
      const breathAlpha = 0.85 + breathSine * 0.15;

      // ─── 1. Background Ambient Radial Glow ───
      const bgGlow = ctx.createRadialGradient(cx, cy, 20, cx, cy, 260 * breathScale);
      bgGlow.addColorStop(0, `rgba(14, 165, 233, ${0.28 * breathAlpha})`);
      bgGlow.addColorStop(0.45, `rgba(2, 132, 199, ${0.12 * breathAlpha})`);
      bgGlow.addColorStop(1, 'rgba(2, 8, 19, 0)');
      ctx.fillStyle = bgGlow;
      ctx.beginPath();
      ctx.arc(cx, cy, 260 * breathScale, 0, Math.PI * 2);
      ctx.fill();

      // ─── 2. Floating Bioluminescent Micro-Particles ───
      particles.forEach((p) => {
        const px = cx + p.x + mx * p.depth + Math.sin(elapsed * p.speed * 1000 + p.phase) * 12;
        const py = cy + p.y + my * p.depth + Math.cos(elapsed * p.speed * 1000 + p.phase) * 10;
        const pAlpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(elapsed * 2 + p.phase));

        ctx.save();
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = pAlpha;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // ─── 3. Elliptical Orbit Ring (Angled at -22deg, matching Amplify Digital bird orbit) ───
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(-0.38); // ~ -22 deg

      const rx = 230 * breathScale;
      const ry = 64 * breathScale;

      // Orbit Track
      ctx.beginPath();
      ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
      ctx.lineWidth = 1.4;
      ctx.shadowColor = '#38BDF8';
      ctx.shadowBlur = 12;
      ctx.stroke();

      // Glint Particle traveling continuously on the orbit
      const glintAngle = (elapsed * 0.9) % (Math.PI * 2);
      const gx = Math.cos(glintAngle) * rx;
      const gy = Math.sin(glintAngle) * ry;

      // Outer Glint Glow
      const glintGrad = ctx.createRadialGradient(gx, gy, 1, gx, gy, 18);
      glintGrad.addColorStop(0, '#FFFFFF');
      glintGrad.addColorStop(0.3, '#00E5FF');
      glintGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
      ctx.fillStyle = glintGrad;
      ctx.beginPath();
      ctx.arc(gx, gy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Core Glint Point
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(gx, gy, 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // ─── 4. Luminous Biometric Ribbon Sculpture (Cardioid Ribbon) ───
      // We render an elegant, multi-layered ribbon geometry with cyan specular gradient
      ctx.save();
      ctx.translate(cx, cy);

      const ribbonPoints = 140;
      const ribbonRadius = 110 * breathScale;

      // Outer Glow Pass
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 28 * breathAlpha;

      // Draw Double-Layered Translucent Medical Ribbon
      for (let layer = 0; layer < 2; layer++) {
        ctx.beginPath();
        const layerOffset = layer === 0 ? 0 : Math.PI * 0.08;
        const layerAlpha = layer === 0 ? 0.85 : 0.45;

        for (let i = 0; i <= ribbonPoints; i++) {
          const t = (i / ribbonPoints) * Math.PI * 2;
          // Parametric cardioid/infinity ribbon formula
          const r = ribbonRadius * (0.85 + 0.25 * Math.sin(t * 2 + layerOffset + elapsed * 0.5));
          const x = r * Math.cos(t) * 1.25;
          const y = r * Math.sin(t) * 0.85 + Math.sin(t * 3 + elapsed) * 8;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();

        const ribbonGrad = ctx.createLinearGradient(-150, -100, 150, 100);
        ribbonGrad.addColorStop(0, `rgba(56, 189, 248, ${layerAlpha * breathAlpha})`);
        ribbonGrad.addColorStop(0.5, `rgba(14, 165, 233, ${layerAlpha * 0.6 * breathAlpha})`);
        ribbonGrad.addColorStop(1, `rgba(0, 229, 255, ${layerAlpha * breathAlpha})`);

        ctx.strokeStyle = ribbonGrad;
        ctx.lineWidth = layer === 0 ? 3.5 : 1.8;
        ctx.stroke();
      }

      ctx.restore();

      // ─── 5. Real-Time Traversing ECG Pulse Wave (P-Q-R-S-T) Across Heart ───
      ctx.save();
      ctx.translate(cx, cy);

      const ecgWidth = 340 * breathScale;
      const ecgStartX = -ecgWidth * 0.5;
      const ecgPoints = 160;

      // Sweep progress: loop every 2.4 seconds
      const pulseLoopTime = 2.4;
      const pulseProgress = (elapsed % pulseLoopTime) / pulseLoopTime; // 0 to 1
      const activePulseX = ecgStartX + pulseProgress * ecgWidth;

      // Draw Baseline and ECG Wave
      ctx.beginPath();
      for (let i = 0; i <= ecgPoints; i++) {
        const x = ecgStartX + (i / ecgPoints) * ecgWidth;
        const normX = i / ecgPoints; // 0 to 1

        // Calculate distance from currently moving pulse wave window (window size: 0.35)
        const windowSize = 0.36;
        const distFromHead = pulseProgress - normX;

        let y = 0;
        if (distFromHead >= 0 && distFromHead <= windowSize) {
          const ecgPhase = 1 - (distFromHead / windowSize); // 0 to 1
          const ecgHeight = getECGValue(ecgPhase);
          y = -ecgHeight * 58 * breathScale;
        }

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // ECG Wave Stroke Gradient (Bright white-cyan at head, fading cyan tail)
      const ecgGrad = ctx.createLinearGradient(ecgStartX, 0, ecgStartX + ecgWidth, 0);
      ecgGrad.addColorStop(0, 'rgba(56, 189, 248, 0.15)');
      const headNorm = Math.max(0.01, Math.min(0.99, pulseProgress));
      const tailNorm = Math.max(0, headNorm - 0.28);
      ecgGrad.addColorStop(tailNorm, 'rgba(56, 189, 248, 0.25)');
      ecgGrad.addColorStop(headNorm, '#FFFFFF');
      if (headNorm + 0.05 < 1) {
        ecgGrad.addColorStop(headNorm + 0.05, 'rgba(56, 189, 248, 0.2)');
      }
      ecgGrad.addColorStop(1, 'rgba(56, 189, 248, 0.15)');

      ctx.strokeStyle = ecgGrad;
      ctx.lineWidth = 2.8;
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 16;
      ctx.stroke();

      // Traveling Bright Head Dot on ECG line
      const headY = 0; // baseline
      ctx.beginPath();
      ctx.arc(activePulseX, headY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#00E5FF';
      ctx.shadowBlur = 20;
      ctx.fill();

      // Concentric Shockwave Ring from Lead Pulse Point
      const shockwaveRadius = (elapsed * 24) % 28;
      const shockwaveAlpha = Math.max(0, 1 - shockwaveRadius / 28);
      ctx.beginPath();
      ctx.arc(activePulseX, headY, shockwaveRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(0, 229, 255, ${shockwaveAlpha * 0.7})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[460px] lg:min-h-[540px] flex items-center justify-center pointer-events-none select-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ width: '100%', height: '100%', maxHeight: '560px' }}
      />
    </div>
  );
}
