"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function AreaWeServeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const ringXRef = useRef(0);
  const ringYRef = useRef(0);
  const animFrame = useRef<number | null>(null);

  /* ── Custom cursor ── */
  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;
    const onMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
      dot.style.left = e.clientX - 4 + "px";
      dot.style.top = e.clientY - 4 + "px";
    };
    const animateRing = () => {
      ringXRef.current += (mouseX.current - ringXRef.current) * 0.12;
      ringYRef.current += (mouseY.current - ringYRef.current) * 0.12;
      ring.style.left = ringXRef.current - 20 + "px";
      ring.style.top = ringYRef.current - 20 + "px";
      animFrame.current = requestAnimationFrame(animateRing);
    };
    document.addEventListener("mousemove", onMouseMove);
    animFrame.current = requestAnimationFrame(animateRing);
    const hoverEls = document.querySelectorAll("a, button, .nav-item, .back-to-top");
    hoverEls.forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("hover"));
    });
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  /* ── Nav scroll + back-to-top ── */
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const backToTop = document.getElementById("backToTop");
    const onScroll = () => {
      if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
      if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // run once
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Micro particles ── */
  useEffect(() => {
    const container = document.getElementById("microParticles");
    if (!container) return;
    for (let i = 0; i < 15; i++) {
      const p = document.createElement("div");
      p.className = "micro-particle";
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 8 + Math.random() * 14 + "s";
      p.style.animationDelay = Math.random() * 12 + "s";
      const size = 1.5 + Math.random() * 2.5 + "px";
      p.style.width = size;
      p.style.height = size;
      p.style.opacity = String(0.15 + Math.random() * 0.25);
      container.appendChild(p);
    }
    return () => { container.innerHTML = ""; };
  }, []);

  /* ── Globe (deferred to reduce TBT) ── */
  const [globeReady, setGlobeReady] = useState(false);
  useEffect(() => {
    const loadGlobe = () => {
      const threeScript = document.createElement("script");
      threeScript.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
      threeScript.async = true;
      const topoScript = document.createElement("script");
      topoScript.src = "https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js";
      topoScript.async = true;

      let loaded = 0;
      const onBothLoaded = () => { loaded++; if (loaded === 2) { setGlobeReady(true); initGlobe(); } };
      threeScript.onload = onBothLoaded;
      topoScript.onload = onBothLoaded;
      document.body.appendChild(threeScript);
      document.body.appendChild(topoScript);
    };
    // Defer globe loading to after first paint
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(loadGlobe, { timeout: 2000 });
    } else {
      setTimeout(loadGlobe, 100);
    }
  }, []);

  const initGlobe = () => {
    const T = (window as any).THREE;
    const container = document.getElementById("globe-container");
    const canvas = document.getElementById("globe-canvas") as HTMLCanvasElement;
    const tooltip = document.getElementById("globe-tooltip") as HTMLDivElement;
    if (!container || !canvas || !tooltip) return;

    const GLOBE_RADIUS = 1.8;
    const AUTO_SPEED = 0.0008;
    const DRAG_SENSITIVITY = 0.005;
    const ZOOM_MIN = 3.4;
    const ZOOM_MAX = 7.0;
    const ZOOM_DEFAULT = 5.8;
    const GOLD_LIGHT = 0xf0dca8;
    const GOLD_MID = 0xc9a84c;
    const GOLD_DEEP = 0xb8963e;

    const currentLocations = [
      { name: "Tennessee, USA", lat: 36.2, lng: -86.8, slug: "tennessee" },
      { name: "Nevada, USA", lat: 39.5, lng: -119.8, slug: "nevada" },
      { name: "North Carolina, USA", lat: 35.8, lng: -78.6, slug: "north-carolina" },
      { name: "Virginia, USA", lat: 37.5, lng: -77.4, slug: "virginia" },
      { name: "Michigan, USA", lat: 42.7, lng: -84.6, slug: "michigan" },
      { name: "Utah, USA", lat: 40.8, lng: -111.9, slug: "utah" },
      { name: "Louisiana, USA", lat: 30.5, lng: -91.1, slug: "louisiana" },
      { name: "Delaware, USA", lat: 39.2, lng: -75.5, slug: "delaware" },
      { name: "California, USA", lat: 38.6, lng: -121.5, slug: "" },
      { name: "Idaho, USA", lat: 43.6, lng: -116.2, slug: "" },
      { name: "Washington, USA", lat: 47.0, lng: -122.9, slug: "" },
      { name: "Oregon, USA", lat: 44.9, lng: -123.0, slug: "" },
      { name: "Minnesota, USA", lat: 44.9, lng: -93.1, slug: "" },
      { name: "Wisconsin, USA", lat: 43.1, lng: -89.4, slug: "" },
      { name: "Iowa, USA", lat: 41.6, lng: -93.6, slug: "" },
      { name: "Illinois, USA", lat: 39.8, lng: -89.7, slug: "" },
      { name: "Indiana, USA", lat: 39.8, lng: -86.2, slug: "" },
      { name: "Ohio, USA", lat: 39.9, lng: -82.9, slug: "" },
      { name: "Pennsylvania, USA", lat: 40.3, lng: -76.9, slug: "" },
      { name: "New York, USA", lat: 42.7, lng: -73.8, slug: "" },
      { name: "Connecticut, USA", lat: 41.8, lng: -72.7, slug: "" },
      { name: "Massachusetts, USA", lat: 42.4, lng: -71.1, slug: "" },
      { name: "Maryland, USA", lat: 38.9, lng: -76.5, slug: "" },
      { name: "Florida, USA", lat: 30.4, lng: -84.3, slug: "" },
      { name: "Arkansas, USA", lat: 34.7, lng: -92.3, slug: "" },
      { name: "Colorado, USA", lat: 39.7, lng: -105.0, slug: "" },
      { name: "Vermont, USA", lat: 44.3, lng: -72.6, slug: "" },
      { name: "New Hampshire, USA", lat: 43.2, lng: -71.5, slug: "" },
    ];

    const expansionLocations = [
      { name: "Dubai, United Arab Emirates", lat: 25.2, lng: 55.3, slug: "" },
      { name: "Ottawa, Canada", lat: 45.4, lng: -75.7, slug: "" },
      { name: "Oman, Middle East", lat: 23.6, lng: 58.5, slug: "" },
      { name: "Barbados, Caribbean", lat: 13.2, lng: -59.5, slug: "" },
    ];

    // Device check for performance tuning
    const isMobile = window.innerWidth <= 768;

    // Scene
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = ZOOM_DEFAULT;
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    const globeGroup = new T.Group();
    globeGroup.rotation.x = 0.25;
    scene.add(globeGroup);

    // Globe layers
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS * 0.98, 64, 64),
      new T.MeshBasicMaterial({ color: 0x030810 })
    ));
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS, 64, 64),
      new T.MeshBasicMaterial({ color: 0x06101e, transparent: true, opacity: 0.9 })
    ));
    // Grids
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS + 0.001, 72, 36),
      new T.MeshBasicMaterial({ color: 0x1a3555, wireframe: true, transparent: true, opacity: 0.05 })
    ));
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS + 0.003, 24, 12),
      new T.MeshBasicMaterial({ color: 0x1e4a6e, wireframe: true, transparent: true, opacity: 0.08 })
    ));
    // Atmospheres
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS + 0.04, 64, 64),
      new T.MeshBasicMaterial({ color: GOLD_DEEP, transparent: true, opacity: 0.04, side: T.BackSide })
    ));
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS + 0.15, 64, 64),
      new T.MeshBasicMaterial({ color: 0x2a5a8e, transparent: true, opacity: 0.06, side: T.BackSide })
    ));
    globeGroup.add(new T.Mesh(
      new T.SphereGeometry(GLOBE_RADIUS + 0.25, 64, 64),
      new T.MeshBasicMaterial({ color: 0x1a3a60, transparent: true, opacity: 0.03, side: T.BackSide })
    ));

    // Particles — fewer on mobile for performance
    const pCount = isMobile ? 500 : 1500;
    const pGeo = new T.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = GLOBE_RADIUS + 0.3 + Math.random() * 2.5;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPos[i*3] = r*Math.sin(ph)*Math.cos(th);
      pPos[i*3+1] = r*Math.sin(ph)*Math.sin(th);
      pPos[i*3+2] = r*Math.cos(ph);
      if (Math.random() < 0.2) { pCol[i*3]=0.78; pCol[i*3+1]=0.66; pCol[i*3+2]=0.3; }
      else { pCol[i*3]=0.22; pCol[i*3+1]=0.42; pCol[i*3+2]=0.62; }
    }
    pGeo.setAttribute("position", new T.BufferAttribute(pPos, 3));
    pGeo.setAttribute("color", new T.BufferAttribute(pCol, 3));
    const particles = new T.Points(pGeo, new T.PointsMaterial({
      size: 0.014, transparent: true, opacity: 0.35, sizeAttenuation: true, vertexColors: true
    }));
    scene.add(particles);

    // Orbital rings
    function makeRing(r: number, tx: number, tz: number, op: number, col?: number) {
      const g = new T.RingGeometry(r-0.003, r+0.003, 128);
      const m = new T.MeshBasicMaterial({ color: col||0x2a5a8e, transparent:true, opacity:op, side:T.DoubleSide });
      const ring = new T.Mesh(g, m);
      ring.rotation.x = tx; ring.rotation.z = tz;
      return ring;
    }
    const ring1 = makeRing(GLOBE_RADIUS+0.25, Math.PI/2+0.3, 0.15, 0.07);
    const ring2 = makeRing(GLOBE_RADIUS+0.35, Math.PI/2-0.2, -0.4, 0.05);
    const ring3 = makeRing(GLOBE_RADIUS+0.18, Math.PI/2+0.5, 0.6, 0.04);
    const ring4 = makeRing(GLOBE_RADIUS+0.42, Math.PI/2-0.1, 0.3, 0.04, GOLD_DEEP);
    globeGroup.add(ring1, ring2, ring3, ring4);

    // Helper: lat/lng to Vector3
    function ll2v(lat: number, lng: number, r: number) {
      const p = (90-lat)*(Math.PI/180), t = (lng+180)*(Math.PI/180);
      return new T.Vector3(-(r*Math.sin(p)*Math.cos(t)), r*Math.cos(p), r*Math.sin(p)*Math.sin(t));
    }

    // Load accurate continent/country outlines from Natural Earth TopoJSON
    const topojson = (window as any).topojson;
    fetch("https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json")
      .then(r => r.json())
      .then(world => {
        const land = topojson.feature(world, world.objects.land);
        const olMat = new T.LineBasicMaterial({ color: 0x4a98cc, transparent: true, opacity: 0.6 });
        const fillArr: any[] = [];
        const eDots: any[] = [];

        land.features.forEach((feat: any) => {
          const geom = feat.geometry;
          const rings = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;

          rings.forEach((polygon: number[][][]) => {
            polygon.forEach((ring: number[][]) => {
              // Outline
              const pts = ring.map(([lng, lat]: number[]) => ll2v(lat, lng, GLOBE_RADIUS + 0.006));
              if (pts.length > 2) {
                globeGroup.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), olMat));
              }
              // Edge dots along outlines
              for (let i = 0; i < ring.length - 1; i++) {
                const [ln1, la1] = ring[i], [ln2, la2] = ring[i + 1];
                for (let s = 0; s <= 2; s++) {
                  const t = s / 2;
                  eDots.push(ll2v(la1 + (la2 - la1) * t, ln1 + (ln2 - ln1) * t, GLOBE_RADIUS + 0.008));
                }
              }
            });
          });
        });

        // Edge dots
        if (eDots.length > 0) {
          const eGeo = new T.BufferGeometry();
          const ePos = new Float32Array(eDots.length * 3);
          eDots.forEach((v: any, i: number) => { ePos[i*3]=v.x; ePos[i*3+1]=v.y; ePos[i*3+2]=v.z; });
          eGeo.setAttribute("position", new T.BufferAttribute(ePos, 3));
          globeGroup.add(new T.Points(eGeo, new T.PointsMaterial({
            color: 0x5aaddd, size: 0.01, transparent: true, opacity: 0.55, sizeAttenuation: true
          })));
        }

        // Dense fill dots inside land — coarser on mobile
        const STEP = isMobile ? 3.5 : 2.0;
        land.features.forEach((feat: any) => {
          const geom = feat.geometry;
          const rings = geom.type === "Polygon" ? [geom.coordinates] : geom.coordinates;
          rings.forEach((polygon: number[][][]) => {
            const outer = polygon[0];
            if (!outer || outer.length < 3) return;
            let mnLa=90,mxLa=-90,mnLn=180,mxLn=-180;
            outer.forEach(([ln,la]: number[]) => { if(la<mnLa)mnLa=la; if(la>mxLa)mxLa=la; if(ln<mnLn)mnLn=ln; if(ln>mxLn)mxLn=ln; });
            for (let la=mnLa; la<=mxLa; la+=STEP) {
              for (let ln=mnLn; ln<=mxLn; ln+=STEP) {
                if (pipGeo(la, ln, outer)) fillArr.push(ll2v(la, ln, GLOBE_RADIUS + 0.005));
              }
            }
          });
        });

        if (fillArr.length > 0) {
          const fGeo = new T.BufferGeometry();
          const fPos = new Float32Array(fillArr.length * 3);
          fillArr.forEach((v: any, i: number) => { fPos[i*3]=v.x; fPos[i*3+1]=v.y; fPos[i*3+2]=v.z; });
          fGeo.setAttribute("position", new T.BufferAttribute(fPos, 3));
          globeGroup.add(new T.Points(fGeo, new T.PointsMaterial({
            color: 0x1e6a9e, size: 0.02, transparent: true, opacity: 0.45, sizeAttenuation: true
          })));
        }
      });

    // Point-in-polygon for GeoJSON (lng,lat coords)
    function pipGeo(tLat: number, tLng: number, ring: number[][]) {
      let inside = false;
      for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        const [xi, yi] = ring[i], [xj, yj] = ring[j];
        if (((yi > tLat) !== (yj > tLat)) && (tLng < (xj - xi) * (tLat - yi) / (yj - yi) + xi)) inside = !inside;
      }
      return inside;
    }

    // Latitude scan lines
    for(let lat=-60;lat<=70;lat+=20){
      const pts: any[]=[];
      for(let lng=-180;lng<=180;lng+=5) pts.push(ll2v(lat,lng,GLOBE_RADIUS+0.012));
      globeGroup.add(new T.Line(
        new T.BufferGeometry().setFromPoints(pts),
        new T.LineBasicMaterial({color:GOLD_DEEP,transparent:true,opacity:0.03})
      ));
    }

    // Connection arcs
    function makeArc(l1: any,l2: any){
      const s=ll2v(l1.lat,l1.lng,GLOBE_RADIUS+0.01),e=ll2v(l2.lat,l2.lng,GLOBE_RADIUS+0.01);
      const m=s.clone().add(e).multiplyScalar(0.5);
      m.normalize().multiplyScalar(GLOBE_RADIUS+0.15+s.distanceTo(e)*0.12);
      const pts=new T.QuadraticBezierCurve3(s,m,e).getPoints(24);
      return new T.Line(
        new T.BufferGeometry().setFromPoints(pts),
        new T.LineBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.08})
      );
    }
    [[0,1],[0,3],[1,5],[2,3],[4,13],[7,18],[9,11],[20,21],[14,15],[5,25],[23,6],[16,17],[19,20],[12,13]].forEach(([a,b])=>{
      if(currentLocations[a]&&currentLocations[b]) globeGroup.add(makeArc(currentLocations[a],currentLocations[b]));
    });

    // Pins
    const pinObjects: any[] = [];
    const raycaster = new T.Raycaster();
    const mouse = new T.Vector2();

    function createPin(loc: any, isCurrent: boolean) {
      const pos = ll2v(loc.lat, loc.lng, GLOBE_RADIUS);
      const g = new T.Group();

      if (isCurrent) {
        g.add(new T.Mesh(new T.SphereGeometry(0.025,32,32), new T.MeshBasicMaterial({color:GOLD_LIGHT})));
        const glow = new T.Mesh(new T.SphereGeometry(0.055,32,32), new T.MeshBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.2}));
        g.add(glow); g.userData.glow = glow;
        const pulse = new T.Mesh(new T.RingGeometry(0.06,0.08,48), new T.MeshBasicMaterial({color:GOLD_LIGHT,transparent:true,opacity:0.12,side:T.DoubleSide}));
        pulse.lookAt(pos.clone().multiplyScalar(2)); g.add(pulse); g.userData.pulse = pulse;
        const beam = new T.Mesh(new T.CylinderGeometry(0.002,0.002,0.1,4), new T.MeshBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.35}));
        beam.lookAt(pos.clone().multiplyScalar(2)); beam.rotateX(Math.PI/2);
        beam.position.copy(pos.clone().normalize().multiplyScalar(0.05)); g.add(beam);
      } else {
        // Expanding pins: hollow ring style (no solid center) to differentiate from current
        const innerRing = new T.Mesh(new T.RingGeometry(0.018,0.025,48), new T.MeshBasicMaterial({color:GOLD_LIGHT,transparent:true,opacity:0.7,side:T.DoubleSide}));
        innerRing.lookAt(pos.clone().multiplyScalar(2)); g.add(innerRing);
        const midRing = new T.Mesh(new T.RingGeometry(0.04,0.048,48), new T.MeshBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.35,side:T.DoubleSide}));
        midRing.lookAt(pos.clone().multiplyScalar(2)); g.add(midRing); g.userData.pulse = midRing;
        const outer = new T.Mesh(new T.RingGeometry(0.065,0.072,48), new T.MeshBasicMaterial({color:GOLD_DEEP,transparent:true,opacity:0.15,side:T.DoubleSide}));
        outer.lookAt(pos.clone().multiplyScalar(2)); g.add(outer); g.userData.outerRing = outer;
        const glow = new T.Mesh(new T.SphereGeometry(0.08,32,32), new T.MeshBasicMaterial({color:GOLD_DEEP,transparent:true,opacity:0.08}));
        g.add(glow); g.userData.glow = glow;
      }

      g.position.copy(pos);
      g.userData.name = loc.name;
      g.userData.isCurrent = isCurrent;
      g.userData.slug = loc.slug || "";
      globeGroup.add(g);

      const hit = new T.Mesh(new T.SphereGeometry(0.08,8,8), new T.MeshBasicMaterial({visible:false}));
      hit.position.copy(pos); hit.userData = g.userData;
      globeGroup.add(hit); pinObjects.push(hit);
      return g;
    }

    const cPins = currentLocations.map(l=>createPin(l,true));
    const ePins = expansionLocations.map(l=>createPin(l,false));

    // Interaction
    let isDragging=false, prevMouse={x:0,y:0}, dragVel=0, isOverPin=false, zoomTarget=ZOOM_DEFAULT;
    let activePin: any = null;
    let isOverTooltip = false; // mouse is inside the tooltip card
    let hideTimer: any = null; // delay before hiding tooltip
    // Track whether globe is at max zoom-out, to allow page scroll
    let atMaxZoomOut = false;

    function showTooltip(d: any, sx: number, sy: number) {
      if(hideTimer){ clearTimeout(hideTimer); hideTimer=null; }
      const linkHtml = d.slug ? '<a href="/insights/case-studies/'+d.slug+'" class="tooltip-link">View Case Study &rarr;</a>' : '';
      const closeBtn = d.slug ? '<button class="tooltip-close" id="tooltip-close-btn">&times;</button>' : '';
      tooltip.innerHTML='<div class="tooltip-header"><div><span class="tooltip-label">'+(d.isCurrent?"Active":"Expanding")+'</span><span class="tooltip-name">'+d.name+'</span></div>'+closeBtn+'</div>'+linkHtml;
      tooltip.style.left=sx+"px"; tooltip.style.top=sy+"px";
      tooltip.className="globe-tooltip visible active-location";
      // Attach close handler
      const closeEl = document.getElementById("tooltip-close-btn");
      if(closeEl) closeEl.addEventListener("click",(e)=>{ e.stopPropagation(); dismissTooltip(); });
    }

    function dismissTooltip() {
      if(hideTimer){ clearTimeout(hideTimer); hideTimer=null; }
      activePin=null; isOverTooltip=false;
      tooltip.classList.remove("visible");
    }

    function scheduleHide() {
      if(hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(()=>{
        // Only hide if mouse is not over tooltip or pin
        if(!isOverPin && !isOverTooltip){ dismissTooltip(); }
        hideTimer=null;
      }, 400);
    }

    // Tooltip hover: keep it open when mouse enters the card
    tooltip.addEventListener("mouseenter",()=>{ isOverTooltip=true; if(hideTimer){ clearTimeout(hideTimer); hideTimer=null; } });
    tooltip.addEventListener("mouseleave",()=>{ isOverTooltip=false; scheduleHide(); });

    container.addEventListener("mousedown",(e: MouseEvent)=>{isDragging=true;prevMouse.x=e.clientX;prevMouse.y=e.clientY;});
    window.addEventListener("mouseup",()=>{isDragging=false;});
    container.addEventListener("mouseleave",()=>{
      isDragging=false;isOverPin=false;
      scheduleHide();
    });

    window.addEventListener("mousemove",(e: MouseEvent)=>{
      const rect=canvas.getBoundingClientRect();
      mouse.x=((e.clientX-rect.left)/rect.width)*2-1;
      mouse.y=-((e.clientY-rect.top)/rect.height)*2+1;
      if(isDragging&&!isOverPin){
        const dx=e.clientX-prevMouse.x, dy=e.clientY-prevMouse.y;
        globeGroup.rotation.y+=dx*DRAG_SENSITIVITY;
        globeGroup.rotation.x+=dy*DRAG_SENSITIVITY*0.5;
        globeGroup.rotation.x=Math.max(-0.8,Math.min(0.8,globeGroup.rotation.x));
        dragVel=dx*DRAG_SENSITIVITY;
        prevMouse.x=e.clientX;prevMouse.y=e.clientY;
      }
      // Hover detection on pins
      raycaster.setFromCamera(mouse,camera);
      const hits=raycaster.intersectObjects(pinObjects);
      if(hits.length>0){
        const h=hits[0].object, d=h.userData;
        isOverPin=true; container.style.cursor="pointer";
        if(hideTimer){ clearTimeout(hideTimer); hideTimer=null; }
        activePin=d;
        const wp=new T.Vector3(); h.getWorldPosition(wp); wp.project(camera);
        showTooltip(d,(wp.x*0.5+0.5)*rect.width,(-wp.y*0.5+0.5)*rect.height);
      } else {
        isOverPin=false; container.style.cursor="none";
        // Start delayed hide — gives user time to move cursor to tooltip
        if(activePin && !isOverTooltip){ scheduleHide(); }
      }
      // Keep tooltip positioned at its pin while visible
      if(activePin && tooltip.classList.contains("visible")){
        const pinHit = pinObjects.find((p: any)=>p.userData.name===activePin.name);
        if(pinHit){
          const wp=new T.Vector3(); pinHit.getWorldPosition(wp); wp.project(camera);
          tooltip.style.left=(wp.x*0.5+0.5)*rect.width+"px";
          tooltip.style.top=(-wp.y*0.5+0.5)*rect.height+"px";
        }
      }
    });

    // Wheel: zoom globe first, then allow page scroll when at limits
    container.addEventListener("wheel",(e: WheelEvent)=>{
      const newZoom = zoomTarget + e.deltaY * 0.003;
      // Scrolling down (zoom out) and at max → let the page scroll
      if (e.deltaY > 0 && zoomTarget >= ZOOM_MAX - 0.05) {
        atMaxZoomOut = true;
        // Don't prevent default — let the page scroll naturally
        return;
      }
      // Scrolling up (zoom in) and at min → let the page scroll up
      if (e.deltaY < 0 && zoomTarget <= ZOOM_MIN + 0.05) {
        // Don't prevent default — let page scroll up naturally
        return;
      }
      // Otherwise, zoom the globe
      e.preventDefault();
      atMaxZoomOut = false;
      zoomTarget = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, newZoom));
    },{passive:false});

    // Touch support — prevent page scroll when interacting with globe
    let touchStart={x:0,y:0},lastTouchDist=0,isTouchingGlobe=false;
    container.addEventListener("touchstart",(e: TouchEvent)=>{
      isTouchingGlobe=true;
      if(e.touches.length===1){touchStart.x=e.touches[0].clientX;touchStart.y=e.touches[0].clientY;}
      else if(e.touches.length===2){lastTouchDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);}
    },{passive:true});
    container.addEventListener("touchmove",(e: TouchEvent)=>{
      if(!isTouchingGlobe) return;
      e.preventDefault();
      if(e.touches.length===1){
        const dx=e.touches[0].clientX-touchStart.x,dy=e.touches[0].clientY-touchStart.y;
        globeGroup.rotation.y+=dx*DRAG_SENSITIVITY;globeGroup.rotation.x+=dy*DRAG_SENSITIVITY*0.5;
        globeGroup.rotation.x=Math.max(-0.8,Math.min(0.8,globeGroup.rotation.x));
        touchStart.x=e.touches[0].clientX;touchStart.y=e.touches[0].clientY;
      } else if(e.touches.length===2){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        zoomTarget-=(d-lastTouchDist)*0.01;zoomTarget=Math.max(ZOOM_MIN,Math.min(ZOOM_MAX,zoomTarget));lastTouchDist=d;
      }
    },{passive:false});
    container.addEventListener("touchend",()=>{isTouchingGlobe=false;},{passive:true});

    function resize(){
      const r=container.getBoundingClientRect();
      renderer.setSize(r.width,r.height);camera.aspect=r.width/r.height;camera.updateProjectionMatrix();
    }
    window.addEventListener("resize",resize); resize();

    // Animate
    const clock=new T.Clock();
    function animate(){
      requestAnimationFrame(animate);
      const t=clock.getElapsedTime();
      if(isOverPin||isOverTooltip||activePin){dragVel=0;}
      else if(!isDragging){dragVel*=0.96;globeGroup.rotation.y+=AUTO_SPEED+dragVel;}
      camera.position.z+=(zoomTarget-camera.position.z)*0.08;

      cPins.forEach((p: any,i: number)=>{
        if(p.userData.glow) p.userData.glow.material.opacity=0.18+Math.sin(t*2+i*0.5)*0.1;
        if(p.userData.pulse){const s=1+Math.sin(t*2+i*0.3)*0.3;p.userData.pulse.scale.set(s,s,s);p.userData.pulse.material.opacity=0.12-Math.sin(t*2+i*0.3)*0.06;}
      });
      ePins.forEach((p: any,i: number)=>{
        if(p.userData.outerRing){const s=1+Math.sin(t*1.2+i*0.7)*0.35;p.userData.outerRing.scale.set(s,s,s);p.userData.outerRing.material.opacity=0.15-Math.sin(t*1.2+i*0.7)*0.08;}
        if(p.userData.pulse){const s=1+Math.sin(t*1.5+i*0.5)*0.3;p.userData.pulse.scale.set(s,s,s);p.userData.pulse.material.opacity=0.35-Math.sin(t*1.5+i*0.5)*0.15;}
        if(p.userData.glow) p.userData.glow.material.opacity=0.08+Math.sin(t*1.0+i*0.4)*0.05;
      });

      particles.rotation.y+=0.0001; particles.rotation.x+=0.00005;
      ring1.rotation.z+=0.0002; ring2.rotation.z-=0.00015; ring3.rotation.z+=0.0001; ring4.rotation.z-=0.00008;
      renderer.render(scene,camera);
    }
    animate();
  };

  return (
    <>
      {/* Ambient Background */}
      <div className="ambient-bg" />
      <div className="ambient-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
        <div className="orb orb-4" />
      </div>
      <div className="micro-particles" id="microParticles" />

      {/* Custom Cursor */}
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />

      {/* Back to Top */}
      <a href="#top" className="back-to-top" id="backToTop" aria-label="Back to top">
        <svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
      </a>

      <SiteNav />

      <style>{`

        .globe-page-wrapper {
          position: relative;
          width: 100%;
          background: #0a1628;
          color: #e8e0d0;
          font-family: var(--font-dm-sans, 'DM Sans'), sans-serif;
        }

        /* Globe fills the viewport, fixed behind content — nudged down */
        #globe-container {
          position: fixed;
          top: 40px;
          left: -15vw;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          cursor: none;
        }
        #globe-container:active { cursor: none; }
        #globe-canvas { width: 100%; height: 100%; display: block; }

        /* Content overlay — text TOP RIGHT */
        .globe-content-section {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
          padding: 180px 60px 60px;
          pointer-events: none;
        }
        .globe-content-inner {
          max-width: 596px;
          text-align: left;
          padding-right:48px;
        }
        .globe-eyebrow {
          font-size: 13px; font-weight: 500; letter-spacing: 4px; text-transform: uppercase;
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 16px;
        }
        .globe-heading {
          font-family: var(--font-cormorant, 'Cormorant Garamond'), serif;
          font-size: clamp(32px, 5vw, 52px);
          font-weight: 300; color: #fff; margin-bottom: 16px; line-height: 1.15;
        }
        .globe-heading em {
          font-style: italic;
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .globe-subtext {
         font-size: 17px;
  color: #fff;
  max-width: 440px;
  line-height: 1.85;
  margin-bottom: 28px;
  font-weight: 400;
}
        .globe-legend {
  display: flex;
  gap: 28px;
  font-size: 15px;
  color: rgba(232,224,208,0.75);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
  font-weight: 500;
  letter-spacing: 1.2px;
}
        .globe-legend-item { display: flex; align-items: center; gap: 10px; }
        .globe-legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .globe-legend-dot.current {
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878);
          box-shadow: 0 0 12px rgba(201,168,76,0.8);
        }
        .globe-legend-dot.expansion {
          background: transparent; border: 2px solid #c9a84c;
          box-shadow: 0 0 10px rgba(201,168,76,0.5), inset 0 0 4px rgba(201,168,76,0.2);
          animation: expansionPulse 2.5s ease-in-out infinite;
        }
        @keyframes expansionPulse {
          0%, 100% { box-shadow: 0 0 10px rgba(201,168,76,0.5), inset 0 0 4px rgba(201,168,76,0.2); transform: scale(1); }
          50% { box-shadow: 0 0 16px rgba(201,168,76,0.7), inset 0 0 6px rgba(201,168,76,0.3); transform: scale(1.15); }
        }
        .globe-zoom-hint {
          font-size: 17px; color: rgba(255,255,255,0.75); letter-spacing: 0.5px; font-style: italic;
        }

        /* Tooltip */
        .globe-tooltip {
          position: absolute; pointer-events: auto; padding: 14px 20px; border-radius: 10px;
          font-family: var(--font-dm-sans, 'DM Sans'), sans-serif;
          font-size: 13px; font-weight: 500;
          white-space: nowrap; opacity: 0; transition: opacity 0.25s ease;
          z-index: 10; transform: translate(-50%, -160%); line-height: 1.4;
        }
        .globe-tooltip .tooltip-header {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 16px;
        }
        .globe-tooltip .tooltip-label {
          font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px;
          opacity: 0.8; display: block; margin-bottom: 2px; font-weight: 700;
        }
        .globe-tooltip .tooltip-name { font-size: 15px; font-weight: 600; display: block; }
        .globe-tooltip .tooltip-close {
          background: none; border: none; font-size: 20px; line-height: 1; cursor: pointer;
          opacity: 0.6; transition: opacity 0.2s; padding: 0 0 0 4px; flex-shrink: 0;
        }
        .globe-tooltip .tooltip-close:hover { opacity: 1; }
        .globe-tooltip.active-location .tooltip-close { color: #0a1628; }
        .globe-tooltip.expansion-location .tooltip-close { color: #e8d5a0; }
        .globe-tooltip .tooltip-link {
          display: block; margin-top: 10px; padding: 10px 0 2px;
          border-top: 1px solid rgba(6,12,22,0.2);
          font-size: 14px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          text-decoration: none; color: #0a1628; transition: all 0.2s;
        }
        .globe-tooltip .tooltip-link:hover { text-decoration: underline; text-underline-offset: 4px; }
        .globe-tooltip.active-location {
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878); color: #0a1628;
          box-shadow: 0 4px 20px rgba(184,154,62,0.4);
        }
        .globe-tooltip.visible { opacity: 1; }

        /* Spacer: enough height so user can scroll past globe to footer */
        .globe-scroll-spacer {
          position: relative;
          z-index: 1;
          height: 20vh;
          pointer-events: none;
        }

        /* Footer wrapper: solid bg above globe */
        .globe-footer-wrapper {
          position: relative;
          z-index: 5;
          background: var(--rawlins-bg, #060c16);
        }

        /* ── Responsive ── */
        @media (max-width: 1400px) {
          .globe-content-inner { max-width: 480px; padding-right: 24px; }
        }
        @media (max-width: 1200px) {
          .globe-content-section { padding: 160px 40px 40px; }
          .globe-content-inner { max-width: 420px; padding-right: 16px; }
          #globe-container { left: -25vw; }
        }
        @media (max-width: 1024px) {
          .globe-content-section { padding: 140px 32px 32px; }
          .globe-content-inner { max-width: 380px; padding-right: 8px; }
          #globe-container { left: -30vw; }
        }
        @media (max-width: 768px) {
          .globe-content-section {
            padding: 120px 24px 24px;
            align-items: center;
            justify-content: flex-start;
            min-height: auto;
          }
          .globe-content-inner {
            max-width: 100%;
            text-align: center;
            padding-right: 0;
          }
          .globe-subtext { margin-left: auto; margin-right: auto; }
          .globe-legend { gap: 20px; flex-wrap: wrap; justify-content: center; }
          .globe-zoom-hint { text-align: center; }
          #globe-container {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            width: 100vw;
            height: 60vh;
            touch-action: none;
          }
          .globe-scroll-spacer { height: 0; }
        }
      `}</style>

      <div className="globe-page-wrapper" id="top">
        {/* Text content — renders first in DOM for mobile stacking */}
        <section className="globe-content-section">
          <div className="globe-content-inner">
            <div className="globe-eyebrow">Areas We Serve</div>
            <h2 className="globe-heading">Global Reach, Local <em>Impact</em></h2>
            <p className="globe-subtext">
              Delivering solutions throughout the United States and expanding our footprint across
              industries and borders.
            </p>
            <div className="globe-legend">
              <div className="globe-legend-item"><div className="globe-legend-dot current"></div><span>Current</span></div>
              <div className="globe-legend-item"><div className="globe-legend-dot expansion"></div><span>Expanding</span></div>
            </div>
            <div className="globe-zoom-hint">Scroll to zoom · Drag to rotate · Hover pins for details</div>
          </div>
        </section>

        {/* Globe — fixed on desktop, stacked below text on mobile */}
        <div id="globe-container">
          <canvas id="globe-canvas"></canvas>
          <div className="globe-tooltip" id="globe-tooltip"></div>
        </div>

        {/* Extra scroll space so user can scroll past the globe */}
        <div className="globe-scroll-spacer" />

        {/* Footer with solid background to hide globe */}
        <div className="globe-footer-wrapper">
          <div className="section-divider"><div className="gold-line" /></div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
