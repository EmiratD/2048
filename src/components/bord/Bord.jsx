import React from 'react';
import './bord.scss';
import Cill from '../cill/Cill';
import { useState } from 'react';


const Bord = (props) => {

  let mas = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];

  const [arr, setArr] = useState(mas);

  const arrTile = [];

  arr.map((el1, idx1)=> el1.map((el2,idx2) => {
    if()
    arrTile.push(<Cill className={'tile ' + 'tile'+el2} id={idx1+'-'+idx2} vel={el2} key={idx1+'-'+idx2}/>);
  }));




  return (
    <div className='bord'>
      {arrTile}
    </div>
  );
}

export default Bord;