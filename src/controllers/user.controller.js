const User = require("../models/user.model");

const addUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const result = await User.find();
    res.status(200).json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addUser, getUsers };
