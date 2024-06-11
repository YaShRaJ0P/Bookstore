import User from "../models/userModel.js";

export const AddUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || username.length <= 3)
      return res.status(400).send("Username should be more than 3 letters.");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send("Please enter valid Email ID.");
    }

    if (!password || password.length < 8) {
      return res.status(400).send("Please enter valid password.");
    }
    const user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    };
    const savedUser = await User.create(user);
    res.status(201).send(savedUser);
  } catch (error) {
    res.status(500).send({ message: "Server Error." });
  }
};

export const GetUsers = async (req, res) => {
  await User.find()
    .then((users) => {
      res.status(500).send({ length: users.length, data: users });
    })
    .catch(() => {
      res.status(500).send({ message: "Server Error." });
    });
};

export const GetUserById = async (req, res) => {
  try {
    const user = User.findById(req.params.id);
    res.status(500).send(user);
  } catch (error) {
    res.status(500).send({ message: "User not Found" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || username.length <= 3)
      return res.status(400).send("Username should be more than 3 letters.");

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).send("Please enter valid Email ID.");
    }

    if (!password || password.length < 8) {
      return res.status(400).send("Please enter valid password.");
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!updatedUser) res.status(500).send({ message: "User not Found" });
    return res.status(200).send({ message: "User Updated Successfully." });
  } catch (error) {
    res.status(500).send({ message: "User not Found" });
  }
};

export const DeleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id)
    .then(() => {
      return res.status(200).send("User deleted successfully.");
    })
    .catch(() => {
      res.status(500).send({ message: "User not Found" });
    });
};
