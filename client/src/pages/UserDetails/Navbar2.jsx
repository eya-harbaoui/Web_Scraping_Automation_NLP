import "./NavbarStyles2.css";
import React from "react";
import { useState } from "react";
import { AiOutlineBars } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { BsRobot } from "react-icons/bs";
import { SiPowerautomate } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import { MenuLinks2 } from "./MenuLinks2";
import {Link,useNavigate} from "react-router-dom"
function Navbar() {
    const [clicked, setClicked] = useState(false);
    const navigate = useNavigate();
  
    const handleClick = () => {
      setClicked(!clicked);
    };
  
    const handleLogout = () => {
      window.localStorage.clear();
      navigate('/');
    };
  
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">
          <BsRobot className="robot-icon" />
          Web Scraping Automation
        </h1>
  
        <div className="menu-icons" onClick={handleClick}>
          {clicked ? (
            <GrClose className="closed-icon" />
          ) : (
            <AiOutlineBars className="closed-icon" />
          )}
        </div>
  
        <ul className={clicked ? "nav-menu active" : "nav-menu"}>
          {MenuLinks2.map((item, index) => {
            const IconComponent =
              item.icon === "AiOutlineLogout"
                ? AiOutlineLogout
                : item.icon === "SiPowerautomate"
                ? SiPowerautomate
                : null;
  
            // Render logout button separately
            if (item.icon === "AiOutlineLogout") {
              return (
                <li key={index}>
                  <Link className={item.cName} onClick={handleLogout} to="/">
                    {IconComponent && <IconComponent className="icon-nav" />}
                    {item.title}
                  </Link>
                </li>
              );
            }
  
            return (
              <li key={index}>
                <Link to={item.url} className={item.cName}>
                  {IconComponent && <IconComponent className="icon-nav" />}
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
  
  export default Navbar;
