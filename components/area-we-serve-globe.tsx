"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function AreaWeServeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);

  useEffect(() => {
    const loadGlobe = async () => {
      const script = document.createElement("script");
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      script.async = true;

      script.onload = () => {
        initGlobe();
      };

      document.body.appendChild(script);
    };

    loadGlobe();

    return () => {
      if (sceneRef.current?.renderer) {
        sceneRef.current.renderer.dispose();
      }
    };
  }, []);

  const latLngToXyz = (lat: number, lng: number, radius: number) => {
    const phi = (lat * Math.PI) / 180;
    const theta = ((lng + 180) * Math.PI) / 180;
    const x = -radius * Math.cos(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi);
    const z = radius * Math.cos(phi) * Math.sin(theta);
    return { x, y, z };
  };

  const initGlobe = () => {
    const canvasElement = document.getElementById("globe-canvas") as HTMLCanvasElement;
    if (!canvasElement) return;

    const THREE = (window as any).THREE;

    const GLOBE_RADIUS = 1.8;
    const AUTO_SPEED = 0.0008;
    const DRAG_SENSITIVITY = 0.005;
    const ZOOM_MIN = 3.4;
    const ZOOM_MAX = 7.0;
    const ZOOM_DEFAULT = 5.0;

    const currentLocations = [
      { name: "Tennessee, USA", lat: 36.2, lng: -86.8 },
      { name: "Nevada, USA", lat: 39.5, lng: -119.8 },
      { name: "North Carolina, USA", lat: 35.8, lng: -78.6 },
      { name: "Virginia, USA", lat: 37.5, lng: -77.4 },
      { name: "Michigan, USA", lat: 42.7, lng: -84.6 },
      { name: "Utah, USA", lat: 40.8, lng: -111.9 },
      { name: "Louisiana, USA", lat: 30.5, lng: -91.1 },
      { name: "Delaware, USA", lat: 39.2, lng: -75.5 },
      { name: "California, USA", lat: 38.6, lng: -121.5 },
      { name: "Idaho, USA", lat: 43.6, lng: -116.2 },
      { name: "Washington, USA", lat: 47.0, lng: -122.9 },
      { name: "Oregon, USA", lat: 44.9, lng: -123.0 },
      { name: "Minnesota, USA", lat: 44.9, lng: -93.1 },
      { name: "Wisconsin, USA", lat: 43.1, lng: -89.4 },
      { name: "Iowa, USA", lat: 41.6, lng: -93.6 },
      { name: "Illinois, USA", lat: 39.8, lng: -89.7 },
      { name: "Indiana, USA", lat: 39.8, lng: -86.2 },
      { name: "Ohio, USA", lat: 39.9, lng: -82.9 },
      { name: "Pennsylvania, USA", lat: 40.3, lng: -76.9 },
      { name: "New York, USA", lat: 42.7, lng: -73.8 },
      { name: "Connecticut, USA", lat: 41.8, lng: -72.7 },
      { name: "Massachusetts, USA", lat: 42.4, lng: -71.1 },
      { name: "Maryland, USA", lat: 38.9, lng: -76.5 },
      { name: "Florida, USA", lat: 30.4, lng: -84.3 },
      { name: "Arkansas, USA", lat: 34.7, lng: -92.3 },
      { name: "Colorado, USA", lat: 39.7, lng: -105.0 },
      { name: "Vermont, USA", lat: 44.3, lng: -72.6 },
      { name: "New Hampshire, USA", lat: 43.2, lng: -71.5 },
    ];

    const expansionLocations = [
      { name: "London, United Kingdom", lat: 51.5, lng: -0.1 },
      { name: "Berlin, Germany", lat: 52.5, lng: 13.4 },
      { name: "Dubai, UAE", lat: 25.2, lng: 55.3 },
      { name: "Riyadh, Saudi Arabia", lat: 24.7, lng: 46.7 },
      { name: "Sydney, Australia", lat: -33.9, lng: 151.2 },
      { name: "Ottawa, Canada", lat: 45.4, lng: -75.7 },
      { name: "Singapore", lat: 1.4, lng: 103.8 },
      { name: "Tokyo, Japan", lat: 35.7, lng: 139.7 },
      { name: "Abuja, Nigeria", lat: 9.1, lng: 7.5 },
      { name: "New Delhi, India", lat: 28.6, lng: 77.2 },
      { name: "Uman, Ukraine", lat: 48.7, lng: 30.2 },
    ];

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = ZOOM_DEFAULT;

    const renderer = new THREE.WebGLRenderer({ canvas: canvasElement, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.25;
    scene.add(globeGroup);

    // Globe core
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x030810 })
      )
    );

    // Globe surface
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x06101e, transparent: true, opacity: 0.9 })
      )
    );

    // Grid
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS + 0.001, 72, 36),
        new THREE.MeshBasicMaterial({
          color: 0x1a3555,
          wireframe: true,
          transparent: true,
          opacity: 0.05,
        })
      )
    );

    // Create pins
    const createPin = (location: any, isCurrent: boolean) => {
      const { x, y, z } = latLngToXyz(location.lat, location.lng, GLOBE_RADIUS);
      const pinGroup = new THREE.Group();
      pinGroup.position.set(x, y, z);

      if (isCurrent) {
        const geometry = new THREE.SphereGeometry(0.08, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xc9a84c });
        const sphere = new THREE.Mesh(geometry, material);
        pinGroup.add(sphere);

        const glowGeometry = new THREE.SphereGeometry(0.11, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xe8d5a0,
          transparent: true,
          opacity: 0.3,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        pinGroup.add(glow);
      } else {
        const geometry = new THREE.SphereGeometry(0.06, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: 0xd4b878,
          transparent: true,
          opacity: 0.7,
        });
        const sphere = new THREE.Mesh(geometry, material);
        pinGroup.add(sphere);
      }

      pinGroup.userData = { name: location.name, isCurrent };
      globeGroup.add(pinGroup);
      return pinGroup;
    };

    currentLocations.forEach((loc) => createPin(loc, true));
    expansionLocations.forEach((loc) => createPin(loc, false));

    // Interaction
    let isDragging = false;
    let prevMouse = { x: 0, y: 0 };
    let dragVel = 0;
    let isOverPin = false;
    let zoomTarget = ZOOM_DEFAULT;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouse.x = e.clientX;
      prevMouse.y = e.clientY;
      dragVel = 0;
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isOverPin) {
        const dx = e.clientX - prevMouse.x;
        const dy = e.clientY - prevMouse.y;
        globeGroup.rotation.y += dx * DRAG_SENSITIVITY;
        globeGroup.rotation.x += dy * DRAG_SENSITIVITY * 0.5;
        globeGroup.rotation.x = Math.max(-0.8, Math.min(0.8, globeGroup.rotation.x));
        dragVel = dx * DRAG_SENSITIVITY;
      }
      prevMouse.x = e.clientX;
      prevMouse.y = e.clientY;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      zoomTarget += e.deltaY * 0.003;
      zoomTarget = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, zoomTarget));
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    canvasElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvasElement.addEventListener("mousemove", handleMouseMove);
    canvasElement.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isOverPin && !isDragging) {
        dragVel *= 0.96;
        globeGroup.rotation.y += AUTO_SPEED + dragVel;
      }

      camera.position.z += (zoomTarget - camera.position.z) * 0.08;
      renderer.render(scene, camera);
    };

    animate();

    sceneRef.current = { renderer, camera, scene };
  };

  return (
    <>
      <SiteNav />
      <style>{`
        .globe-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #0a1628;
        }

        #globe-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -1;
          cursor: grab;
        }

        #globe-container:active {
          cursor: grabbing;
        }

        #globe-canvas {
          width: 100%;
          height: 100%;
          display: block;
        }

        .globe-section {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
        }

        .section-eyebrow {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 4px;
          text-transform: uppercase;
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          text-align: center;
        }

        .section-heading {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 300;
          color: #fff;
          margin-bottom: 16px;
          text-align: center;
          line-height: 1.15;
        }

        .section-subtext {
          font-size: 16px;
          color: rgba(232, 224, 208, 0.6);
          max-width: 560px;
          text-align: center;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .legend {
          display: flex;
          gap: 32px;
          margin-bottom: 24px;
          font-size: 13px;
          color: rgba(232, 224, 208, 0.5);
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .legend-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }

        .legend-dot.current {
          background: linear-gradient(145deg, #c9a84c, #e8d5a0);
          box-shadow: 0 0 10px rgba(201, 168, 76, 0.7);
        }

        .legend-dot.expansion {
          background: transparent;
          border: 1.5px solid #d4b878;
          box-shadow: 0 0 8px rgba(212, 184, 120, 0.4);
        }

        .zoom-hint {
          font-size: 12px;
          color: rgba(232, 224, 208, 0.25);
          margin-top: 12px;
          letter-spacing: 0.5px;
        }
      `}</style>

      <div className="globe-wrapper">
        <div id="globe-container">
          <canvas id="globe-canvas"></canvas>
        </div>

        <section className="globe-section">
          <div className="section-eyebrow">Areas We Serve</div>
          <h2 className="section-heading">Global Reach, Local Impact</h2>
          <p className="section-subtext">
            Delivering solutions across the U.S. and expanding our global footprint across
            industries and borders.
          </p>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-dot current"></div>
              <span>Current</span>
            </div>
            <div className="legend-item">
              <div className="legend-dot expansion"></div>
              <span>Expanding</span>
            </div>
          </div>

          <div className="zoom-hint">Scroll to zoom · Drag to rotate · Hover pins for details</div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
