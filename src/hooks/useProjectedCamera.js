import React, { useState } from "react";
import cameraLibrary from "../lib/cameraLibrary";
import * as THREE from "three";

const useProjectedCamera = () => {
  const cameraLib = [];
  for (const cam of cameraLibrary) {
    const { name, lookAt, position, rotation, side } = cam;
    cameraLib[name] = new THREE.PerspectiveCamera(
      20,
      window.innerWidth / window.innerHeight,
      0.01,
      5
    );
    cameraLib[name].name = name;
    cameraLib[name].side = side;
    cameraLib[name].position.copy(
      new THREE.Vector3(position[0], position[1], position[2])
    );
    cameraLib[name].rotation.set(rotation.x, rotation.y, rotation.z);
    cameraLib[name].lookAt(lookAt);
    if (
      cameraLib[name] == "rightCameraLF" ||
      cameraLib[name] == "rightCameraRF"
    ) {
      let sphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.2, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0xffff00 })
      );
      sphere.position.set(position[0], position[1], position[2]);
      let rotSphere = new THREE.Mesh(
        new THREE.SphereBufferGeometry(0.2, 32, 32),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
      );
      rotSphere.position.set(rotation.x, rotation.y, rotation?.z);
    }
  }
  return {
    frontLCamera: cameraLib["frontLCamera"],
    frontRCamera: cameraLib["frontRCamera"],
    leftCameraLF: cameraLib["leftCameraLF"],
    leftCameraRF: cameraLib["leftCameraRF"],
    rightCameraLF: cameraLib["rightCameraLF"],
    rightCameraRF: cameraLib["rightCameraRF"],
  };
};

export default useProjectedCamera;
