import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";

import styles from "./styles.module.css";

import { links } from "./data";

import { GoLaw } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { BiLogIn } from "react-icons/bi";
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <nav className={styles.navhome}>
      <div className={styles.navCenter}>
        <div className={styles.navHeader}>
          <div className={styles.divparent}>
            <div className={styles.divlogo}></div>
            <div className={styles.divlogo}>
              <h3>Web Scraping Automation</h3>
            </div>
          </div>
          <button
            className={styles.navToggle}
            onClick={toggleLinks}
          ></button>
        </div>
        <div className={styles.linksContainer} ref={linksContainerRef}>
          <ul className={styles.links} ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
