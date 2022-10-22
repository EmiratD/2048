import React, { useEffect, useState } from "react";
import cloneDeep from "lodash.clonedeep";

import Tile from "../tile/Tile";
import WinModal from "../winModal/WinModal";
import GameOverModal from "../gameOverModal/GameOverModal";
import ScoreStart from "../scoreStart/ScoreStart";
import GameBtn from "../gameBtn/GameBtn";

import "./bord.scss";

const Bord = () => {
  let mas = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  let rows = 4;
  let columns = 4;

  // изменение борда
  const [arr, setArr] = useState(mas);

  // проверка на победу
  const [win, setWin] = useState(false);

  // проверка на поражение
  const [goUp, setGoUp] = useState(false);
  const [goRight, setGoRight] = useState(false);
  const [goLeft, setGoLeft] = useState(false);
  const [goDown, setGoDown] = useState(false);

  // рендер плиток
  const arrTile = [];
  arr.map((el1, idx1) =>
    el1.map((el2, idx2) => {
      const value = el2 === 0 ? null : el2;
      arrTile.push(
        <Tile
          cName={`tile tile${el2}`}
          id={`${idx1}-${idx2}`}
          vel={value}
          key={`${idx1}-${idx2}`}
        />
      );
    })
  );

  // результат
  const [score, setScore] = useState(0);
  const result = (arr) => {
    let sum = 0;
    arr.map((el) =>
      el.map((item) => {
        if (item === 2048) {
          setWin(true);
        } else {
          sum += item;
        }
      })
    );
    setScore(sum);
  };

  // генерация случайного места и цифр
  const creatNum = (bord) => {
    let rand1 = Math.floor(Math.random() * 4);
    let rand2 = Math.floor(Math.random() * 4);
    if (bord[rand1][rand2] === 0) {
      return (bord[rand1][rand2] = Math.random() > 0.1 ? 2 : 4);
    }
    return null;
  };
  // разметить число
  const getRandomNum = (bord) => {
    let newBord = cloneDeep(bord);
    creatNum(newBord);
    setArr(newBord);
  };

  // обнуление борда
  const start = (bord) => {
    let startBord = cloneDeep(bord);
    creatNum(startBord);
    creatNum(startBord);
    setArr(startBord);
  };

  // слайд и рассчет в нутри одной строки
  function slide(row) {
    row = row.filter((num) => num !== 0);
    for (let i = 0; i < row.length - 1; i++) {
      if (row[i] === row[i + 1]) {
        row[i] *= 2;
        row[i + 1] = 0;
      }
    }
    row = row.filter((num) => num !== 0);
    while (row.length < columns) {
      row.push(0);
    }
    return row;
  }

  function left(bord) {
    let newBord = cloneDeep(bord);
    // проходимся по строкам
    for (let r = 0; r < rows; r++) {
      let row = newBord[r];
      row = slide(row);
      newBord[r] = row;
    }
    if (JSON.stringify(bord) !== JSON.stringify(newBord)) {
      getRandomNum(newBord);
      setGoLeft(false);
    } else {
      setGoLeft(true);
    }
  }

  function right(bord) {
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
      setGoRight(false);
    } else {
      setGoRight(true);
    }
  }

  function up(bord) {
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
      setGoUp(false);
    } else {
      setGoUp(true);
    }
  }

  function down(bord) {
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
      setGoDown(false);
    } else {
      setGoDown(true);
    }
  }

  document.onkeydown = (e) => {
    if (e.keyCode === 37) {
      left(arr);
    } else if (e.keyCode === 38) {
      up(arr);
    } else if (e.keyCode === 39) {
      right(arr);
    } else if (e.keyCode === 40) {
      down(arr);
    }
  };

  useEffect(() => {
    start(mas);
  }, []);

  useEffect(() => {
    result(arr);
  }, [arr]);

  return (
    <div className="game">
      {win ? (
        <WinModal
          fn={() => {
            start(mas);
            setWin(false);
          }}
        />
      ) : null}
      {goDown && goLeft && goRight && goUp ? (
        <GameOverModal
          fn={() => {
            start(mas);
            setGoDown(false);
          }}
        />
      ) : null}
      <ScoreStart
        start={() => {
          start(mas);
        }}
        score={score}
      />
      <div className="bord">{arrTile}</div>
      <GameBtn up={up} left={left} right={right} down={down} arr={arr} />
    </div>
  );
};

export default Bord;
