import React from "react";
import { useSnapshot } from "valtio";

export default function Resizer({ state }) {
  return (
    <div className='image-controls'>
      <button
        className='button--scale scale__up'
        onClick={() => (state.scale = state.scale + 0.1)}
      >
        +
      </button>
      <button
        className='button--scale scale__down'
        onClick={() => (state.scale = state.scale - 0.1)}
      >
        -
      </button>
    </div>
  );
}
