import React, { useContext } from "react";
import { MenuContext } from "../../Context/MenuContext";
import "./menuButton.css";

const MenuButton = () => {
	const { setIsMenuOpen } = useContext(MenuContext);

	const handleClick = () => {
		setIsMenuOpen(prev => !prev);
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};

	return (
		<div className="menu-button-container">
			<button onClick={handleClick}>&#9776;</button>
		</div>
	);
};

export default MenuButton;
