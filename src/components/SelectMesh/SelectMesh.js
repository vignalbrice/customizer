import React from "react";
import { useSnapshot } from "valtio";

const SelectMesh = ({ state }) => {
  const snap = useSnapshot(state);
  return (
    <div className='select-mesh'>
      {snap.items.map((m) => (
        <div className='card' onClick={() => (state.current = m.meshName)}>
          <h3>{m.meshName}</h3>
        </div>
      ))}
    </div>
  );
};

export default SelectMesh;
