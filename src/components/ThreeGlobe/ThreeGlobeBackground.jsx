import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';

// Helper: Convert Latitude & Longitude to 3D Cartesian coordinates on a sphere of radius R
function latLongToVector3(lat, lon, radius, alt = 0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const r = radius + alt;
  return new THREE.Vector3(
    -(r * Math.sin(phi) * Math.cos(theta)),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

// Generate smooth circular particle texture for antialiased glowing dots
function createCircleTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.35, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.75, 'rgba(255, 255, 255, 0.35)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(32, 32, 32, 0, Math.PI * 2);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// Major Tech Hubs
const HUBS = [
  { name: 'Jakarta (HQ)', lat: -6.2088, lon: 106.8456, isHQ: true },
  { name: 'Tokyo', lat: 35.6762, lon: 139.6503 },
  { name: 'Singapore', lat: 1.3521, lon: 103.8198 },
  { name: 'Hanoi', lat: 21.0285, lon: 105.8542 },
  { name: 'Sydney', lat: -33.8688, lon: 151.2093 },
  { name: 'Dubai', lat: 25.2048, lon: 55.2708 },
  { name: 'London', lat: 51.5074, lon: -0.1278 },
  { name: 'San Francisco', lat: 37.7749, lon: -122.4194 }
];

// Global Connectivity Routes connecting to Jakarta and partner tech hubs
const CONNECTIONS = [
  { from: 'Jakarta (HQ)', to: 'Tokyo' },
  { from: 'Jakarta (HQ)', to: 'Singapore' },
  { from: 'Jakarta (HQ)', to: 'Hanoi' },
  { from: 'Jakarta (HQ)', to: 'Sydney' },
  { from: 'Tokyo', to: 'San Francisco' },
  { from: 'Singapore', to: 'Dubai' },
  { from: 'Dubai', to: 'London' }
];

// High density continent bounding boxes
const CONTINENT_BOUNDS = [
  // Southeast Asia & Indonesia Archipelago
  { minLat: -11, maxLat: 15, minLon: 95, maxLon: 141, density: 750 },
  // Japan & East Asia
  { minLat: 31, maxLat: 46, minLon: 126, maxLon: 146, density: 450 },
  { minLat: 20, maxLat: 48, minLon: 75, maxLon: 125, density: 600 },
  // South Asia (India)
  { minLat: 8, maxLat: 35, minLon: 68, maxLon: 90, density: 400 },
  // Europe
  { minLat: 36, maxLat: 64, minLon: -10, maxLon: 42, density: 650 },
  // North America
  { minLat: 25, maxLat: 60, minLon: -125, maxLon: -70, density: 700 },
  // South America
  { minLat: -45, maxLat: 12, minLon: -78, maxLon: -35, density: 450 },
  // Africa
  { minLat: -34, maxLat: 36, minLon: -17, maxLon: 51, density: 550 },
  // Australia & New Zealand
  { minLat: -42, maxLat: -12, minLon: 114, maxLon: 175, density: 450 }
];

export const ThreeGlobeBackground = ({ className = '', interactive = true, isFixed = false }) => {
  const containerRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || (isFixed ? window.innerHeight : 750);

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 3, 24);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    container.appendChild(renderer.domElement);

    const circleTexture = createCircleTexture();

    // Root Group for the Globe
    const globeGroup = new THREE.Group();
    // Default tilt (Earth axial tilt ~23.5 degrees)
    globeGroup.rotation.x = 0.26;
    globeGroup.rotation.z = -0.1;
    
    // Position offset: slightly to the right on desktop for aesthetic balance with hero text
    const updateGlobePosition = () => {
      const isDesktop = window.innerWidth >= 1024;
      globeGroup.position.set(isDesktop ? 5.2 : 0, 0.5, 0);
    };
    updateGlobePosition();

    scene.add(globeGroup);

    const GLOBE_RADIUS = 8.5;

    // Palette Colors based on current theme
    const colors = isDark ? {
      core: 0x050c1e,
      coreEmissive: 0x0ea5e9,
      dots: 0x22d3ee,
      dotsSecondary: 0x38bdf8,
      atmosphere: 0x00f0ff,
      arcs: 0x38bdf8,
      beaconHQ: 0x10b981,
      beaconOther: 0x00f0ff,
      pulse: 0xffffff,
      rings: 0x0284c7,
      spaceDust: 0x38bdf8
    } : {
      core: 0xf0f9ff,
      coreEmissive: 0x38bdf8,
      dots: 0x0284c7,
      dotsSecondary: 0x2563eb,
      atmosphere: 0x38bdf8,
      arcs: 0x0284c7,
      beaconHQ: 0x059669,
      beaconOther: 0x0284c7,
      pulse: 0x0284c7,
      rings: 0x93c5fd,
      spaceDust: 0x60a5fa
    };

    // 2. Translucent Core Sphere with Fresnel rim
    const coreGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 0.985, 48, 48);
    const coreMat = new THREE.MeshPhongMaterial({
      color: colors.core,
      emissive: colors.coreEmissive,
      emissiveIntensity: isDark ? 0.15 : 0.08,
      transparent: true,
      opacity: isDark ? 0.85 : 0.5,
      shininess: 60
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    globeGroup.add(coreSphere);

    // 3. Latitude & Longitude Meridian Rings
    const ringsGroup = new THREE.Group();
    const ringMat = new THREE.LineBasicMaterial({
      color: colors.rings,
      transparent: true,
      opacity: isDark ? 0.22 : 0.28
    });

    [-60, -40, -20, 0, 20, 40, 60].forEach((lat) => {
      const radiusAtLat = GLOBE_RADIUS * Math.cos(lat * (Math.PI / 180));
      const y = GLOBE_RADIUS * Math.sin(lat * (Math.PI / 180));
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(radiusAtLat * Math.cos(theta), y, radiusAtLat * Math.sin(theta)));
      }
      ringGeo.setFromPoints(points);
      const ring = new THREE.Line(ringGeo, ringMat);
      ringsGroup.add(ring);
    });

    globeGroup.add(ringsGroup);

    // 4. Continents Point Cloud (Particle Matrix with Circular Glowing Texture)
    const allDotVertices = [];
    const allDotColors = [];
    const colorPrimary = new THREE.Color(colors.dots);
    const colorSecondary = new THREE.Color(colors.dotsSecondary);

    CONTINENT_BOUNDS.forEach((zone) => {
      for (let i = 0; i < zone.density; i++) {
        const lat = zone.minLat + Math.random() * (zone.maxLat - zone.minLat);
        const lon = zone.minLon + Math.random() * (zone.maxLon - zone.minLon);
        const vec = latLongToVector3(lat, lon, GLOBE_RADIUS, 0.06 + Math.random() * 0.08);
        allDotVertices.push(vec.x, vec.y, vec.z);

        const chosenColor = Math.random() > 0.35 ? colorPrimary : colorSecondary;
        allDotColors.push(chosenColor.r, chosenColor.g, chosenColor.b);
      }
    });

    // Subtle global grid dots for ocean matrix
    const baseSpherePoints = 1400;
    for (let i = 0; i < baseSpherePoints; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = GLOBE_RADIUS + 0.04;
      const sinPhi = Math.sin(phi);
      const x = r * sinPhi * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * sinPhi * Math.sin(theta);

      allDotVertices.push(x, y, z);
      const fadeColor = colorSecondary.clone().multiplyScalar(isDark ? 0.35 : 0.45);
      allDotColors.push(fadeColor.r, fadeColor.g, fadeColor.b);
    }

    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute('position', new THREE.Float32BufferAttribute(allDotVertices, 3));
    dotGeo.setAttribute('color', new THREE.Float32BufferAttribute(allDotColors, 3));

    const dotMat = new THREE.PointsMaterial({
      size: isDark ? 0.28 : 0.30,
      map: circleTexture,
      vertexColors: true,
      transparent: true,
      opacity: isDark ? 0.95 : 0.85,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false
    });
    const dotPoints = new THREE.Points(dotGeo, dotMat);
    globeGroup.add(dotPoints);

    // 5. City Hub Beacons & Pulsing Rings
    const beaconsGroup = new THREE.Group();
    const cityCoordsMap = {};

    HUBS.forEach((hub) => {
      const pos = latLongToVector3(hub.lat, hub.lon, GLOBE_RADIUS, 0.14);
      cityCoordsMap[hub.name] = pos;

      // Center glowing beacon sphere
      const beaconGeo = new THREE.SphereGeometry(hub.isHQ ? 0.26 : 0.18, 16, 16);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? colors.beaconHQ : colors.beaconOther
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.copy(pos);
      beaconsGroup.add(beaconMesh);

      // Outer radar pulse ring
      const ringGeo = new THREE.RingGeometry(0.24, 0.42, 24);
      const ringMatBeacon = new THREE.MeshBasicMaterial({
        color: hub.isHQ ? colors.beaconHQ : colors.beaconOther,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: hub.isHQ ? 0.85 : 0.6
      });
      const rippleRing = new THREE.Mesh(ringGeo, ringMatBeacon);
      rippleRing.position.copy(pos);
      rippleRing.lookAt(new THREE.Vector3(0, 0, 0));
      rippleRing.userData = {
        baseScale: 1,
        isHQ: hub.isHQ
      };
      beaconsGroup.add(rippleRing);
    });

    globeGroup.add(beaconsGroup);

    // 6. Connecting Flight & Network Arcs with Animated Pulses
    const arcsGroup = new THREE.Group();

    CONNECTIONS.forEach((conn) => {
      const p1 = cityCoordsMap[conn.from];
      const p2 = cityCoordsMap[conn.to];
      if (!p1 || !p2) return;

      const dist = p1.distanceTo(p2);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const elevation = GLOBE_RADIUS + dist * 0.32;
      mid.normalize().multiplyScalar(elevation);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(50);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const curveMat = new THREE.LineBasicMaterial({
        color: colors.arcs,
        transparent: true,
        opacity: isDark ? 0.55 : 0.45,
        linewidth: 2
      });
      const arcLine = new THREE.Line(curveGeo, curveMat);
      arcsGroup.add(arcLine);

      // Traveling Light Pulse on the curve
      const pulseGeo = new THREE.SphereGeometry(0.18, 12, 12);
      const pulseMat = new THREE.MeshBasicMaterial({
        color: colors.pulse,
        transparent: true,
        opacity: 0.95
      });
      const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
      pulseMesh.userData = {
        curve,
        progress: Math.random(),
        speed: 0.0035 + Math.random() * 0.003
      };
      arcsGroup.add(pulseMesh);
    });

    globeGroup.add(arcsGroup);

    // 7. Outer Atmospheric Glowing Halo Shell
    const atmoGeo = new THREE.SphereGeometry(GLOBE_RADIUS * 1.12, 48, 48);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: colors.atmosphere,
      transparent: true,
      opacity: isDark ? 0.16 : 0.10,
      side: THREE.BackSide,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending
    });
    const atmoMesh = new THREE.Mesh(atmoGeo, atmoMat);
    globeGroup.add(atmoMesh);

    // 8. Cosmic Background Ambient Tech Dust
    const spaceDustCount = 500;
    const spaceDustGeo = new THREE.BufferGeometry();
    const spaceDustPositions = [];
    for (let i = 0; i < spaceDustCount; i++) {
      const x = (Math.random() - 0.5) * 65;
      const y = (Math.random() - 0.5) * 50;
      const z = (Math.random() - 0.5) * 35 - 5;
      spaceDustPositions.push(x, y, z);
    }
    spaceDustGeo.setAttribute('position', new THREE.Float32BufferAttribute(spaceDustPositions, 3));
    const spaceDustMat = new THREE.PointsMaterial({
      size: 0.22,
      map: circleTexture,
      color: colors.spaceDust,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3,
      blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
      depthWrite: false
    });
    const spaceDust = new THREE.Points(spaceDustGeo, spaceDustMat);
    scene.add(spaceDust);

    // 9. Scene Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 1.1 : 1.3);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, isDark ? 1.8 : 1.1);
    dirLight1.position.set(15, 20, 20);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x818cf8, isDark ? 1.0 : 0.6);
    dirLight2.position.set(-20, -10, -10);
    scene.add(dirLight2);

    // 10. Mouse Interaction & Inertial Dragging
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let targetRotationY = 0.8; // Pre-rotated so Indonesia / Asia faces front on start
    let targetRotationX = 0.26;
    let mouseParallaxX = 0;
    let mouseParallaxY = 0;

    const handlePointerDown = (e) => {
      if (!interactive) return;
      const target = e.target;
      if (target && target.closest && target.closest('button, a, input, textarea, select, [role="button"], form, nav, .interactive-ui')) {
        return;
      }
      isDragging = true;
      previousPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      previousPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    };

    const handlePointerMove = (e) => {
      const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

      // Subtle mouse parallax
      const normalizedX = (clientX / window.innerWidth) * 2 - 1;
      const normalizedY = -(clientY / window.innerHeight) * 2 + 1;
      mouseParallaxX = normalizedX * 0.35;
      mouseParallaxY = normalizedY * 0.2;

      if (!isDragging || !interactive) return;

      const deltaX = clientX - previousPointerX;
      const deltaY = clientY - previousPointerY;

      targetRotationY += deltaX * 0.005;
      targetRotationX += deltaY * 0.005;

      targetRotationX = Math.max(-0.8, Math.min(0.8, targetRotationX));

      previousPointerX = clientX;
      previousPointerY = clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    if (interactive) {
      window.addEventListener('mousedown', handlePointerDown);
      window.addEventListener('mousemove', handlePointerMove);
      window.addEventListener('mouseup', handlePointerUp);
      window.addEventListener('touchstart', handlePointerDown, { passive: true });
      window.addEventListener('touchmove', handlePointerMove, { passive: true });
      window.addEventListener('touchend', handlePointerUp);
    }

    // Scroll Handler for continuous scroll response
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      
      // Rotate the globe proportionally when user scrolls
      targetRotationY += deltaY * 0.0018;

      if (isFixed) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        const scrollProgress = Math.min(1, Math.max(0, currentScrollY / maxScroll));
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop) {
          // Keep globe beautifully composed on the right, shifting slightly with depth
          globeGroup.position.x = 5.2 - scrollProgress * 1.5;
          globeGroup.position.z = -scrollProgress * 2.5;
        } else {
          // On mobile, gently float in center
          globeGroup.position.z = -scrollProgress * 3.0;
        }
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // 11. Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || (isFixed ? window.innerHeight : 750);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateGlobePosition();
    };
    window.addEventListener('resize', handleResize);

    // 12. Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous auto-rotation when not dragging
      if (!isDragging) {
        targetRotationY += 0.0022;
      }

      // Smooth inertia interpolation (lerp)
      globeGroup.rotation.y += (targetRotationY - globeGroup.rotation.y) * 0.05;
      globeGroup.rotation.x += (targetRotationX + mouseParallaxY - globeGroup.rotation.x) * 0.05;
      globeGroup.position.y = 0.5 + Math.sin(elapsedTime * 0.8) * 0.15; // subtle hovering breath

      // Animate pulsing city beacons
      beaconsGroup.children.forEach((child) => {
        if (child.userData && child.userData.baseScale) {
          const pulseFrequency = child.userData.isHQ ? 3.5 : 2.5;
          const scale = 1 + 0.45 * Math.sin(elapsedTime * pulseFrequency);
          child.scale.set(scale, scale, 1);
        }
      });

      // Animate light pulses moving along connection arcs
      arcsGroup.children.forEach((child) => {
        if (child.userData && child.userData.curve) {
          child.userData.progress = (child.userData.progress + child.userData.speed) % 1;
          const currentPoint = child.userData.curve.getPoint(child.userData.progress);
          child.position.copy(currentPoint);
        }
      });

      // Slowly rotate space dust
      spaceDust.rotation.y = elapsedTime * 0.012;
      spaceDust.rotation.x = elapsedTime * 0.006;

      renderer.render(scene, camera);
    };

    animate();

    // 13. Cleanup on Component Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);

      if (interactive) {
        window.removeEventListener('mousedown', handlePointerDown);
        window.removeEventListener('mousemove', handlePointerMove);
        window.removeEventListener('mouseup', handlePointerUp);
        window.removeEventListener('touchstart', handlePointerDown);
        window.removeEventListener('touchmove', handlePointerMove);
        window.removeEventListener('touchend', handlePointerUp);
      }

      // Dispose Three.js objects
      circleTexture.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringMat.dispose();
      dotGeo.dispose();
      dotMat.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      spaceDustGeo.dispose();
      spaceDustMat.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark, interactive, isFixed]);

  return (
    <div
      ref={containerRef}
      className={`${isFixed ? 'fixed inset-0 pointer-events-none' : 'absolute inset-0 pointer-events-auto'} select-none overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};

export default ThreeGlobeBackground;
