import React from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";
import Navbar from "./navhome";
let firstRender = true;
axios.defaults.withCredentials = true;

function Welcome() {
  const gridStyle = {
    width: "200",
    height: "1000",

    textAlign: "center",
  };
 

  return (
    <div style={{ backgroundColor: "white" }}>
      <Navbar></Navbar>
    </div>
    
  );
}

export default Welcome;
