import React, { useEffect } from "react";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";

import Cill from "../cill/Cill";

import "./bord.scss";

const Bord = (props) => {
  let mas = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  let score = 0;
  let rows = 4;
  let columns = 4;

  const [arr, setArr] = useState(mas);

  // рендер плиток
  const arrTile = [];
  arr.map((el1, idx1) =>
    el1.map((el2, idx2) => {
      const value = el2 === 0 ? null : el2;
      arrTile.push(
        <Cill
          cName={`tile tile${el2}`}
          id={`${idx1}-${idx2}`}
          vel={value}
          key={`${idx1}-${idx2}`}
        />
      );
    })
  );

  // // рандоиные месио и число 2 или 4
  const getRandomNum = () => {
    let newMatrix = cloneDeep(arr);

    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    if (newMatrix[rand1][rand2] === 0) {
      newMatrix[rand1][rand2] = Math.random() > 0.1 ? 2 : 4;
    }
    setArr(newMatrix);
  };

  // слайд внутри строки
  function slide(row) {
    row = row.filter((num) => num != 0);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] == row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
        score += row[i];
      }
    }
    row = row.filter((num) => num != 0);
    while (row.length < columns) {
      row.push(0);
    }
    return row;
  };

  function Left() {
    for (let r = 0; r < rows; r++) {
      let row = arr[r];
      row = slide(row);
      arr[r] = row;
    }
    setArr(arr);
  };

  function Right() {
    for (let r = 0; r < rows; r++) {
      let row = arr[r];
      row.reverse();
      row = slide(row);
      arr[r] = row.reverse();
    }
    setArr(arr);
  };

  function Up() {
    for (let c = 0; c < columns; c++) {
      let row = [arr[0][c], arr[1][c], arr[2][c], arr[3][c]];
      row = slide(row);
      for (let r = 0; r < rows; r++) {
        arr[r][c] = row[r];
      }
    }
    setArr(arr);
  };

  function Down() {
    for (let c = 0; c < columns; c++) {
      let row = [arr[0][c], arr[1][c], arr[2][c], arr[3][c]];
      row.reverse();
      row = slide(row);
      row.reverse();
      for (let r = 0; r < rows; r++) {
        arr[r][c] = row[r];
      }
    }
    setArr(arr);
  };

  return (
    <>
      <div className="bord">{arrTile}</div>
      <button
        onClick={() => {
          Left();
          getRandomNum();
          getRandomNum();
        }}
      >
        left
      </button>
      <button
        onClick={() => {
          Right();
          getRandomNum();
          getRandomNum();
        }}
      >
        right
      </button>

      <button
        onClick={() => {
          Up();
          getRandomNum();
          getRandomNum();
        }}
      >
        up
      </button>
      <button
        onClick={() => {
          Down();
          getRandomNum();
          getRandomNum();
        }}
      >
        down
      </button>
    </>
  );
};

export default Bord;
