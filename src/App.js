import React, { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Model from "./components/Model/Model";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useHelper,
} from "@react-three/drei";
import * as THREE from "three";
import useProjectedCamera from "./hooks/useProjectedCamera";
import { proxy, useSnapshot } from "valtio";
import Picker from "./components/Picker/Picker";
import SelectMesh from "./components/SelectMesh/SelectMesh";
import Joystick from "./components/Joystick/Joystick";
import Resizer from "./components/Resizer/Resizer";

const state = proxy({
  current: null,
  items: [],
  meshSelected: null,
  dragStart: {
    x: null,
    y: null,
  },
  scale: 0.4,
});

function App() {
  // This reference will give us direct access to the mesh
  const cameraRef = useRef(null);
  const {
    frontLCamera,
    frontRCamera,
    leftCameraLF,
    leftCameraRF,
    rightCameraLF,
    rightCameraRF,
  } = useProjectedCamera();
  const snap = useSnapshot(state);

  return (
    <>
      <Canvas
        concurrent
        pixelRatio={Math.min(window.devicePixelRatio, 4)}
        camera={{
          position: [-5, 2, 2],
          isPerspectiveCamera: true,
        }}
        resize
        color={0xffffff}
        colorManagement={false}
      >
        <directionalLight
          args={[0xffffff, 0.37]}
          castShadow
          position={[1, 5, 2]}
          shadow={{ mapSize: new THREE.Vector2(1024, 1024) }}
        />
        <directionalLight
          args={[0xffffff, 0.54]}
          castShadow
          position={[-10, 5, -2]}
          shadow={{ mapSize: new THREE.Vector2(1024, 1024) }}
        />
        <directionalLight
          args={[0xffffff, 0.27]}
          castShadow
          position={[10, 5, -2]}
          shadow={{ mapSize: new THREE.Vector2(1024, 1024) }}
        />

        <React.Suspense fallback={null}>
          <PerspectiveCamera
            args={[45, window.screen.width / window.screen.height, 0.1, 100]}
            aspect={window.screen.width / window.screen.height}
            ref={cameraRef}
          >
            <Model
              state={state}
              cameraRef={cameraRef}
              frontLCamera={frontLCamera}
              frontRCamera={frontRCamera}
              leftCameraLF={leftCameraLF}
              leftCameraRF={leftCameraRF}
              rightCameraLF={rightCameraLF}
              rightCameraRF={rightCameraRF}
            />
          </PerspectiveCamera>
          <Environment files='royal_esplanade_1k.hdr' />
          <ContactShadows
            position={[0, -0.9, 0]}
            width={10}
            height={10}
            far={20}
            opacity={0.2}
            rotation={[Math.PI / 2, 0, 0]}
          />
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
      <Picker state={state} />
      <SelectMesh state={state} />
      <Joystick state={state} />
      <Resizer state={state} />
    </>
  );
}

export default App;
