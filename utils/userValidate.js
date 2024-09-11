const Yup = require("yup");

const registerValidation = Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().email().required("Email is a required field!!"),
    password: Yup.string().min(5).required("Password is a required field"),
});

module.exports = registerValidation;
