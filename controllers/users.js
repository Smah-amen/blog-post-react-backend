const generateToken = require("../utils/generateToken");
const { compare } = require("bcrypt");
const  registerValidation  = require("../utils/userValidate");
const UserModel = require("../models/user");

const register = async (req, res) => {
    await registerValidation.validate(req.body);

    const { name, email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
        return res.status(409).send("This email exists!!");
    const newUser = await UserModel.create({ name, email, password });

    res.status(201).send({
        id: newUser._id,
        email: newUser.email,
        token: await generateToken(newUser._id),
    });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser && (await compare(password, existingUser.password))) {
        return res.send({
            id: existingUser._id,
            email: existingUser.email,
            token: await generateToken(existingUser._id),
        });
    }
    res.status(401).send("Incorrect username or password");
};

module.exports = { register, login };
