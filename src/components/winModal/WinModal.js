import React from 'react';
import './winmodal.scss'

function WinModal({fn}) {
  return (
    <div className='modal'>
      <div className='win'>You win! :D</div>
      <button className='modal-btn' onClick={fn}>play agen</button>
    </div>
  );
}

export default WinModal; 