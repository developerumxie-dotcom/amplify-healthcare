import React, { useEffect, useRef } from 'react';
import styles from './InteractiveGalaxyCanvas.module.css';

/**
 * AMPLIFY HEALTHCARE — INTERACTIVE GALAXY DOTS & CONSTELLATION CANVAS
 * 
 * Features:
 * 1. Living White Galaxy Dots & Starfield: Twinkling white stars and drifting cyan micro-particles.
 * 2. Constellation Network: Dynamic laser thread connections between nearby galaxy nodes.
 * 3. Translucent Crystal Shards: Gentle floating origami facets echoing the 3D healthcare bird.
 * 4. Responsive Cursor Chromatic Spotlight: Soft cyan glow following cursor.
 * 5. High Performance: GPU-accelerated requestAnimationFrame with tab visibility pause.
 */

export default function InteractiveGalaxyCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ── Mouse & Touch Tracking with Smooth Lerp ─────────────────────────────
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 180,
    };

    const handleMouseMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.targetX = e.touches[0].clientX;
        mouse.targetY = e.touches[0].clientY;
        mouse.active = true;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleMouseLeave);

    // ── Scroll Momentum ────────────────────────────────────────────────────
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity = (currentScrollY - lastScrollY) * 0.12;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // ── Galaxy Particles Configuration ─────────────────────────────────────
    const isMobile = width < 768;
    const PARTICLE_COUNT = isMobile ? 48 : 95;
    const SHARD_COUNT = isMobile ? 6 : 12;

    const brandColors = [
      { r: 255, g: 255, b: 255, isWhite: true }, // Spark White Galaxy Dot
      { r: 255, g: 255, b: 255, isWhite: true }, // Spark White Galaxy Dot (weighted)
      { r: 0, g: 229, b: 255, isWhite: false },  // Electric Cyan (#00E5FF)
      { r: 56, g: 189, b: 248, isWhite: false }, // Sky Blue (#38BDF8)
      { r: 14, g: 165, b: 233, isWhite: false }, // Deep Cyan (#0EA5E9)
      { r: 0, g: 255, b: 153, isWhite: false },  // Medical Mint Teal (#00FF99)
    ];

    // Initialize galaxy stars and dots with 3D depth layers
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const z = 0.25 + Math.random() * 0.75; // Depth factor
      const color = brandColors[Math.floor(Math.random() * brandColors.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35 * z,
        vy: (Math.random() - 0.5) * 0.35 * z,
        radius: color.isWhite ? (0.9 + Math.random() * 1.5) * z : (1.2 + Math.random() * 1.6) * z,
        z,
        color,
        baseAlpha: color.isWhite ? 0.45 + Math.random() * 0.50 : 0.35 + Math.random() * 0.40,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.025 + Math.random() * 0.035,
      };
    });

    // ── Floating Crystal Shards (Echoing 3D Bird Geometry) ─────────────────
    const shards = Array.from({ length: SHARD_COUNT }, () => {
      const z = 0.4 + Math.random() * 0.6;
      const size = (14 + Math.random() * 24) * z;
      const shardColors = [
        { r: 0, g: 229, b: 255 },
        { r: 56, g: 189, b: 248 },
        { r: 0, g: 255, b: 153 }
      ];
      const color = shardColors[Math.floor(Math.random() * shardColors.length)];
      const vertices = [
        { x: 0, y: -size },
        { x: size * (0.8 + Math.random() * 0.3), y: size * (0.6 + Math.random() * 0.3) },
        { x: -size * (0.7 + Math.random() * 0.3), y: size * (0.5 + Math.random() * 0.3) },
      ];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25 * z,
        vy: (Math.random() - 0.5) * 0.25 * z - 0.08,
        angle: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.007,
        scaleY: 1,
        flipSpeed: 0.01 + Math.random() * 0.014,
        flipPhase: Math.random() * Math.PI * 2,
        vertices,
        color,
        z,
        baseAlpha: 0.20 + Math.random() * 0.25,
      };
    });

    // ── Animation Loop ─────────────────────────────────────────────────────
    let time = 0;
    let isRunning = true;
    let lastTime = performance.now();

    const onVisibilityChange = () => {
      isRunning = !document.hidden;
      if (isRunning && !animId) {
        lastTime = performance.now();
        animId = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    function render(now) {
      if (!isRunning) return;
      animId = requestAnimationFrame(render);

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      time += dt;

      // Smooth cursor lerp
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.15;
        mouse.y += (mouse.targetY - mouse.y) * 0.15;
      } else {
        mouse.x += (-1000 - mouse.x) * 0.1;
        mouse.y += (-1000 - mouse.y) * 0.1;
      }

      // Decay scroll velocity
      scrollVelocity *= 0.92;

      ctx.clearRect(0, 0, width, height);

      // ── 1. Interactive Cursor Cyan Spotlight ──────────────────────────────
      if (mouse.active && mouse.x > 0 && mouse.y > 0) {
        const grad = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          mouse.radius * 1.5
        );
        grad.addColorStop(0, 'rgba(0, 229, 255, 0.14)');
        grad.addColorStop(0.5, 'rgba(14, 165, 233, 0.06)');
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, mouse.radius * 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── 2. Render Floating Crystal Shards ─────────────────────────────────
      for (let i = 0; i < shards.length; i++) {
        const s = shards[i];

        s.x += s.vx;
        s.y += s.vy - scrollVelocity * s.z;
        s.angle += s.rotSpeed;
        s.flipPhase += s.flipSpeed;
        s.scaleY = Math.cos(s.flipPhase);

        if (s.x < -60) s.x = width + 60;
        if (s.x > width + 60) s.x = -60;
        if (s.y < -60) s.y = height + 60;
        if (s.y > height + 60) s.y = -60;

        const glint = Math.abs(Math.sin(s.angle * 2));
        const alpha = s.baseAlpha * (0.6 + glint * 0.7);

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.angle);
        ctx.scale(1, s.scaleY);

        ctx.beginPath();
        ctx.moveTo(s.vertices[0].x, s.vertices[0].y);
        ctx.lineTo(s.vertices[1].x, s.vertices[1].y);
        ctx.lineTo(s.vertices[2].x, s.vertices[2].y);
        ctx.closePath();

        ctx.fillStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.12})`;
        ctx.fill();

        ctx.strokeStyle = `rgba(${s.color.r}, ${s.color.g}, ${s.color.b}, ${alpha * 0.65})`;
        ctx.lineWidth = 1.1 * s.z;
        ctx.stroke();

        ctx.restore();
      }

      // ── 3. Update & Draw Galaxy Stars & Dots ──────────────────────────────
      const maxConnectDist = isMobile ? 80 : 105;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy - scrollVelocity * p.z;

        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Mouse avoidance/gentle push
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0) {
            const force = (1 - dist / mouse.radius) * 0.4 * p.z;
            p.x += (dx / dist) * force * 5;
            p.y += (dy / dist) * force * 5;
          }
        }

        // Twinkling pulse
        const pulse = Math.sin(time * 3 + p.pulseOffset);
        const alpha = Math.max(0.15, Math.min(1, p.baseAlpha + pulse * 0.25));

        // Draw galaxy dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`;
        ctx.fill();

        // Optional subtle halo glow for white stars
        if (p.color.isWhite && p.radius > 1.2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.18})`;
          ctx.fill();
        }

        // Connect with nearby stars (constellation threads)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const lineAlpha = (1 - dist / maxConnectDist) * 0.14 * Math.min(p.z, p2.z);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
    }

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
