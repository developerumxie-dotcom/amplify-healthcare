import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * AMPLIFY HEALTHCARE — SIGNATURE 3D PURE GLASS HEART WITH ENERGETIC NEON ECG
 * 
 * Refinements:
 * - Pure Crystal-Clear Transparent Glass Heart (high transmission, zero clutter)
 * - Removed internal complicated lines & wireframe web completely
 * - Removed animated glint beads & pulse balls
 * - Faster, energetic physiological "Lub-Dub" heartbeat (~75 bpm, snappy 0.8s cycle)
 * - Clean neon blue ECG cardiogram wave & dual sleek orbital rings
 * - Smooth mouse parallax tilt
 */
export default function HeroHeartVisual() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 560;
    let height = container.clientHeight || 560;

    // ─── 1. Scene, Camera & WebGL Renderer ───
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
    const ambientLight = new THREE.AmbientLight(0x011425, 2.2);
    scene.add(ambientLight);

    // Key Electric Cyan Specular Light
    const cyanKey = new THREE.PointLight(0x00E5FF, 15, 25);
    cyanKey.position.set(3.2, 2.6, 4.2);
    scene.add(cyanKey);

    // Fill Light
    const skyFill = new THREE.PointLight(0x0EA5E9, 10, 20);
    skyFill.position.set(-3.5, -2.0, 3.2);
    scene.add(skyFill);

    // Internal Heart Light (flashes on fast beat)
    const heartInternalLight = new THREE.PointLight(0x00E5FF, 14, 9);
    heartInternalLight.position.set(0, 0, 0.1);
    scene.add(heartInternalLight);

    // Back Rim Light for Glass Edge Refractions
    const rimLight = new THREE.PointLight(0x38BDF8, 16, 18);
    rimLight.position.set(0, 0.6, -3.2);
    scene.add(rimLight);

    // ─── 3. Heart Group (Root for Parallax & Beat) ───
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
    // Right lobe
    heartShape.bezierCurveTo(0.52, -0.72, 0.92, -0.28, 0.92, 0.18);
    heartShape.bezierCurveTo(0.92, 0.72, 0.24, 0.82, 0, 0.38);

    const extrudeSettings = {
      depth: 0.32,
      bevelEnabled: true,
      bevelSegments: 16,
      steps: 2,
      bevelSize: 0.15,
      bevelThickness: 0.15,
      curveSegments: 80,
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.center();

    // ─── 5. Pure Crystal-Clear Transparent Glass Material ───
    // Fully glassy, transparent, crystal refraction with subtle luminous blue tint
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(0x031B33),
      emissive: new THREE.Color(0x00E5FF),
      emissiveIntensity: 0.22,
      roughness: 0.02, // Ultra-slick, glossy glass surface
      metalness: 0.05,
      transmission: 0.98, // Pure glass transparency
      opacity: 0.35, // See-through crystal clarity
      transparent: true,
      depthWrite: false,
      ior: 1.54, // Refractive index of optical crown glass
      thickness: 0.75,
      specularIntensity: 1.0,
      specularColor: new THREE.Color(0xFFFFFF),
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
    });

    const heartMesh = new THREE.Mesh(heartGeometry, glassMaterial);
    heartRoot.add(heartMesh);

    // ─── 6. Neon Blue Outer Contour Rims (Crisp Glowing Borders) ───
    const rimPoints = heartShape.getSpacedPoints(220);

    // Front Rim
    const rimGeometryFront = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x, p.y, 0.23))
    );
    // Back Rim
    const rimGeometryBack = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x, p.y, -0.23))
    );
    // Middle Outer Halo
    const rimGeometryMid = new THREE.BufferGeometry().setFromPoints(
      rimPoints.map((p) => new THREE.Vector3(p.x * 1.02, p.y * 1.02, 0))
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
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });

    const rimLineFront = new THREE.Line(rimGeometryFront, rimMaterialCore);
    const rimLineBack = new THREE.Line(rimGeometryBack, rimMaterialCore);
    const rimLineMid = new THREE.Line(rimGeometryMid, rimMaterialGlow);
    heartRoot.add(rimLineFront);
    heartRoot.add(rimLineBack);
    heartRoot.add(rimLineMid);

    // ─── 7. Sleek Gyroscopic Neon Orbit Rings (No Balls) ───
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
      opacity: 0.50,
      blending: THREE.AdditiveBlending,
    });
    const ring1 = new THREE.Line(ringGeo1, ringMat);
    ringGroup1.add(ring1);

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

    // ─── 8. Neon Blue Horizontal ECG Heartbeat Line (No Balls) ───
    const ecgLinePoints = [];
    const totalEcgPts = 320;
    const ecgWidth = 8.6; // spans x = -4.3 to +4.3

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

      // Complex 2: Right across the heart foreground (x in [-0.6, 0.6])
      if (x >= -0.6 && x <= 0.6) {
        const u = (x - -0.6) / 1.2;
        if (u > 0.18 && u < 0.29) y = Math.sin((u - 0.18) / 0.11 * Math.PI) * 0.18;
        else if (u >= 0.36 && u < 0.40) y = -Math.sin((u - 0.36) / 0.04 * Math.PI) * 0.15;
        else if (u >= 0.40 && u < 0.48) y = Math.sin((u - 0.40) / 0.08 * Math.PI) * 1.15; // Tallest R spike
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

      ecgLinePoints.push(new THREE.Vector3(x, y - 0.02, 0.26));
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

    // Secondary Softer Glow Trace for Neon Bloom effect
    const ecgGlowMat = new THREE.LineBasicMaterial({
      color: 0x38BDF8,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.50,
      blending: THREE.AdditiveBlending,
    });
    const ecgGlowLine = new THREE.Line(ecgGeo, ecgGlowMat);
    ecgGlowLine.position.z = 0.24;
    scene.add(ecgGlowLine);

    // ─── 9. Minimal Atmospheric Micro-Particles ───
    const bgParticleCount = 28;
    const bgParticlePositions = new Float32Array(bgParticleCount * 3);
    for (let i = 0; i < bgParticleCount; i++) {
      bgParticlePositions[i * 3] = (Math.random() - 0.5) * 8;
      bgParticlePositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      bgParticlePositions[i * 3 + 2] = (Math.random() - 0.5) * 3 - 1.2;
    }
    const bgParticleGeo = new THREE.BufferGeometry();
    bgParticleGeo.setAttribute('position', new THREE.BufferAttribute(bgParticlePositions, 3));
    const bgParticleMat = new THREE.PointsMaterial({
      color: 0x38BDF8,
      size: 0.035,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const bgParticles = new THREE.Points(bgParticleGeo, bgParticleMat);
    scene.add(bgParticles);

    // ─── 10. Mouse Tracking for Smooth Parallax Tilt ───
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = Math.max(-1, Math.min(1, nx));
      mouse.targetY = Math.max(-1, Math.min(1, ny));
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ─── 11. Responsive Resize Observer ───
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 560;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // ─── 12. Fast, Snappy Physiological "Lub-Dub" Animation Loop ───
    let animationFrameId;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = (performance.now() - startTime) * 0.001;

      // Mouse Parallax Damping
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Subtle resting float + mouse parallax rotation
      heartRoot.rotation.y = mouse.x * 0.35 + Math.sin(elapsed * 0.9) * 0.04;
      heartRoot.rotation.x = -mouse.y * 0.25 + Math.cos(elapsed * 0.8) * 0.03;
      heartRoot.position.y = 0.08 + Math.sin(elapsed * 1.2) * 0.03;

      // ─── Fast Heartbeat Rhythm (75 bpm -> 0.80s cycle duration) ───
      const cycleDuration = 0.80; // Fast energetic pulse
      const t = (elapsed % cycleDuration) / cycleDuration; // 0 to 1

      let beatScale = 1.0;
      let emissiveIntensity = 0.22;
      let internalLightIntensity = 12.0;

      if (t < 0.10) {
        // Systole 1 "Lub": fast, powerful contraction (+14% scale)
        const p = t / 0.10;
        const s = Math.sin(p * Math.PI);
        beatScale = 1.0 + s * 0.14;
        emissiveIntensity = 0.22 + s * 0.95;
        internalLightIntensity = 12.0 + s * 20.0;
      } else if (t >= 0.14 && t < 0.24) {
        // Systole 2 "Dub": rapid rebound snap (+8% scale)
        const p = (t - 0.14) / 0.10;
        const s = Math.sin(p * Math.PI);
        beatScale = 1.0 + s * 0.08;
        emissiveIntensity = 0.22 + s * 0.65;
        internalLightIntensity = 12.0 + s * 14.0;
      } else {
        // Diastole: quick relaxation and brief rest before next beat
        const p = (t - 0.24) / 0.56;
        beatScale = 1.0 + Math.sin(p * Math.PI * 2) * 0.01;
        emissiveIntensity = 0.22;
        internalLightIntensity = 12.0;
      }

      // Apply fast energetic scale to pure glass heart & rims
      heartMesh.scale.set(beatScale, beatScale, beatScale);
      rimLineFront.scale.set(beatScale, beatScale, beatScale);
      rimLineBack.scale.set(beatScale, beatScale, beatScale);
      rimLineMid.scale.set(beatScale, beatScale, beatScale);

      // Pulse luminous emissive intensity and internal light in sync
      glassMaterial.emissiveIntensity = emissiveIntensity;
      heartInternalLight.intensity = internalLightIntensity;

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
      ringGeo1.dispose();
      ringGeo2.dispose();
      ringMat.dispose();
      ecgGeo.dispose();
      ecgMat.dispose();
      ecgGlowMat.dispose();
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
