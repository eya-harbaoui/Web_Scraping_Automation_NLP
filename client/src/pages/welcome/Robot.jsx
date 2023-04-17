import React from 'react'
import "./RobotStyles.css";
function Robot(props) {
  return (
    <>
      <div className={props.cName}>
        <img src={props.RobotImg} alt="RobotImg" />
        <div className="robot-text">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </div>
      </div>
    </>
  );
}

export default Robot