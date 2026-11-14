import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AMPLIFY HEALTHCARE — SIGNATURE 3D GLASS HEART WITH LUB-DUB HEARTBEAT
 * 
 * Perfectly matches user's reference image:
 * - 3D Translucent Pillowed Glass Heart with true refraction & crystalline depth
 * - Internal Sparkling Constellation Network with interconnected holographic nodes
 * - Electric Glowing Cyan Outer Rim Contour with Additive Blending
 * - Horizontal ECG Line passing across the heart with sharp P-Q-R-S-T complexes
 * - Dual Gyroscopic Neon Orbit Rings with traveling glint beads
 * - Physiological "Lub-Dub" Anatomical Heartbeat contraction & luminous emissive flash
 * - Smooth clamped mouse parallax tilt
 */
export default function HeroHeartVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 560;
    let height = container.clientHeight || 560;

    // ─── 1. Scene, Camera & High-Performance Renderer ───
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ─── 2. Clinical Lighting Setup ───
    const ambientLight = new THREE.AmbientLight(0x011222, 2.0);
    scene.add(ambientLight);

    // Key Electric Cyan Light
    const cyanKey = new THREE.PointLight(0x00E5FF, 14, 25);
    cyanKey.position.set(3.2, 2.4, 4.0);
    scene.add(cyanKey);

    // Deep Sky Blue Fill Light
    const skyFill = new THREE.PointLight(0x0EA5E9, 9, 20);
    skyFill.position.set(-3.5, -2.0, 3.0);
    scene.add(skyFill);

    // Internal Heart Point Light (Pulsing from within the glass)
    const heartInternalLight = new THREE.PointLight(0x00E5FF, 15, 8);
    heartInternalLight.position.set(0, 0, 0.1);
    scene.add(heartInternalLight);

    // Back Rim Light for specular edge highlights
    const rimLight = new THREE.PointLight(0x38BDF8, 14, 18);
    rimLight.position.set(0, 0.5, -3.2);
    scene.add(rimLight);

    // ─── 3. Heart Group (Root for 3D Transform & Parallax) ───
    const heartRoot = new THREE.Group();
    heartRoot.position.set(0.3, 0.1, 0);
    scene.add(heartRoot);

    // ─── 4. Construct 3D Cardioid Heart Geometry ───
    const heartShape = new THREE.Shape();
    // Top central cleft
    heartShape.moveTo(0, 0.38);
    // Left lobe
    heartShape.bezierCurveTo(-0.24, 0.82, -0.92, 0.72, -0.92, 0.18);
    heartShape.bezierCurveTo(-0.92, -0.28, -0.52, -0.72, 0, -1.15);
    // Right lobe (symmetrical)
    heartShape.bezierCurveTo(0.52, -0.72, 0.92, -0.28, 0.92, 0.18);
    heartShape.bezierCurveTo(0.92, 0.72, 0.24, 0.82, 0, 0.38);

    const extrudeSettings = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 2,
      bevelSize: 0.14,
      bevelThickness: 0.14,
      curveSegments: 80,
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    // ─── 5. Translucent Glass Physical Material ───
    // Translucent sapphire-cyan crystal with glass refraction, allowing inner stars to shine through
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x041E3A),
      emissive: new THREE.Color(0x00E5FF),
      emissiveIntensity: 0.20,
      roughness: 0.06,
      metalness: 0.10,
      transmission: 0.94,
      opacity: 0.45,
      transparent: true,
      depthWrite: false, // Allows inner starfield to remain completely visible
      ior: 1.52,
      thickness: 0.65,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xFFFFFF),
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
    });

    const heartMesh = new THREE.Mesh(heartGeometry, glassMaterial);
    heartRoot.add(heartMesh);

    // ─── 6. Glowing Electric Cyan Rim Contours (Layered for Intense Neon Edge) ───
    const rimPoints = heartShape.getSpacedPoints(240);

    // Front Rim
    const rimGeometryFront = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x, p.y, 0.22))
    );
    // Back Rim
    const rimGeometryBack = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x, p.y, -0.22))
    );
    // Center Midline Rim
    const rimGeometryMid = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x * 1.015, p.y * 1.015, 0))
    );

    const rimMaterialCore = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      linewidth: 3,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });

    const rimMaterialGlow = new THREE.LineBasicMaterial({
      color: 0x38BDF8,
      linewidth: 2,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const rimLineFront = new THREE.Line(rimGeometryFront, rimMaterialCore);
    const rimLineBack = new THREE.Line(rimGeometryBack, rimMaterialCore);
    const rimLineMid = new THREE.Line(rimGeometryMid, rimMaterialGlow);
    heartRoot.add(rimLineFront);
    heartRoot.add(rimLineBack);
    heartRoot.add(rimLineMid);

    // ─── 7. Internal Constellation / Sparkling Star Matrix Inside Heart ───
    // Exactly matches the sparkling constellation inside the reference image heart
    const innerParticleCount = 340;
    const innerPositions = [];
    const innerColors = [];

    const cyanColor = new THREE.Color(0x00E5FF);
    const whiteColor = new THREE.Color(0xFFFFFF);
    const skyColor = new THREE.Color(0x7DD3FC);

    while (innerPositions.length < innerParticleCount * 3) {
      const rx = (Math.random() - 0.5) * 1.6;
      const ry = (Math.random() - 0.5) * 1.8 - 0.15;
      const rz = (Math.random() - 0.5) * 0.42;

      // Cardioid test
      const tx = rx * 1.15;
      const ty = (ry + 0.1) * 1.15;
      const eq = Math.pow(tx * tx + ty * ty - 0.8, 3) - tx * tx * Math.pow(ty, 3);

      if (eq <= 0.06) {
        innerPositions.push(rx, ry, rz);
        const col = Math.random() > 0.4 ? cyanColor : Math.random() > 0.5 ? whiteColor : skyColor;
        innerColors.push(col.r, col.g, col.b);
      }
    }

    const innerGeo = new THREE.BufferGeometry();
    innerGeo.setAttribute('position', new THREE.Float32BufferAttribute(innerPositions, 3));
    innerGeo.setAttribute('color', new THREE.Float32BufferAttribute(innerColors, 3));

    const innerMat = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const innerParticles = new THREE.Points(innerGeo, innerMat);
    heartRoot.add(innerParticles);

    // Thin Crystalline Web / Line Segments between nearby inner nodes
    const webIndices = [];
    const pts = [];
    for (let i = 0; i < innerPositions.length; i += 3) {
      pts.push(new THREE.Vector3(innerPositions[i], innerPositions[i + 1], innerPositions[i + 2]));
    }
    for (let i = 0; i < pts.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < pts.length; j++) {
        const dist = pts[i].distanceTo(pts[j]);
        if (dist < 0.22 && connections < 3) {
          webIndices.push(i, j);
          connections++;
        }
      }
    }
    const webGeo = new THREE.BufferGeometry().setFromPoints(pts);
    webGeo.setIndex(webIndices);
    const webMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const webMesh = new THREE.LineSegments(webGeo, webMat);
    heartRoot.add(webMesh);

    // ─── 8. Orbiting Gyroscopic Neon Rings with Traveling Glint Beads ───
    // Ring 1 (Tilted at -24 deg)
    const ringGroup1 = new THREE.Group();
    ringGroup1.rotation.z = -0.42;
    ringGroup1.rotation.x = 0.35;
    heartRoot.add(ringGroup1);

    const ringRadiusX1 = 2.05;
    const ringRadiusY1 = 0.72;
    const ringPts1 = [];
    for (let i = 0; i <= 100; i++) {
      const a = (i / 100) * Math.PI * 2;
      ringPts1.push(new THREE.Vector3(Math.cos(a) * ringRadiusX1, Math.sin(a) * ringRadiusY1, 0));
    }
    const ringGeo1 = new THREE.BufferGeometry().setFromPoints(ringPts1);
    const ringMat = new THREE.LineBasicMaterial({
      color: 0x38BDF8,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Line(ringGeo1, ringMat);
    ringGroup1.add(ring1);

    // Traveling Glint Bead 1
    const glintSphereGeo = new THREE.SphereGeometry(0.045, 16, 16);
    const glintMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      blending: THREE.AdditiveBlending,
    });
    const glintBead1 = new THREE.Mesh(glintSphereGeo, glintMat);
    ringGroup1.add(glintBead1);

    // Ring 2 (Counter-tilted at +18 deg)
    const ringGroup2 = new THREE.Group();
    ringGroup2.rotation.z = 0.32;
    ringGroup2.rotation.x = -0.45;
    heartRoot.add(ringGroup2);

    const ringRadiusX2 = 1.88;
    const ringRadiusY2 = 0.82;
    const ringPts2 = [];
    for (let i = 0; i <= 100; i++) {
      const a = (i / 100) * Math.PI * 2;
      ringPts2.push(new THREE.Vector3(Math.cos(a) * ringRadiusX2, Math.sin(a) * ringRadiusY2, 0));
    }
    const ringGeo2 = new THREE.BufferGeometry().setFromPoints(ringPts2);
    const ring2 = new THREE.Line(ringGeo2, ringMat);
    ringGroup2.add(ring2);

    // Traveling Glint Bead 2
    const glintBead2 = new THREE.Mesh(glintSphereGeo, glintMat);
    ringGroup2.add(glintBead2);

    // ─── 9. Horizontal ECG Cardiogram Line (Cuts Across Foreground) ───
    const ecgLinePoints = [];
    const totalEcgPts = 320;
    const ecgWidth = 8.5; // spans x = -4.25 to +4.25

    // Realistic P-Q-R-S-T generator across foreground (z = 0.15)
    for (let i = 0; i <= totalEcgPts; i++) {
      const x = -ecgWidth * 0.5 + (i / totalEcgPts) * ecgWidth;
      let y = 0;

      // Complex 1: Approaching the heart (x in [-2.4, -1.2])
      if (x >= -2.4 && x <= -1.2) {
        const u = (x - -2.4) / 1.2;
        if (u > 0.15 && u < 0.28) y = Math.sin((u - 0.15) / 0.13 * Math.PI) * 0.16; // P
        else if (u >= 0.34 && u < 0.38) y = -Math.sin((u - 0.34) / 0.04 * Math.PI) * 0.18; // Q
        else if (u >= 0.38 && u < 0.46) y = Math.sin((u - 0.38) / 0.08 * Math.PI) * 0.95; // R
        else if (u >= 0.46 && u < 0.53) y = -Math.sin((u - 0.46) / 0.07 * Math.PI) * 0.48; // S
        else if (u >= 0.60 && u < 0.78) y = Math.sin((u - 0.60) / 0.18 * Math.PI) * 0.28; // T
      }

      // Complex 2: Right next to/through the heart (x in [-0.6, 0.6])
      if (x >= -0.6 && x <= 0.6) {
        const u = (x - -0.6) / 1.2;
        if (u > 0.18 && u < 0.29) y = Math.sin((u - 0.18) / 0.11 * Math.PI) * 0.18;
        else if (u >= 0.36 && u < 0.40) y = -Math.sin((u - 0.36) / 0.04 * Math.PI) * 0.15;
        else if (u >= 0.40 && u < 0.48) y = Math.sin((u - 0.40) / 0.08 * Math.PI) * 1.15; // Tallest R spike!
        else if (u >= 0.48 && u < 0.54) y = -Math.sin((u - 0.48) / 0.06 * Math.PI) * 0.52;
        else if (u >= 0.62 && u < 0.80) y = Math.sin((u - 0.62) / 0.18 * Math.PI) * 0.30;
      }

      // Complex 3: Exiting to the right (x in [1.2, 2.4])
      if (x >= 1.2 && x <= 2.4) {
        const u = (x - 1.2) / 1.2;
        if (u > 0.15 && u < 0.28) y = Math.sin((u - 0.15) / 0.13 * Math.PI) * 0.14;
        else if (u >= 0.35 && u < 0.39) y = -Math.sin((u - 0.35) / 0.04 * Math.PI) * 0.16;
        else if (u >= 0.39 && u < 0.47) y = Math.sin((u - 0.39) / 0.08 * Math.PI) * 0.88;
        else if (u >= 0.47 && u < 0.53) y = -Math.sin((u - 0.47) / 0.06 * Math.PI) * 0.42;
        else if (u >= 0.60 && u < 0.78) y = Math.sin((u - 0.60) / 0.18 * Math.PI) * 0.25;
      }

      ecgLinePoints.push(new THREE.Vector3(x, y - 0.02, 0.25));
    }

    const ecgGeo = new THREE.BufferGeometry().setFromPoints(ecgLinePoints);
    const ecgMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      linewidth: 2.5,
      transparent: true,
      opacity: 0.90,
      blending: THREE.AdditiveBlending,
    });
    const ecgLine = new THREE.Line(ecgGeo, ecgMat);
    scene.add(ecgLine);

    // Traveling Electrical ECG Pulse Bead
    const pulseBeadMat = new THREE.MeshBasicMaterial({
      color: 0xFFFFFF,
      blending: THREE.AdditiveBlending,
    });
    const pulseBead = new THREE.Mesh(new THREE.SphereGeometry(0.065, 16, 16), pulseBeadMat);
    scene.add(pulseBead);

    // ─── 10. Ambient Bioluminescent Background Micro-Particles ───
    const bgParticleCount = 45;
    const bgParticlePositions = new Float32Array(bgParticleCount * 3);
    for (let i = 0; i < bgParticleCount; i++) {
      bgParticlePositions[i * 3] = (Math.random() - 0.5) * 9;
      bgParticlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      bgParticlePositions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1.5;
    }
    const bgParticleGeo = new THREE.BufferGeometry();
    bgParticleGeo.setAttribute('position', new THREE.BufferAttribute(bgParticlePositions, 3));
    const bgParticleMat = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.04,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgParticles = new THREE.Points(bgParticleGeo, bgParticleMat);
    scene.add(bgParticles);

    // ─── 11. Mouse Tracking for Smooth Parallax Tilt ───
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1, Math.min(1, nx));
      mouse.targetY = Math.max(-1, Math.min(1, ny));
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── 12. Responsive Resize Observer ───
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 560;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ─── 13. Animation Loop with Physiological Lub-Dub Beat ───
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.001;

      // Mouse Parallax Damping
      mouse.x += (mouse.targetX - mouse.x) * 0.045;
      mouse.y += (mouse.targetY - mouse.y) * 0.045;

      // Subtle resting float + mouse parallax rotation
      heartRoot.rotation.y = mouse.x * 0.35 + Math.sin(elapsed * 0.6) * 0.05;
      heartRoot.rotation.x = -mouse.y * 0.25 + Math.cos(elapsed * 0.5) * 0.03;
      heartRoot.position.y = 0.08 + Math.sin(elapsed * 0.8) * 0.04;

      // ─── Physiological Anatomical Lub-Dub Heartbeat Rhythm ───
      const cycleDuration = 1.25;
      const t = (elapsed % cycleDuration) / cycleDuration; // 0 to 1

      let beatScale = 1.0;
      let emissiveIntensity = 0.20;
      let internalLightIntensity = 12.0;

      if (t < 0.12) {
        // Systole 1 "Lub": primary high-force ventricular contraction
        const p = t / 0.12;
        const s = Math.sin(p * Math.PI);
        beatScale = 1.0 + s * 0.13;
        emissiveIntensity = 0.20 + s * 0.85;
        internalLightIntensity = 12.0 + s * 18.0;
      } else if (t >= 0.16 && t < 0.28) {
        // Systole 2 "Dub": secondary aortic rebound snap
        const p = (t - 0.16) / 0.12;
        const s = Math.sin(p * Math.PI);
        beatScale = 1.0 + s * 0.07;
        emissiveIntensity = 0.20 + s * 0.55;
        internalLightIntensity = 12.0 + s * 10.0;
      } else {
        // Diastole: smooth relaxation & gentle breathing rest
        const p = (t - 0.28) / 0.72;
        beatScale = 1.0 + Math.sin(p * Math.PI * 2) * 0.012;
        emissiveIntensity = 0.20;
        internalLightIntensity = 12.0;
      }

      // Apply dynamic scale to heart meshes
      heartMesh.scale.set(beatScale, beatScale, beatScale);
      rimLineFront.scale.set(beatScale, beatScale, beatScale);
      rimLineBack.scale.set(beatScale, beatScale, beatScale);
      rimLineMid.scale.set(beatScale, beatScale, beatScale);
      innerParticles.scale.set(beatScale, beatScale, beatScale);
      webMesh.scale.set(beatScale, beatScale, beatScale);

      // Pulse emissive material glow and internal point light
      glassMaterial.emissiveIntensity = emissiveIntensity;
      heartInternalLight.intensity = internalLightIntensity;

      // ─── Orbiting Glint Beads on Gyroscopic Rings ───
      const glintAngle1 = (elapsed * 1.35) % (Math.PI * 2);
      glintBead1.position.set(
        Math.cos(glintAngle1) * ringRadiusX1,
        Math.sin(glintAngle1) * ringRadiusY1,
        0
      );

      const glintAngle2 = (elapsed * 1.15 + 1.8) % (Math.PI * 2);
      glintBead2.position.set(
        Math.cos(glintAngle2) * ringRadiusX2,
        Math.sin(glintAngle2) * ringRadiusY2,
        0
      );

      // ─── Animate Traveling ECG Pulse Bead ───
      const ecgSweepProgress = (elapsed % 2.4) / 2.4; // 0 to 1
      const ecgSampleIdx = Math.floor(ecgSweepProgress * totalEcgPts);
      const activeEcgPt = ecgLinePoints[Math.min(ecgSampleIdx, totalEcgPts)];
      if (activeEcgPt) {
        pulseBead.position.copy(activeEcgPt);
      }

      // Render Scene
      renderer.render(scene, camera);
    };

    animate();

    // ─── Cleanup on Unmount ───
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose Geometries and Materials cleanly
      heartGeometry.dispose();
      glassMaterial.dispose();
      rimGeometryFront.dispose();
      rimGeometryBack.dispose();
      rimGeometryMid.dispose();
      rimMaterialCore.dispose();
      rimMaterialGlow.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      webGeo.dispose();
      webMat.dispose();
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      glintSphereGeo.dispose();
      glintMat.dispose();
      ecgGeo.dispose();
      ecgMat.dispose();
      pulseBeadMat.dispose();
      bgParticleGeo.dispose();
      bgParticleMat.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[480px] lg:min-h-[560px] flex items-center justify-center select-none overflow-visible">
      <div
        ref={mountRef}
        className="w-full h-full min-h-[480px] lg:min-h-[560px] flex items-center justify-center"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
