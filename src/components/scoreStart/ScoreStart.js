import React from 'react';
import './scoreStart.scss'

function ScoreStart({start, score}) {
  return (
    <div className="score-restar">
    <div className="score">score: {score}</div>
    <button
      className="start"
      onClick={start}
    >
      restart
    </button>
  </div>
  );
}

export default ScoreStart;