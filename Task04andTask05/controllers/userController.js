const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

/**
 * @desc Create Users
 * @route POST /api/users/
 * @access Public
 **/
const createUsers = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = new User({ name, email, password: hashPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get Users
 * @route Get /api/users/
 * @access Public
 **/
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get User
 * @route Get /api/users/:id
 * @access Public
 **/
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    user
      ? res.status(200).json(user)
      : res.status(400).json({ message: "user doesnt exist" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Update Users
 * @route Put /api/users/:id
 * @access Public
 **/
const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, password: hashPassword },
      {
        new: true,
      }
    );
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Delete Users
 * @route Delete /api/users/:id
 * @access Public
 **/
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * @desc Get Secure Resource (requires login)
 * @route get /api/users/secure-resource
 * @access Public
 **/
const getSecureResource = async (req, res) => {
  res.json({ message: "This is a secure resource." });
};

/**
 * @desc Login
 * @route Post /api/users/login
 * @access Public
 **/
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) {
      const result = await bcrypt.compare(password, user.password);

      if (result) {
        const token = jwt.sign(
          { email: user.email },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "1h",
          }
        );

        res.json({ token });
      } else {
        res.status(401).json({ message: "Invalid credentials." });
      }
    } else {
      res.status(401).json({ message: "User not found." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const userFunction = {
  createUsers,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
  getSecureResource,
  login,
};

module.exports = userFunction;
