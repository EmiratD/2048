import React from 'react';
import './gameOverModal.scss'

function GameOverModal({fn}) {
  return (
    <div className='modal'>
      <div className='lose'>game over :(</div>
      <button className='modal-btn' onClick={fn}>try again</button>
    </div>
  );
}

export default GameOverModal; 