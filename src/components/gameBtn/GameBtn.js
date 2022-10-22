import React from "react";
import'./gemaBtn.scss'

function GameBtn({arr, up, left, right, down}) {
  return (
    <div className="play-btn">
      <button
        className="btn"
        onClick={() => {up(arr)}}
      >
        &#8593;
      </button>
      <div className="left-rihgt">
        <button
          className="btn"
          onClick={() => {left(arr)}}
        >
          &#8592;
        </button>
        <button
          className="btn"
          onClick={() => {right(arr)}}
        >
          &#8594;
        </button>
      </div>
      <button
        className="btn"
        onClick={() => {down(arr)}}
      >
        &#8595;
      </button>
    </div>
  );
}

export default GameBtn;

