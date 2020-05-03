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

  //custom hook to close the main nav when you press outide of it on mobile
  useOutsideClick(mainNav, closeMenu);

  // forces rerender to show or hide main nav when appropriate
  useEffect(() => {
    if (isMenuOpen) {
      mainNav.current.classList.add("show");
      mainNav.current.style.height = window.innerHeight;
    } else {
      mainNav.current.classList.remove("show");
    }
  }, [isMenuOpen]);

  return (
    <div className="main-nav shadow" ref={mainNav}>
      <ul className="nav-internal-links">
        <li>
          <NavLink to="./" exact onClick={closeMenu}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="./vlogs" exact onClick={closeMenu}>
            Vlogs
          </NavLink>
        </li>
        <li>
          <NavLink to="./OddsCalculator" onClick={closeMenu}>
            Calculator
          </NavLink>
        </li>
        <li>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://shopsorude.com/"
            onClick={closeMenu}
          >
            ShopSoRude
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
