import React from "react";
import Navbar from "./Navbar";
import Robot from "./Robot";
import HomeCo from "./HomeCo";
import RImg from "./robot.svg";
import "./RobotStyles.css";
function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Robot
        cName="robot"
        RobotImg={RImg}
        title="It's all about automation !"
        text=""
      ></Robot>
      <HomeCo></HomeCo>
    </>
  );
}

export default Home;
