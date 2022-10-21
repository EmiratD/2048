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

  //  генерация случайного места и цифр
  const creatNum = (matrix) => {
    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    if (matrix[rand1][rand2] === 0) {
      return matrix[rand1][rand2] = Math.random() > 0.1 ? 2 : 4;
    }
    return null;
  }
  // разметить число
  const getRandomNum = (bord) => {
    let newBord = cloneDeep(bord);
    creatNum(newBord);
    setArr(newBord);
  };

  // start
  const start = () => {
    let startBord = cloneDeep(mas);
    creatNum(startBord);
    creatNum(startBord);
    setArr(startBord);
  };

  // слайд и рассчет в нутри одной строки
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
  }

  function Left(bord) {
    let newBord = cloneDeep(bord);
    // проходимся по строкам
    for (let r = 0; r < rows; r++) {
      let row = newBord[r];
      row = slide(row);
      newBord[r] = row;
    }
    if (JSON.stringify(bord) !== JSON.stringify(newBord)) {
      getRandomNum(newBord);
    }

  }

  function Right(bord) {
    let newBord = cloneDeep(bord);
    for (let r = 0; r < rows; r++) {
      // разворачмывем строки
      let row = newBord[r];
      row.reverse();
      row = slide(row);
      newBord[r] = row.reverse();
    }
    if (JSON.stringify(bord) !== JSON.stringify(newBord)) {
      getRandomNum(newBord);
    }
  }

  function Up(bord) {
    let newBord = cloneDeep(bord);
    for (let c = 0; c < columns; c++) {
      //  меняем значение элементов строк и сталбцов
      let row = [newBord[0][c], newBord[1][c], newBord[2][c], newBord[3][c]];
      row = slide(row);
      for (let r = 0; r < rows; r++) {
        newBord[r][c] = row[r];
      }
    }
    if (JSON.stringify(bord) !== JSON.stringify(newBord)) {
      getRandomNum(newBord);
    }
  }

  function Down(bord) {
    let newBord = cloneDeep(bord);
    for (let c = 0; c < columns; c++) {
      let row = [newBord[0][c], newBord[1][c], newBord[2][c], newBord[3][c]];
      // разворачиваем новые строки
      row.reverse();
      row = slide(row);
      row.reverse();
      for (let r = 0; r < rows; r++) {
        newBord[r][c] = row[r];
      }
    }
    if (JSON.stringify(bord) !== JSON.stringify(newBord)) {
      getRandomNum(newBord);
    }
  }

  
  document.onkeydown = (e) => {
    if (e.keyCode == 37) {
      Left(arr);
    } else if (e.keyCode == 38) {
      Up(arr);
    } else if (e.keyCode == 39) {
      Right(arr);
    } else if (e.keyCode == 40) {
      Down(arr);
    }
  };
  
  useEffect(()=>{
    start(arr);
  }, []);

  return (
    <div className="game">
      <button className="btn start" onClick={()=>{start(arr)}}>restar</button>
      <div className="bord">{arrTile}</div>
      <div className="play-btn">
        <button className="btn" onClick={() => {Up(arr);}}>&#8593;</button>
        <div className="left-rihgt">
          <button className="btn"  onClick={() => {Left(arr);}}>&#8592;</button>
          <button className="btn" onClick={() => {Right(arr);}}>&#8594;</button>
        </div>
        <button className="btn" onClick={() => {Down(arr);}}>&#8595;</button>
      </div>
    </div>
  );
};

export default Bord;
