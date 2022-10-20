import React from 'react';
import './cill.scss';

const Cill = ({cName, idNum, vel}) => {
  return (
    <div className='cill'>
      <div className={cName} id={idNum}>{vel}</div>
    </div>
  );
}

export default Cill;