import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import styles from './ClientLogoBar.module.css';

/**
 * AMPLIFY HEALTHCARE — "TRUSTED BY LEADING HOSPITALS & HEALTHCARE INSTITUTIONS"
 * STANDARD SIZE 3D LOGO STRIP MARQUEE ENGINE
 *
 * - Loads native 3D GLB model: /models/Amplify_Healthcare_Logo_Strip_Flat.glb
 * - 20 Healthcare institution logos in Brushed Steel extrusion
 * - Continuous playback of the 55-second 'Logo_Strip_Loop' kinetic animation
 * - Standard proportional sizing: logos occupy ~53% of the stage height with optimal breathing room
 * - Interactive horizontal scrubbing & touch/drag navigation with inertial momentum
 * - Subdued mouse hover parallax perspective tilt revealing 3D bevels
 * - Studio PBR environment reflections via RoomEnvironment
 * - Signature medical cyan specular rim lighting
 * - Zero cut-off lines with lateral soft gradient fading
 */
export default function ClientLogoBar() {
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  // Interaction & animation refs
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragVelocityRef = useRef(0);
  const lastDragTimeRef = useRef(0);
  const mixerRef = useRef(null);
  const actionRef = useRef(null);
  const targetTiltXRef = useRef(0);
  const targetTiltYRef = useRef(0);
  const currentTiltXRef = useRef(0);
  const currentTiltYRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDisposed = false;
    let animationFrameId = null;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 145;

    // ── 1. Scene, Camera & WebGL Renderer ──────────────────────────
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);

    const updateCameraDistance = (w, h) => {
      const aspect = w / h;
      const isMobile = w < 640;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      // Standard logo strip distance: visible height ~2.45, logos fill ~53% of strip height
      const dist = isMobile ? 4.8 : 4.5;
      camera.position.set(0, 0, dist);
      camera.lookAt(0, 0, 0);
    };

    updateCameraDistance(width, height);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // ── 2. Studio Environment & Metallic Reflections ───────────────
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;

    // ── 3. High-Precision Clinical Lighting Setup ──────────────────
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light — Studio Neutral White
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(4, 6, 8);
    scene.add(keyLight);

    // Specular Rim Light — Signature Electric Cyan
    const cyanRim = new THREE.DirectionalLight(0x00E5FF, 3.0);
    cyanRim.position.set(-6, 4, 6);
    scene.add(cyanRim);

    // Fill Light — Soft Clinical Sky Blue
    const skyFill = new THREE.DirectionalLight(0x38BDF8, 1.6);
    skyFill.position.set(6, -3, 5);
    scene.add(skyFill);

    // ── 4. 3D Model Group & Animation Mixer ────────────────────────
    const stripGroup = new THREE.Group();
    scene.add(stripGroup);

    const clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.load(
      '/models/Amplify_Healthcare_Logo_Strip_Flat.glb',
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;

        // Enhance material reflectivity and crisp clarity on flat steel gray meshes
        model.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.side = THREE.DoubleSide;
            child.material.color.setRGB(0.78, 0.84, 0.92);
            if (child.material.emissive) {
              child.material.emissive.setRGB(0.24, 0.28, 0.34);
              child.material.emissiveIntensity = 1.0;
            }
            child.material.envMapIntensity = 1.4;
            child.material.roughness = 0.28;
            child.material.metalness = 0.6;
            child.material.needsUpdate = true;
          }
        });

        stripGroup.add(model);

        // Bind & Play 55s Seamless Logo Strip Loop
        if (gltf.animations && gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          mixerRef.current = mixer;

          const clip =
            gltf.animations.find((a) => a.name === 'Logo_Strip_Loop') || gltf.animations[0];
          const action = mixer.clipAction(clip);
          action.play();
          actionRef.current = action;
        }

        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error('Failed to load 3D healthcare logo strip:', error);
        setIsLoading(false);
      }
    );

    // ── 5. Continuous 60/120Hz Animation Loop with Inertia ──────────
    const animate = () => {
      if (isDisposed) return;
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Handle user scrubbing inertia when released
      if (isDraggingRef.current) {
        // Dragging scrubs action.time directly
      } else {
        if (Math.abs(dragVelocityRef.current) > 0.001) {
          if (actionRef.current && mixerRef.current) {
            const duration = actionRef.current.getClip().duration || 54.96;
            let newTime = actionRef.current.time + dragVelocityRef.current;
            newTime = ((newTime % duration) + duration) % duration;
            actionRef.current.time = newTime;
            mixerRef.current.update(0);
          }
          dragVelocityRef.current *= 0.92; // Smooth inertial decay
        } else {
          if (mixerRef.current) {
            mixerRef.current.update(delta);
          }
        }
      }

      // Smooth parallax tilt interpolation
      currentTiltXRef.current += (targetTiltXRef.current - currentTiltXRef.current) * 0.08;
      currentTiltYRef.current += (targetTiltYRef.current - currentTiltYRef.current) * 0.08;

      // Apply subtle 3D parallax to reveal extruded metallic depth
      stripGroup.rotation.y = currentTiltYRef.current;
      stripGroup.rotation.x = currentTiltXRef.current;

      renderer.render(scene, camera);
    };

    animate();

    // ── 6. Resize Handler ──────────────────────────────────────────
    const handleResize = () => {
      if (!container || isDisposed) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 145;

      updateCameraDistance(width, height);
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // ── 7. Cleanup & Disposal ──────────────────────────────────────
    return () => {
      isDisposed = true;
      window.removeEventListener('resize', handleResize);

      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }

      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }

      scene.traverse((obj) => {
        if (obj.isMesh) {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        }
      });

      pmremGenerator.dispose();
      envTexture.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── 8. Interactive Drag / Swipe Event Listeners ────────────────────
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    dragStartXRef.current = clientX;
    dragVelocityRef.current = 0;
    lastDragTimeRef.current = performance.now();
  };

  const handlePointerMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    const clientX = e.clientX ?? (e.touches && e.touches[0].clientX) ?? 0;
    const clientY = e.clientY ?? (e.touches && e.touches[0].clientY) ?? 0;

    // Update hover parallax tilt if within container bounds
    if (rect) {
      const ndcX = ((clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = ((clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltYRef.current = ndcX * 0.12;
      targetTiltXRef.current = -ndcY * 0.06;
    }

    if (!isDraggingRef.current || !mixerRef.current || !actionRef.current) return;

    const deltaX = clientX - dragStartXRef.current;
    dragStartXRef.current = clientX;

    // Scrub animation time with pixel delta (smooth tactile feel)
    const duration = actionRef.current.getClip().duration || 54.96;
    const scrubFactor = 0.05; // seconds per pixel
    let newTime = actionRef.current.time - deltaX * scrubFactor;
    newTime = ((newTime % duration) + duration) % duration;
    actionRef.current.time = newTime;
    mixerRef.current.update(0);

    const now = performance.now();
    const dt = Math.max(1, now - lastDragTimeRef.current);
    dragVelocityRef.current = -(deltaX * scrubFactor) / (dt / 16.6);
    lastDragTimeRef.current = now;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerLeave = () => {
    isDraggingRef.current = false;
    targetTiltXRef.current = 0;
    targetTiltYRef.current = 0;
  };

  return (
    <section
      className={styles.curveSection}
      aria-label="Trusted by Leading Hospitals & Healthcare Institutions"
    >
      {/* Centered Minimalist Micro-Label in Steel Gray / Cyan Glow */}
      <div className={styles.labelContainer}>
        <div className={styles.badgeWrapper}>
          <span className={styles.pulseDot} />
          <span className={styles.microLabel}>
            TRUSTED BY OVER 20+ LEADING HOSPITALS &amp; HEALTHCARE INSTITUTIONS
          </span>
        </div>
      </div>

      {/* Standard Size 3D WebGL Canvas Stage */}
      <div
        className={styles.canvasStage}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerLeave}
        onTouchStart={handlePointerDown}
        onTouchMove={handlePointerMove}
        onTouchEnd={handlePointerUp}
      >
        <div ref={containerRef} className={styles.webglContainer} />

        {/* Loading Spinner */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner} />
            <span className={styles.loadingText}>Loading 3D Institution Strip...</span>
          </div>
        )}

      </div>
    </section>
  );
}
