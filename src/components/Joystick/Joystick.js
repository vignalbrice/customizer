import React from "react";
import { Joystick as JoystickController } from "react-joystick-component";

export default function Joystick({ state }) {
  const onChangeJoystick = (e) => {
    state.dragStart = {
      x: -e.x / 40,
      y: -e.y / 40,
    };
  };

  function handleMouseDown(e) {}
  return (
    <div className='joystick'>
      <JoystickController
        size={100}
        baseColor='red'
        stickColor='blue'
        move={onChangeJoystick}
        stop={handleMouseDown}
      ></JoystickController>
    </div>
  );
}
