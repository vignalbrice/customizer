import { Vector3 } from "three";

const cameraLibrary = [
  {
    name: "frontRCamera",
    side: "Right",
    position: [-0.76, 1, 4],
    lookAt: new Vector3(-0.75, 0, -1),
    rotation: {
      x: -0.5,
      y: 0.02,
      z: 0,
    },
  },
  {
    name: "frontLCamera",
    side: "Left",
    position: [0.82, 0.88, 4],
    lookAt: new Vector3(-0.75, 0, -1),
    rotation: {
      x: -0.467,
      y: 0.109,
      z: 0,
    },
  },
  {
    name: "leftCameraRF",
    side: "Right",
    position: [-5.01, -0.65, -0.5],
    lookAt: new Vector3(5, 1, -1.2),
    rotation: {
      x: 1.68,
      y: -1.409,
      z: 1.165,
    },
  },
  {
    name: "rightCameraRF",
    side: "Right",
    position: [4.5, 0.12, -0.124],
    lookAt: new Vector3(0, 1, 0),
    rotation: {
      x: -2.59,
      y: 1.54,
      z: 3.08,
    },
  },
  {
    name: "leftCameraLF",
    side: "Left",
    position: [6, -0.06, 0],
    lookAt: new Vector3(5, 1, -1.2),
    rotation: {
      x: 1,
      y: 1.57,
      z: -0.438,
    },
  },
  {
    name: "rightCameraLF",
    side: "Left",
    position: [-6, -0.65, -0.6],
    lookAt: new Vector3(0, 1, 0),
    rotation: {
      x: 1.68,
      y: -1.409,
      z: 1.165,
    },
  },
];

export default cameraLibrary;
