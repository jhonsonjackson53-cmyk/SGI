import { useEffect, useRef } from "react";
import * as THREE from "three";

function IndustrialPlantScene() {
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x111827, 7, 24);

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(6, 5, 9);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setClearColor(0x000000, 0);
    host.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);
    const redLight = new THREE.PointLight(0xef4444, 2.5, 18);
    redLight.position.set(-3.5, 2.5, 3);
    scene.add(redLight);
    const blueLight = new THREE.PointLight(0x94a3b8, 1.4, 15);
    blueLight.position.set(4, 2, -2);
    scene.add(blueLight);

    const floorMat = new THREE.MeshStandardMaterial({ color: 0x202938, roughness: 0.72, metalness: 0.25 });
    const metalMat = new THREE.MeshStandardMaterial({ color: 0x9ca3af, roughness: 0.42, metalness: 0.65 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x374151, roughness: 0.58, metalness: 0.35 });
    const redMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.38, metalness: 0.45 });
    const amberMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.38, metalness: 0.25 });
    const greenMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.38, metalness: 0.25 });
    const cyanMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.38, metalness: 0.25 });
    const concreteMat = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.85, metalness: 0.08 });
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45, metalness: 0.25 });
    const cableMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.5, metalness: 0.45 });
    const panelMat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb, roughness: 0.5, metalness: 0.4 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.18, metalness: 0.1, transparent: true, opacity: 0.48 });
    const emissiveRedMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 0.55 });
    const emissiveGreenMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, emissive: 0x22c55e, emissiveIntensity: 0.45 });
    const spinningFans: THREE.Group[] = [];
    const beaconLights: THREE.Mesh[] = [];

    const floor = new THREE.Mesh(new THREE.BoxGeometry(12, 0.18, 8), floorMat);
    floor.position.y = -0.12;
    group.add(floor);

    const grid = new THREE.GridHelper(12, 12, 0xef4444, 0x475569);
    grid.position.y = 0.02;
    group.add(grid);

    const modulePositions = [
      [-3.6, 0.45, -1.7, 1.3, 0.9, 1.2, redMat],
      [-1.2, 0.55, 1.2, 1.6, 1.1, 1.1, metalMat],
      [1.4, 0.65, -1.4, 1.4, 1.3, 1.4, darkMat],
      [3.5, 0.45, 1.1, 1.2, 0.9, 1.5, metalMat],
    ] as const;

    modulePositions.forEach(([x, y, z, w, h, d, mat]) => {
      const module = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      module.position.set(x, y, z);
      group.add(module);
    });

    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.32, metalness: 0.75 });
    for (let i = 0; i < 5; i += 1) {
      const pipe = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 6.5, 24), pipeMat);
      pipe.rotation.z = Math.PI / 2;
      pipe.position.set(0, 1.15 + i * 0.22, -2.9 + i * 0.22);
      group.add(pipe);
    }

    const duct = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.28, 0.38), darkMat);
    duct.position.set(0.4, 2.15, -2.15);
    group.add(duct);

    const conveyor = new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.16, 0.85), metalMat);
    conveyor.position.set(0.2, 0.35, 0.1);
    group.add(conveyor);

    const conveyorBelt = new THREE.Mesh(new THREE.BoxGeometry(6.1, 0.04, 0.55), cableMat);
    conveyorBelt.position.set(0.2, 0.47, 0.1);
    group.add(conveyorBelt);

    [-4.8, 4.8].forEach((x) => {
      [-3.15, 2.95].forEach((z) => {
        const column = new THREE.Mesh(new THREE.BoxGeometry(0.22, 2.35, 0.22), concreteMat);
        column.position.set(x, 1.05, z);
        group.add(column);
      });
    });
    const frontBeam = new THREE.Mesh(new THREE.BoxGeometry(9.9, 0.18, 0.18), concreteMat);
    frontBeam.position.set(0, 2.25, 2.95);
    group.add(frontBeam);
    const backBeam = frontBeam.clone();
    backBeam.position.z = -3.15;
    group.add(backBeam);
    const sideBeamA = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 6.3), concreteMat);
    sideBeamA.position.set(-4.8, 2.25, -0.1);
    group.add(sideBeamA);
    const sideBeamB = sideBeamA.clone();
    sideBeamB.position.x = 4.8;
    group.add(sideBeamB);

    const addHvacUnit = (x: number, z: number, colorMat: THREE.Material) => {
      const unit = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.38, 0.86), panelMat);
      base.position.y = 0.22;
      unit.add(base);
      const grille = new THREE.Mesh(new THREE.BoxGeometry(1.05, 0.05, 0.12), darkMat);
      grille.position.set(0, 0.46, 0.42);
      unit.add(grille);
      const fan = new THREE.Group();
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.025, 10, 32), colorMat);
      ring.rotation.x = Math.PI / 2;
      fan.add(ring);
      for (let i = 0; i < 3; i += 1) {
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.025, 0.08), darkMat);
        blade.rotation.y = (Math.PI * 2 * i) / 3;
        fan.add(blade);
      }
      fan.position.y = 0.5;
      unit.add(fan);
      spinningFans.push(fan);
      unit.position.set(x, 0.08, z);
      group.add(unit);
    };
    addHvacUnit(-3.25, 2.15, cyanMat);
    addHvacUnit(3.1, -2.55, redMat);

    const tray = new THREE.Group();
    const trayRailA = new THREE.Mesh(new THREE.BoxGeometry(5.8, 0.08, 0.08), yellowMat);
    trayRailA.position.set(0, 1.72, 2.35);
    tray.add(trayRailA);
    const trayRailB = trayRailA.clone();
    trayRailB.position.z = 2.68;
    tray.add(trayRailB);
    for (let i = 0; i < 13; i += 1) {
      const rung = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.42), yellowMat);
      rung.position.set(-2.9 + i * 0.48, 1.72, 2.52);
      tray.add(rung);
    }
    group.add(tray);

    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-2.7, 1.84, 2.52),
      new THREE.Vector3(-1.15, 2.02, 2.7),
      new THREE.Vector3(0.9, 1.82, 2.48),
      new THREE.Vector3(2.6, 1.96, 2.62),
    ]);
    group.add(new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 40, 0.035, 8), cableMat));

    const panel = new THREE.Group();
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.78, 1.25, 0.28), panelMat);
    cabinet.position.y = 0.72;
    panel.add(cabinet);
    const screen = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.26, 0.035), glassMat);
    screen.position.set(0, 0.98, 0.16);
    panel.add(screen);
    for (let i = 0; i < 3; i += 1) {
      const light = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), i === 0 ? emissiveRedMat : emissiveGreenMat);
      light.position.set(-0.22 + i * 0.22, 0.52, 0.17);
      beaconLights.push(light);
      panel.add(light);
    }
    panel.position.set(4.25, 0.02, -0.65);
    group.add(panel);

    const crane = new THREE.Group();
    const mast = new THREE.Mesh(new THREE.BoxGeometry(0.16, 1.6, 0.16), yellowMat);
    mast.position.y = 0.8;
    crane.add(mast);
    const boom = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.13, 0.13), yellowMat);
    boom.position.set(0.6, 1.55, 0);
    crane.add(boom);
    const hookCable = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.55, 10), cableMat);
    hookCable.position.set(1.22, 1.22, 0);
    crane.add(hookCable);
    const hook = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.018, 8, 18, Math.PI * 1.35), redMat);
    hook.position.set(1.22, 0.92, 0);
    hook.rotation.z = -Math.PI / 5;
    crane.add(hook);
    crane.position.set(-4.2, 0.02, 0.95);
    group.add(crane);

    const processLights: THREE.Mesh[] = [];
    const lightMats = [redMat, amberMat, greenMat, cyanMat];
    for (let i = 0; i < 18; i += 1) {
      const chip = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.08, 0.16), lightMats[i % lightMats.length]);
      chip.position.set(-3 + i * 0.35, 0.55, 0.1 + (i % 2) * 0.24);
      processLights.push(chip);
      group.add(chip);
    }

    const mouse = { x: 0, y: 0 };
    const onPointerMove = (event: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    host.addEventListener("pointermove", onPointerMove);

    const resize = () => {
      const width = host.clientWidth || 1;
      const height = host.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let frame = 0;
    let animationId = 0;
    const animate = () => {
      frame += 0.01;
      group.rotation.y += ((mouse.x * 0.16) - group.rotation.y) * 0.035;
      group.rotation.x += ((-mouse.y * 0.08) - group.rotation.x) * 0.035;
      group.position.y = Math.sin(frame) * 0.07;
      processLights.forEach((chip, index) => {
        chip.scale.y = 1 + Math.sin(frame * 5 + index * 0.7) * 0.45;
      });
      spinningFans.forEach((fan, index) => {
        fan.rotation.y += 0.08 + index * 0.015;
      });
      beaconLights.forEach((light, index) => {
        const pulse = 0.8 + Math.sin(frame * 6 + index * 1.6) * 0.22;
        light.scale.setScalar(pulse);
      });
      redLight.intensity = 2.1 + Math.sin(frame * 3) * 0.45;
      renderer.render(scene, camera);
      animationId = window.requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      host.removeEventListener("pointermove", onPointerMove);
      host.removeChild(renderer.domElement);
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((item) => item.dispose());
          else material.dispose();
        }
      });
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" aria-hidden="true" />;
}

export default IndustrialPlantScene;
