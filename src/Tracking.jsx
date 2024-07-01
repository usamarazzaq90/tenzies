import React from "react";

function Tracking(props) {
  return (
    <div className="track--record">
      <p>No. of Rolls : {props.totalRolls} </p>
    </div>
  );
}

export default Tracking;
