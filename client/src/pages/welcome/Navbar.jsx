import "./NavbarStyles.css";
import React from "react";
import { useState } from "react";
import { FaHome } from "react-icons/fa";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BiUserPin } from "react-icons/bi";
import {AiOutlineBars} from "react-icons/ai";
import {GrClose} from "react-icons/gr";
import { MenuLinks } from "./MenuLinks";
function Navbar() {
  //if we click on our toggle icon we will show the navbar links for screens size less then
  //850px
  const [clicked, setClicked] = useState(false);
  const handleClick=()=>{
    setClicked(!clicked);
  }

  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Web Scraping Automation</h1>
      <div className="menu-icons" onClick={handleClick
      }>
        
        {clicked ? <GrClose></GrClose> : <AiOutlineBars></AiOutlineBars>}
      </div>

      <ul className={clicked? "nav-menu active":"nav-menu"}>
        {MenuLinks.map((item, index) => {
          //display icons according to their names in menuLinks list
          const IconComponent =
            item.icon === "FaHome"
              ? FaHome
              : item.icon === "BsFillExclamationCircleFill"
              ? BsFillExclamationCircleFill
              : item.icon === "BiUserPin"
              ? BiUserPin
              : null;

          return (
            <li key={index}>
              <a href={item.url} className={item.cName}>
                {IconComponent && <IconComponent />}
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default Navbar;
