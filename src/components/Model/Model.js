import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useGLTF, useHelper } from "@react-three/drei";
import { useFrame, useLoader } from "@react-three/fiber";
import { useSnapshot } from "valtio";
import ProjectedMaterial from "three-projected-material";
import { useComputedScaledDimensions } from "../../hooks/useComputedScaledDimensions";

export default function Model({
  cameraRef,
  frontLCamera,
  frontRCamera,
  leftCameraLF,
  leftCameraRF,
  rightCameraLF,
  rightCameraRF,
  state,
}) {
  const group = useRef();
  const { scene } = useGLTF("/air-force.glb");
  const snap = useSnapshot(state);
  const meshRef = useRef([]);
  const normal = useLoader(
    THREE.TextureLoader,
    "./NikeAirForce1_NormalMap_2k.png"
  );

  // Cursor showing current color
  const [hovered, set] = useState(null);
  useEffect(() => {
    const cursor = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0)"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><g filter="url(#filter0_d)"><path d="M29.5 47C39.165 47 47 39.165 47 29.5S39.165 12 29.5 12 12 19.835 12 29.5 19.835 47 29.5 47z" fill="${snap.items[hovered]}"/></g><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/><text fill="#000" style="white-space:pre" font-family="Inter var, sans-serif" font-size="10" letter-spacing="-.01em"><tspan x="35" y="63">${hovered}</tspan></text></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h64v64H0z"/></clipPath><filter id="filter0_d" x="6" y="8" width="47" height="47" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"><feFlood flood-opacity="0" result="BackgroundImageFix"/><feColorMatrix in="SourceAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/><feOffset dy="2"/><feGaussianBlur stdDeviation="3"/><feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"/><feBlend in2="BackgroundImageFix" result="effect1_dropShadow"/><feBlend in="SourceGraphic" in2="effect1_dropShadow" result="shape"/></filter></defs></svg>`;
    const auto = `<svg width="64" height="64" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill="rgba(255, 255, 255, 0.5)" d="M29.5 54C43.031 54 54 43.031 54 29.5S43.031 5 29.5 5 5 15.969 5 29.5 15.969 54 29.5 54z" stroke="#000"/><path d="M2 2l11 2.947L4.947 13 2 2z" fill="#000"/></svg>`;
    document.body.style.cursor = `url('data:image/svg+xml;base64,${btoa(
      hovered ? cursor : auto
    )}'), auto`;
  }, [hovered]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 4) / 8;
    group.current.position.y = (-9 + Math.sin(t / 1.5)) / 10;
  });
  const texture = useLoader(THREE.TextureLoader, "sonic.png");

  // Start the projection via this hooks
  useEffect(() => {
    if (meshRef.current["Empeigne_R"]) {
      const material = new ProjectedMaterial({
        texture,
        camera: frontRCamera,
        name: meshRef.current["Empeigne_R"].name,
        color: meshRef.current["Empeigne_R"].material.color,
        textureScale: 1,
      });
      meshRef.current["Empeigne_R"].material = material;
      meshRef.current["Empeigne_R"].material.project?.(
        meshRef.current["Empeigne_R"]
      );
    }
  }, []);
  // Move Image via this hooks
  useEffect(() => {
    if (meshRef.current["Empeigne_R"].material) {
      meshRef.current["Empeigne_R"].material.uniforms.textureOffset.value =
        new THREE.Vector2(snap.dragStart.x, snap.dragStart.y);
    }
  }, [snap.dragStart.x, snap.dragStart.y]);
  const [widthScaled, heightScaled] = useComputedScaledDimensions(
    texture,
    frontRCamera,
    snap.scale
  );
  // Resize Image via this hooks
  useEffect(() => {
    meshRef.current["Empeigne_R"].material.uniforms.widthScaled.value =
      widthScaled;
    meshRef.current["Empeigne_R"].material.uniforms.heightScaled.value =
      heightScaled;
  }, [widthScaled, heightScaled]);

  useEffect(() => {
    if (group.current) {
      group.current.position.y = -1;
      group.current.name = "air-force-one";
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name.slice(child.name.length - 1) === "L") {
            child.layers.set(20);
            child.visible = false;
          } else {
            child.layers.set(21);
          }
          if (child.name.includes("_L") && child.name !== "Filets_L") {
            state.items = [
              ...state.items,
              {
                [child.name
                  .replace("_L", "")
                  .replace("_", " ")
                  .replace("_", " ")]: "#FFF",
                meshName: child.name
                  .replace("_L", "")
                  .replace("_", " ")
                  .replace("_", " "),
              },
            ];
          }
        }
        cameraRef.current.layers.toggle(21);
      });
    }
  }, []);

  return (
    <>
      <group
        ref={group}
        dispose={null}
        onPointerOver={(e) => (
          e.stopPropagation(),
          set(
            e.object.name
              .replace("_L", "")
              .replace("_R", "")
              .replace("_", " ")
              .replace("_", " ")
          )
        )}
        onPointerOut={(e) => e.intersections.length === 0 && set(null)}
        onPointerMissed={() => (state.current = null)}
        onPointerDown={(e) => (
          e.stopPropagation(),
          (state.current = e.object.name
            .replace("_L", "")
            .replace("_R", "")
            .replace("_", " ")
            .replace("_", " "))
        )}
      >
        {scene.children
          .filter((el) => el instanceof THREE.Mesh)
          .map((m, i) => {
            normal.wrapS = THREE.RepeatWrapping;
            normal.wrapT = THREE.RepeatWrapping;
            normal.repeat.x = 1;
            normal.repeat.y = -1;
            m.material.normalMap = normal;
            return (
              <mesh
                key={i}
                ref={(el) => {
                  return (meshRef.current[m.name] = el);
                }}
                castShadow
                receiveShadow
                geometry={m.geometry}
                name={m.name}
                material={m.material}
                position={m.position}
                rotation={m.rotation}
                material-color={snap.items[m.name]}
              ></mesh>
            );
          })}
      </group>
    </>
  );
}

useGLTF.preload("/air-force.glb");
