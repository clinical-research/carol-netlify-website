import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import "../styles/ParticleSphere.css";

function SpikySphere({
  count = 3000,
  radius = 2,
  spikeMagnitude = 1,
  revertDelay = 500,
  onClick,
}) {
  const pointsRef = useRef();

  // Whether we're currently spiky
  const [isSpiky, setIsSpiky] = useState(false);

  // Animation progress (0 = original, 1 = spiky)
  const [progress, setProgress] = useState(0);

  // 1) Original sphere positions
  const originalPositions = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      arr.push(x, y, z);
    }
    return new Float32Array(arr);
  }, [count, radius]);

  // 2) Precompute spiky positions
  const spikyPositions = useMemo(() => {
    const arr = new Float32Array(originalPositions);
    for (let i = 0; i < arr.length; i += 3) {
      const x = arr[i];
      const y = arr[i + 1];
      const z = arr[i + 2];
      const dist = Math.sqrt(x * x + y * y + z * z);
      if (dist !== 0) {
        const nx = x / dist;
        const ny = y / dist;
        const nz = z / dist;
        const randomFactor = Math.random();
        const spDist = dist + randomFactor * spikeMagnitude;
        arr[i] = nx * spDist;
        arr[i + 1] = ny * spDist;
        arr[i + 2] = nz * spDist;
      }
    }
    return arr;
  }, [originalPositions, spikeMagnitude]);

  // 3) Current positions that we interpolate each frame
  const currentPositionsRef = useRef(new Float32Array(originalPositions));

  // Colors, optional
  const colors = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      // Blue gradient
      const color = new THREE.Color().lerpColors(
        new THREE.Color("#283593"), // Slightly lighter blue
        new THREE.Color("#4287f5"), // Light blue
        Math.random()
      );
      arr.push(color.r, color.g, color.b);
    }
    return new Float32Array(arr);
  }, [count]);

  // 4) When clicked => become spiky, then auto-revert after a short delay
  const handleClick = () => {
    setIsSpiky(true);
    setTimeout(() => {
      setIsSpiky(false);
    }, revertDelay); // revert after X ms
    onClick();
  };

  // 5) Animate progress in useFrame (and spin the sphere)
  useFrame((_, delta) => {
    // Spin the entire <points> object
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.005;
    }

    // Smoothly move `progress` between 0 and 1
    const target = isSpiky ? 1 : 0;
    const newProgress = THREE.MathUtils.damp(progress, target, 5, delta);
    setProgress(newProgress);

    // Blend each vertex's position
    const curArr = currentPositionsRef.current;
    for (let i = 0; i < curArr.length; i += 3) {
      const oriX = originalPositions[i];
      const oriY = originalPositions[i + 1];
      const oriZ = originalPositions[i + 2];
      const spX = spikyPositions[i];
      const spY = spikyPositions[i + 1];
      const spZ = spikyPositions[i + 2];

      curArr[i] = oriX + (spX - oriX) * newProgress;
      curArr[i + 1] = oriY + (spY - oriY) * newProgress;
      curArr[i + 2] = oriZ + (spZ - oriZ) * newProgress;
    }

    // Mark for update
    if (pointsRef.current) {
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} onClick={handleClick}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={currentPositionsRef.current}
          count={currentPositionsRef.current.length / 3}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={colors.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.017} vertexColors />
    </points>
  );
}

export default function App() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSphereClick = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div
      className={`particle-sphere-container ${
        isAnimating ? "spiky-active" : ""
      }`}
    >
      <Canvas className="particle-sphere-canvas">
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={0.7} />

        <SpikySphere
          count={20000}
          radius={2}
          spikeMagnitude={1}
          revertDelay={500}
          onClick={handleSphereClick}
        />

        {/* OrbitControls with zoom disabled */}
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
