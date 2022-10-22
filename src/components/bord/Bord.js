import React, { useEffect, useState } from "react";

import "./bord.scss";

const Bord = ({arrTile}) => {
 
  return (
      <div className="bord">{arrTile}</div>
  );
};

export default Bord;
