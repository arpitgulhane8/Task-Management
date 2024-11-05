const User = require("../model/User");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const newUser = new User({
      name,
      email,
      password,
      contact: [],
    });

    await newUser.save();
    const token = newUser.generateAccessToken();

    res
      .status(201)
      .header("auth-token", token)
      .json({
        message: "User registered successfully",
        user: {
          name: newUser.name,
          email: newUser.email,
        },
        contact: newUser.contact,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser || !(await existingUser.comparePassword(password))) {
      return res.status(400).json({ message: "Wrong Email or Password" });
    }

    const token = existingUser.generateAccessToken();

    res
      .status(201)
      .header("auth-token", token)
      .json({
        message: "User logged in successfully",
        user: {
          name: existingUser.name,
          email: existingUser.email,
        },
        contact: existingUser.contact,
      });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.addContact = async (req, res) => {
  try {
    const userId = req.user._id;
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ message: "Please provide an email address." });
    }
    const user = await User.findById(userId);
    if (user.contact.includes(email)) {
      return res.status(400).json({ message: "Contact already added." });
    }
    user.contact.push(email);
    await user.save();

    return res.status(200).json({ message: "Contact added successfully." });
  } catch (error) {
    console.error("Error adding contact:", error);
    return res
      .status(500)
      .json({ message: "Server error. Please try again later." });
  }
};

exports.updateUser = async (req, res) => {
  const { name, email, password, newPassword } = req.body;
  console.log(name);
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (email) {
      const existingemail = await User.findOne({ email });
      if (existingemail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      user.email = email;
    }
    if (password) {
      const isMatch = await user.comparePassword(password);
      
      if (isMatch) {
        user.password = newPassword;
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    }

    await user.save();
    res
      .status(200)
      .json({
        message: "User updated successfully",
        user: { name: user.name, email: user.email },
      });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server error Please try again later.",
        error: error.message,
      });
  }
};
