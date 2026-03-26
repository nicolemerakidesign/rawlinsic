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
    if (!containerRef.current) return;

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

    const canvas = containerRef.current?.querySelector("canvas") as HTMLCanvasElement;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = ZOOM_DEFAULT;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    const globeGroup = new THREE.Group();
    globeGroup.rotation.x = 0.25;
    scene.add(globeGroup);

    // Globe layers
    globeGroup.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(GLOBE_RADIUS * 0.98, 64, 64),
        new THREE.MeshBasicMaterial({ color: 0x030810 })
      )
    );
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

        const glowGeometry = new THREE.SphereGeometry(0.1, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: 0xe8d5a0,
          transparent: true,
          opacity: 0.4,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        pinGroup.add(glow);
      } else {
        const geometry = new THREE.SphereGeometry(0.06, 16, 16);
        const material = new THREE.MeshBasicMaterial({
          color: 0xd4b878,
          transparent: true,
          opacity: 0.6,
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

    const handleMouseDown = () => {
      isDragging = true;
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

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    const handleResize = () => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        renderer.setSize(rect.width, rect.height);
        camera.aspect = rect.width / rect.height;
        camera.updateProjectionMatrix();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    // Animation
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);

      if (!isOverPin && !isDragging) {
        dragVel *= 0.96;
        globeGroup.rotation.y += AUTO_SPEED + dragVel;
      } else if (isOverPin) {
        dragVel = 0;
      }

      camera.position.z += (zoomTarget - camera.position.z) * 0.08;
      renderer.render(scene, camera);
    };

    animate();

    sceneRef.current = { scene, renderer, camera, globeGroup };
  };

  return (
    <>
      <SiteNav />
      <div className="w-full bg-slate-950">
        <div className="flex flex-col items-center justify-center w-full px-5 py-20">
          <div className="mb-6 text-sm font-medium tracking-widest text-center uppercase bg-gradient-to-r from-[#c9a84c] via-[#e8d5a0] to-[#d4b878] bg-clip-text text-transparent">
            Areas We Serve
          </div>
          <h1 className="mb-4 text-4xl font-light text-center text-white font-serif md:text-5xl">
            Global Reach, Local Impact
          </h1>
          <p className="mb-16 text-base text-center text-gray-400 max-w-2xl">
            Delivering solutions across the U.S. and expanding our global footprint across
            industries and borders.
          </p>

          <div className="flex gap-8 mb-8 text-xs font-medium tracking-wider text-center uppercase text-gray-500">
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: `linear-gradient(145deg, #c9a84c, #e8d5a0)`,
                  boxShadow: "0 0 10px rgba(201,168,76,0.7)",
                }}
              ></div>
              <span>Current</span>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-2.5 h-2.5 rounded-full border border-[#d4b878]"
                style={{ boxShadow: "0 0 8px rgba(212,184,120,0.4)" }}
              ></div>
              <span>Expanding</span>
            </div>
          </div>

          <div ref={containerRef} className="w-full max-w-3xl aspect-square">
            <canvas style={{ width: "100%", height: "100%" }}></canvas>
          </div>

          <p className="mt-6 text-xs text-center text-gray-600">
            Scroll to zoom · Drag to rotate
          </p>
        </div>
      </div>
      <SiteFooter />
    </>
  );
}
