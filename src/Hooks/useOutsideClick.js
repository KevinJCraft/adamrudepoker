import { useEffect } from "react";

const useOutsideClick = (ref, action) => {
	const handleClickOutside = event => {
		if (
			ref.current &&
			!ref.current.contains(event.target) &&
			ref.current.classList.contains("show")
		) {
			action();
		}
	};

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	});
};

export default useOutsideClick;
