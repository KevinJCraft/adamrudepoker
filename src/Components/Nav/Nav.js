import React, { useContext, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MenuContext } from "../../Context/MenuContext";

import "./nav.css";
import useOutsideClick from "../../Hooks/useOutsideClick";

const Nav = () => {
  const mainNav = useRef();
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useOutsideClick(mainNav, closeMenu);

  useEffect(() => {
    if (isMenuOpen) {
      mainNav.current.classList.add("show");
      mainNav.current.style.height = window.innerHeight;
    } else {
      mainNav.current.classList.remove("show");
    }
  }, [isMenuOpen]);

  return (
    <div className="main-nav" ref={mainNav}>
      <ul className="nav-internal-links">
        <li>
          <NavLink to="./" exact onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="./vlogs" onClick={closeMenu}>
            Vlogs
          </NavLink>
        </li>
        <li>
          <NavLink to="./OddsCalculator" onClick={closeMenu}>
            Calculator
          </NavLink>
        </li>
        <li>
          <NavLink to="./contactme" onClick={closeMenu}>
            Contact Me
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
