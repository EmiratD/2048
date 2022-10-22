import React from 'react';
import './tile.scss';

const Tile = ({cName, idNum, vel}) => {
  return (
      <div className={cName} id={idNum}>{vel}</div>
  );
}

export default Tile;