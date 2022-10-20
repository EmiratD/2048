import React, { useEffect } from "react";
import { useState } from "react";
import cloneDeep from "lodash.clonedeep";

import Cill from "../cill/Cill";

import "./bord.scss";

const Bord = (props) => {
  let mas = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 2, 0],
    [0, 0, 0, 0],
  ];

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

  // рандоные появление цифр
  const getRandomNum = () => {
    let newMatrix = cloneDeep(arr);
    createRandomNum(newMatrix);
    createRandomNum(newMatrix);
    setArr(newMatrix);
    console.log(newMatrix);
  };
  // рандоиные месио и число 2 или 4
  const createRandomNum = (newMatrix) => {
    let added = false;
    let gridFull = false;
    let go = 0;
    while (!added) {
      if (gridFull) {
        break;
      }

      let rand1 = Math.floor(Math.random() * 4);
      let rand2 = Math.floor(Math.random() * 4);
      go++;
      if (newMatrix[rand1][rand2] === 0) {
        newMatrix[rand1][rand2] = Math.random() > 0.5 ? 2 : 4;
        added = true;
      }
    }
  };

  useEffect(() => {getRandomNum()}, []);

  return <div className="bord" onClick={()=>{
    
  }}>{arrTile}</div>;
};

export default Bord;
