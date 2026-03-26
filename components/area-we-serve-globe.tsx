"use client";

import { useEffect, useRef } from "react";
import SiteNav from "@/components/site-nav";
import SiteFooter from "@/components/site-footer";

export default function AreaWeServeGlobe() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.async = true;
    script.onload = () => initGlobe();
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
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
    const ZOOM_DEFAULT = 5.0;
    const GOLD_LIGHT = 0xe8d5a0;
    const GOLD_MID = 0xd4b878;
    const GOLD_DEEP = 0xc9a84c;

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
      { name: "Dubai, United Arab Emirates", lat: 25.2, lng: 55.3 },
      { name: "Ottawa, Canada", lat: 45.4, lng: -75.7 },
      { name: "Uman, Ukraine", lat: 48.7, lng: 30.2 },
    ];

    // Scene
    const scene = new T.Scene();
    const camera = new T.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = ZOOM_DEFAULT;
    const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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

    // Particles
    const pCount = 1500;
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

    // Continent paths
    const CP: Record<string, number[][]> = {
      na: [[49,-125],[48,-123],[47,-124],[45,-124],[43,-124],[41,-124],[39,-123],[37,-122],[35,-121],[34,-120],[33,-118],[32,-117],[31,-115],[30,-114],[28,-112],[26,-110],[24,-110],[22,-106],[20,-105],[18,-103],[16,-96],[17,-92],[18,-88],[20,-87],[21,-87],[23,-88],[25,-90],[27,-89],[29,-89],[30,-87],[30,-85],[29,-83],[28,-82],[27,-80],[26,-80],[25,-80],[26,-82],[28,-82],[30,-81],[31,-80],[32,-79],[33,-78],[34,-76],[35,-76],[36,-75],[37,-76],[38,-75],[39,-74],[40,-73],[41,-72],[42,-71],[42,-70],[43,-69],[44,-67],[45,-66],[46,-64],[47,-63],[47,-61],[46,-59],[45,-57],[47,-56],[49,-54],[51,-55],[52,-56],[53,-58],[54,-60],[55,-60],[56,-62],[58,-63],[59,-64],[60,-65],[61,-69],[62,-72],[63,-75],[64,-78],[62,-80],[60,-82],[58,-85],[57,-87],[55,-90],[53,-93],[52,-95],[49,-95],[49,-100],[49,-105],[49,-110],[49,-115],[49,-120],[50,-123],[52,-127],[54,-130],[56,-133],[58,-137],[59,-140],[60,-145],[60,-150],[60,-155],[61,-158],[62,-160],[63,-163],[64,-165],[65,-168]],
      sa: [[12,-72],[11,-75],[10,-76],[8,-77],[6,-77],[4,-78],[2,-79],[0,-80],[-2,-80],[-4,-81],[-6,-81],[-8,-80],[-10,-78],[-12,-77],[-14,-76],[-16,-75],[-17,-72],[-18,-70],[-20,-70],[-22,-70],[-24,-70],[-26,-70],[-28,-70],[-30,-71],[-32,-71],[-34,-72],[-36,-73],[-38,-73],[-40,-72],[-42,-72],[-44,-73],[-46,-74],[-48,-74],[-50,-74],[-52,-72],[-54,-70],[-54,-68],[-54,-65],[-53,-62],[-52,-60],[-50,-58],[-48,-58],[-46,-58],[-44,-58],[-42,-57],[-40,-57],[-38,-56],[-35,-55],[-32,-52],[-30,-50],[-28,-48],[-25,-48],[-22,-42],[-20,-40],[-18,-39],[-15,-39],[-12,-38],[-10,-37],[-8,-35],[-5,-35],[-3,-40],[-2,-44],[0,-50],[2,-51],[4,-52],[6,-56],[7,-58],[8,-60],[9,-62],[10,-65],[11,-68],[12,-72]],
      eu: [[36,-6],[37,-8],[38,-9],[39,-9],[40,-9],[41,-9],[42,-9],[43,-8],[43,-5],[44,-1],[45,0],[46,-1],[47,-2],[48,-5],[48,-3],[49,-2],[50,0],[51,2],[52,4],[53,5],[54,7],[55,8],[56,10],[57,11],[58,12],[59,10],[60,5],[61,5],[62,6],[63,8],[64,10],[65,12],[66,14],[68,15],[69,18],[70,20],[70,24],[70,28],[68,30],[66,30],[64,30],[62,30],[60,30],[58,28],[56,28],[54,28],[52,28],[50,30],[48,28],[47,28],[46,24],[45,22],[44,20],[42,20],[41,20],[40,20],[39,22],[38,24],[37,26],[36,28],[36,25],[37,20],[38,16],[39,15],[40,14],[41,13],[42,12],[43,10],[44,8],[45,7],[46,6]],
      af: [[35,-1],[34,0],[33,0],[31,-2],[30,-5],[28,-8],[26,-13],[24,-15],[22,-17],[20,-17],[18,-16],[16,-17],[14,-17],[12,-16],[10,-15],[8,-13],[6,-10],[5,-8],[4,-5],[4,0],[4,5],[4,8],[4,10],[2,10],[0,10],[-2,10],[-4,12],[-6,12],[-8,13],[-10,14],[-12,14],[-14,13],[-16,12],[-18,14],[-20,15],[-22,16],[-24,17],[-26,18],[-28,17],[-30,17],[-32,18],[-34,19],[-34,22],[-34,26],[-33,28],[-31,30],[-29,32],[-27,33],[-25,35],[-22,35],[-20,35],[-18,38],[-15,40],[-12,41],[-10,40],[-8,40],[-5,40],[-2,41],[0,42],[2,43],[4,44],[6,45],[8,47],[10,50],[12,48],[12,44],[14,42],[16,40],[18,38],[20,37],[22,36],[24,35],[26,34],[28,33],[30,32],[32,32],[34,11],[35,10],[36,2],[36,-1]],
      as: [[40,28],[41,30],[42,35],[42,40],[42,45],[41,48],[40,50],[39,53],[38,55],[36,53],[34,52],[32,50],[30,50],[28,48],[26,50],[25,55],[24,57],[22,58],[20,56],[18,55],[15,50],[13,45],[12,48],[14,52],[16,55],[18,56],[20,60],[22,62],[24,65],[26,68],[28,68],[27,70],[25,72],[23,70],[21,72],[20,73],[18,74],[15,74],[12,76],[10,77],[8,78],[10,79],[12,80],[15,80],[18,83],[20,86],[22,88],[24,90],[22,92],[20,95],[18,98],[15,100],[12,100],[10,102],[8,102],[4,104],[2,104],[1,108],[1,110],[3,112],[5,115],[8,117],[10,120],[12,121],[15,121],[18,121],[20,122],[22,121],[24,121],[26,121],[28,121],[30,122],[32,121],[34,120],[36,120],[38,118],[39,118],[40,120],[42,125],[42,130],[44,132],[46,135],[48,135],[50,140],[52,142],[54,140],[56,138],[58,140],[60,150],[62,158],[64,168],[66,178],[68,175],[70,160],[70,150],[70,140],[69,135],[68,130],[66,125],[64,120],[62,110],[60,100],[58,90],[56,82],[54,78],[52,70],[50,65],[50,60],[48,55],[47,48],[45,40],[42,35]],
      au: [[-12,130],[-13,128],[-14,127],[-16,124],[-18,122],[-20,118],[-22,114],[-24,114],[-26,114],[-28,114],[-30,115],[-32,116],[-34,117],[-35,118],[-35,122],[-35,127],[-35,132],[-35,135],[-36,138],[-37,140],[-38,143],[-38,145],[-37,148],[-36,150],[-34,151],[-32,153],[-30,153],[-28,153],[-26,152],[-24,152],[-22,150],[-20,149],[-18,147],[-16,146],[-15,145],[-14,144],[-13,142],[-12,140],[-12,137],[-11,136],[-12,133],[-12,130]],
    };

    // Continent outlines
    const olMat = new T.LineBasicMaterial({ color: 0x4a98cc, transparent: true, opacity: 0.6 });
    Object.values(CP).forEach((path: number[][]) => {
      const pts = path.map(([la,ln]: number[]) => ll2v(la, ln, GLOBE_RADIUS+0.006));
      globeGroup.add(new T.Line(new T.BufferGeometry().setFromPoints(pts), olMat));
    });

    // Point-in-polygon
    function pip(tLat: number, tLng: number, poly: number[][]) {
      let inside = false;
      for (let i=0,j=poly.length-1; i<poly.length; j=i++) {
        const [yi,xi]=poly[i],[yj,xj]=poly[j];
        if (((yi>tLat)!==(yj>tLat))&&(tLng<(xj-xi)*(tLat-yi)/(yj-yi)+xi)) inside=!inside;
      }
      return inside;
    }

    // Dense fill dots inside continents
    const fillArr: any[] = [];
    const STEP = 1.8;
    Object.values(CP).forEach((path: number[][]) => {
      let mnLa=90,mxLa=-90,mnLn=180,mxLn=-180;
      path.forEach(([la,ln]: number[])=>{if(la<mnLa)mnLa=la;if(la>mxLa)mxLa=la;if(ln<mnLn)mnLn=ln;if(ln>mxLn)mxLn=ln;});
      for(let la=mnLa;la<=mxLa;la+=STEP){
        for(let ln=mnLn;ln<=mxLn;ln+=STEP){
          if(pip(la,ln,path)) fillArr.push(ll2v(la,ln,GLOBE_RADIUS+0.005));
        }
      }
    });
    const fGeo = new T.BufferGeometry();
    const fPos = new Float32Array(fillArr.length*3);
    fillArr.forEach((v: any,i: number)=>{fPos[i*3]=v.x;fPos[i*3+1]=v.y;fPos[i*3+2]=v.z;});
    fGeo.setAttribute("position", new T.BufferAttribute(fPos, 3));
    globeGroup.add(new T.Points(fGeo, new T.PointsMaterial({
      color: 0x1e6a9e, size: 0.02, transparent: true, opacity: 0.45, sizeAttenuation: true
    })));

    // Second fill layer
    const f2Arr: any[] = [];
    Object.values(CP).forEach((path: number[][]) => {
      let mnLa=90,mxLa=-90,mnLn=180,mxLn=-180;
      path.forEach(([la,ln]: number[])=>{if(la<mnLa)mnLa=la;if(la>mxLa)mxLa=la;if(ln<mnLn)mnLn=ln;if(ln>mxLn)mxLn=ln;});
      for(let la=mnLa+0.9;la<=mxLa;la+=2.5){
        for(let ln=mnLn+0.9;ln<=mxLn;ln+=2.5){
          if(pip(la,ln,path)) f2Arr.push(ll2v(la,ln,GLOBE_RADIUS+0.009));
        }
      }
    });
    const f2Geo = new T.BufferGeometry();
    const f2Pos = new Float32Array(f2Arr.length*3);
    f2Arr.forEach((v: any,i: number)=>{f2Pos[i*3]=v.x;f2Pos[i*3+1]=v.y;f2Pos[i*3+2]=v.z;});
    f2Geo.setAttribute("position", new T.BufferAttribute(f2Pos, 3));
    globeGroup.add(new T.Points(f2Geo, new T.PointsMaterial({
      color: 0x2a88bb, size: 0.013, transparent: true, opacity: 0.25, sizeAttenuation: true
    })));

    // Edge dots along outlines
    const eDots: any[] = [];
    Object.values(CP).forEach((path: number[][]) => {
      for(let i=0;i<path.length-1;i++){
        const [la1,ln1]=path[i],[la2,ln2]=path[i+1];
        for(let s=0;s<=3;s++){
          const t=s/3;
          eDots.push(ll2v(la1+(la2-la1)*t, ln1+(ln2-ln1)*t, GLOBE_RADIUS+0.008));
        }
      }
    });
    const eGeo = new T.BufferGeometry();
    const ePos = new Float32Array(eDots.length*3);
    eDots.forEach((v: any,i: number)=>{ePos[i*3]=v.x;ePos[i*3+1]=v.y;ePos[i*3+2]=v.z;});
    eGeo.setAttribute("position", new T.BufferAttribute(ePos, 3));
    globeGroup.add(new T.Points(eGeo, new T.PointsMaterial({
      color: 0x5aaddd, size: 0.01, transparent: true, opacity: 0.55, sizeAttenuation: true
    })));

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
        g.add(new T.Mesh(new T.SphereGeometry(0.025,12,12), new T.MeshBasicMaterial({color:GOLD_LIGHT})));
        const glow = new T.Mesh(new T.SphereGeometry(0.055,12,12), new T.MeshBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.2}));
        g.add(glow); g.userData.glow = glow;
        const pulse = new T.Mesh(new T.RingGeometry(0.06,0.08,24), new T.MeshBasicMaterial({color:GOLD_LIGHT,transparent:true,opacity:0.12,side:T.DoubleSide}));
        pulse.lookAt(pos.clone().multiplyScalar(2)); g.add(pulse); g.userData.pulse = pulse;
        const beam = new T.Mesh(new T.CylinderGeometry(0.002,0.002,0.1,4), new T.MeshBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.35}));
        beam.lookAt(pos.clone().multiplyScalar(2)); beam.rotateX(Math.PI/2);
        beam.position.copy(pos.clone().normalize().multiplyScalar(0.05)); g.add(beam);
      } else {
        g.add(new T.Mesh(new T.SphereGeometry(0.02,12,12), new T.MeshBasicMaterial({color:GOLD_LIGHT,transparent:true,opacity:0.85})));
        const ring = new T.Mesh(new T.RingGeometry(0.028,0.038,20), new T.MeshBasicMaterial({color:GOLD_MID,transparent:true,opacity:0.55,side:T.DoubleSide}));
        ring.lookAt(pos.clone().multiplyScalar(2)); g.add(ring);
        const outer = new T.Mesh(new T.RingGeometry(0.048,0.055,24), new T.MeshBasicMaterial({color:GOLD_DEEP,transparent:true,opacity:0.25,side:T.DoubleSide}));
        outer.lookAt(pos.clone().multiplyScalar(2)); g.add(outer); g.userData.outerRing = outer;
        const glow = new T.Mesh(new T.SphereGeometry(0.065,12,12), new T.MeshBasicMaterial({color:GOLD_DEEP,transparent:true,opacity:0.12}));
        g.add(glow); g.userData.glow = glow;
      }

      g.position.copy(pos);
      g.userData.name = loc.name;
      g.userData.isCurrent = isCurrent;
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

    container.addEventListener("mousedown",(e: MouseEvent)=>{isDragging=true;prevMouse.x=e.clientX;prevMouse.y=e.clientY;dragVel=0;});
    window.addEventListener("mouseup",()=>{isDragging=false;});
    container.addEventListener("mouseleave",()=>{isDragging=false;isOverPin=false;tooltip.classList.remove("visible");});

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
      raycaster.setFromCamera(mouse,camera);
      const hits=raycaster.intersectObjects(pinObjects);
      if(hits.length>0){
        const h=hits[0].object, d=h.userData;
        isOverPin=true; container.style.cursor="pointer";
        const wp=new T.Vector3(); h.getWorldPosition(wp); wp.project(camera);
        const sx=(wp.x*0.5+0.5)*rect.width, sy=(-wp.y*0.5+0.5)*rect.height;
        tooltip.innerHTML='<span class="tooltip-label">'+(d.isCurrent?"Active":"Expanding")+'</span><span class="tooltip-name">'+d.name+"</span>";
        tooltip.style.left=sx+"px"; tooltip.style.top=sy+"px";
        tooltip.className="globe-tooltip visible "+(d.isCurrent?"active-location":"expansion-location");
      } else {
        isOverPin=false; container.style.cursor=isDragging?"grabbing":"grab";
        tooltip.classList.remove("visible");
      }
    });

    container.addEventListener("wheel",(e: WheelEvent)=>{e.preventDefault();zoomTarget+=e.deltaY*0.003;zoomTarget=Math.max(ZOOM_MIN,Math.min(ZOOM_MAX,zoomTarget));},{passive:false});

    // Touch support
    let touchStart={x:0,y:0},lastTouchDist=0;
    container.addEventListener("touchstart",(e: TouchEvent)=>{
      if(e.touches.length===1){touchStart.x=e.touches[0].clientX;touchStart.y=e.touches[0].clientY;}
      else if(e.touches.length===2){lastTouchDist=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);}
    },{passive:true});
    container.addEventListener("touchmove",(e: TouchEvent)=>{
      if(e.touches.length===1){
        const dx=e.touches[0].clientX-touchStart.x,dy=e.touches[0].clientY-touchStart.y;
        globeGroup.rotation.y+=dx*DRAG_SENSITIVITY;globeGroup.rotation.x+=dy*DRAG_SENSITIVITY*0.5;
        globeGroup.rotation.x=Math.max(-0.8,Math.min(0.8,globeGroup.rotation.x));
        touchStart.x=e.touches[0].clientX;touchStart.y=e.touches[0].clientY;
      } else if(e.touches.length===2){
        const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);
        zoomTarget-=(d-lastTouchDist)*0.01;zoomTarget=Math.max(ZOOM_MIN,Math.min(ZOOM_MAX,zoomTarget));lastTouchDist=d;
      }
    },{passive:true});

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
      if(!isOverPin&&!isDragging){dragVel*=0.96;globeGroup.rotation.y+=AUTO_SPEED+dragVel;}
      else if(isOverPin){dragVel=0;}
      camera.position.z+=(zoomTarget-camera.position.z)*0.08;

      cPins.forEach((p: any,i: number)=>{
        if(p.userData.glow) p.userData.glow.material.opacity=0.18+Math.sin(t*2+i*0.5)*0.1;
        if(p.userData.pulse){const s=1+Math.sin(t*2+i*0.3)*0.3;p.userData.pulse.scale.set(s,s,s);p.userData.pulse.material.opacity=0.12-Math.sin(t*2+i*0.3)*0.06;}
      });
      ePins.forEach((p: any,i: number)=>{
        if(p.userData.outerRing){const s=1+Math.sin(t*1.5+i*0.7)*0.25;p.userData.outerRing.scale.set(s,s,s);p.userData.outerRing.material.opacity=0.25-Math.sin(t*1.5+i*0.7)*0.12;}
        if(p.userData.glow) p.userData.glow.material.opacity=0.1+Math.sin(t*1.8+i*0.4)*0.08;
      });

      particles.rotation.y+=0.0001; particles.rotation.x+=0.00005;
      ring1.rotation.z+=0.0002; ring2.rotation.z-=0.00015; ring3.rotation.z+=0.0001; ring4.rotation.z-=0.00008;
      renderer.render(scene,camera);
    }
    animate();
  };

  return (
    <>
      <SiteNav />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@300;400;500;700&display=swap');
        .globe-page-wrapper {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: #0a1628;
          color: #e8e0d0;
          font-family: 'DM Sans', sans-serif;
        }
        #globe-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 0;
          cursor: grab;
        }
        #globe-container:active { cursor: grabbing; }
        #globe-canvas { width: 100%; height: 100%; display: block; }
        .globe-tooltip {
          position: absolute; pointer-events: none; padding: 10px 16px; border-radius: 8px;
          font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500;
          white-space: nowrap; opacity: 0; transition: opacity 0.2s ease;
          z-index: 10; transform: translate(-50%, -140%); line-height: 1.4;
        }
        .globe-tooltip .tooltip-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; opacity: 0.7; display: block; margin-bottom: 2px; }
        .globe-tooltip .tooltip-name { font-size: 14px; font-weight: 600; display: block; }
        .globe-tooltip.active-location {
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878); color: #0a1628;
          box-shadow: 0 4px 20px rgba(184,154,62,0.4);
        }
        .globe-tooltip.expansion-location {
          background: rgba(15,25,45,0.9); backdrop-filter: blur(12px);
          border: 1px solid rgba(201,168,76,0.5); color: #e8d5a0;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
        .globe-tooltip.visible { opacity: 1; }
        .globe-content-section {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 20px;
          pointer-events: none;
        }
        .globe-eyebrow {
          font-size: 13px; font-weight: 500; letter-spacing: 4px; text-transform: uppercase;
          background: linear-gradient(145deg, #c9a84c, #e8d5a0, #d4b878);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 16px; text-align: center;
        }
        .globe-heading {
          font-family: 'Cormorant Garamond', serif; font-size: clamp(32px, 5vw, 52px);
          font-weight: 300; color: #fff; margin-bottom: 16px; text-align: center; line-height: 1.15;
        }
        .globe-subtext {
          font-size: 16px; color: rgba(232,224,208,0.6); max-width: 560px;
          text-align: center; line-height: 1.6; margin-bottom: 20px;
        }
        .globe-legend {
          display: flex; gap: 32px; margin-bottom: 24px; font-size: 13px;
          color: rgba(232,224,208,0.5); letter-spacing: 1px; text-transform: uppercase;
        }
        .globe-legend-item { display: flex; align-items: center; gap: 10px; }
        .globe-legend-dot { width: 10px; height: 10px; border-radius: 50%; }
        .globe-legend-dot.current { background: linear-gradient(145deg, #c9a84c, #e8d5a0); box-shadow: 0 0 10px rgba(201,168,76,0.7); }
        .globe-legend-dot.expansion { background: transparent; border: 1.5px solid #d4b878; box-shadow: 0 0 8px rgba(212,184,120,0.4); }
        .globe-zoom-hint {
          font-size: 12px; color: rgba(232,224,208,0.25); margin-top: 12px; letter-spacing: 0.5px;
        }
      `}</style>

      <div className="globe-page-wrapper">
        <div id="globe-container">
          <canvas id="globe-canvas"></canvas>
          <div className="globe-tooltip" id="globe-tooltip"></div>
        </div>

        <section className="globe-content-section">
          <div className="globe-eyebrow">Areas We Serve</div>
          <h2 className="globe-heading">Global Reach, Local Impact</h2>
          <p className="globe-subtext">
            Delivering solutions across the U.S. and expanding our global footprint across
            industries and borders.
          </p>
          <div className="globe-legend">
            <div className="globe-legend-item"><div className="globe-legend-dot current"></div><span>Current</span></div>
            <div className="globe-legend-item"><div className="globe-legend-dot expansion"></div><span>Expanding</span></div>
          </div>
          <div className="globe-zoom-hint">Scroll to zoom · Drag to rotate · Hover pins for details</div>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
