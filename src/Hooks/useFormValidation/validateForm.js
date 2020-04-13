const validateForm = (values, oldErrors = {}, name) => {
	const errors = { ...oldErrors };
	if (name === "email" || name === "submit") {
		if (!values.email) {
			errors.email = "*Requred";
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
			errors.email = "*Invalid email address";
		} else {
			delete errors.email;
		}
	}

	if (name === "name" || name === "submit") {
		if (!values.name) {
			errors.name = "*Required";
		} else if (values.name.length < 3) {
			errors.name = "*Name must be a minimum of 3 characters";
		} else {
			delete errors.name;
		}
	}

	if (name === "message" || name === "submit") {
		if (!values.message) {
			errors.message = "*Required";
		} else if (values.message.length < 10) {
			errors.message = "*Message must be a minimum of 10 characters";
		} else {
			delete errors.message;
		}
	}

	return errors;
};

export default validateForm;
