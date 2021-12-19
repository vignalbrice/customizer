import "./App.css";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Model from "./components/Model/Model";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Plane,
} from "@react-three/drei";
import * as THREE from "three";

function App() {
  // This reference will give us direct access to the mesh
  return (
    <Canvas
      concurrent
      pixelRatio={Math.min(window.devicePixelRatio, 2)}
      camera={{
        position: [-5, 2, 2],
        isPerspectiveCamera: true,
      }}
      resize
      color={0xffffff}
      colorManagement={false}
    >
      <spotLight
        intensity={0.3}
        angle={0.1}
        penumbra={1}
        position={[5, 25, 20]}
      />

      <directionalLight
        args={[0xffffff, 0.37]}
        castShadow
        position={[1, 5, 2]}
        shadow={{ mapSize: new THREE.Vector2(1024, 1024) }}
      />

      <React.Suspense fallback={null}>
        <PerspectiveCamera
          args={[45, window.screen.width / window.screen.height, 0.1, 100]}
          aspect={window.screen.width / window.screen.height}
        >
          <Model />
          <Environment files='royal_esplanade_1k.hdr' />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={2}
            far={1}
          />
        </PerspectiveCamera>
      </React.Suspense>

      <OrbitControls
        minPolarAngle={(Math.PI * 1) / 6}
        maxPolarAngle={Math.PI / 2}
        enableZoom={true}
        enablePan={true}
        maxDistance={10}
        minDistance={4}
      />
    </Canvas>
  );
}

export default App;
