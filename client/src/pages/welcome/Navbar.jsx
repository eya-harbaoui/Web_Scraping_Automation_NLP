import "./NavbarStyles.css";
import React from "react";
import { FaHome } from "react-icons/fa";
import { BsFillExclamationCircleFill } from "react-icons/bs";
import { BiUserPin } from "react-icons/bi";
import { MenuLinks } from "./MenuLinks";
function Navbar() {
  return (
    <nav className="NavbarItems">
      <h1 className="navbar-logo">Web Scraping Automation</h1>
      <ul className="nav-menu">
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
                {IconComponent && <IconComponent/>}
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