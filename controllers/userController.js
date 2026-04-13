const joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const ActivityLog = require("../models/ActivityLog");
const sendEmail = require("../utils/sendEmail");

const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1 day" }
  );
};

const register = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().min(2).max(25).required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, name, password } = req.body;
    const users = await User.findOne({ email });
    if (users)
      return res.status(400).json("user with this email already exists.");

    const new_user = new User({
      name,
      email,
      password,
    });
    const user = await new_user.save();

    // Log Activity
    await ActivityLog.create({
      action: "User Registered",
      user: user._id,
      details: `New user ${name} registered.`
    });

    if (user) {
      const token = jwt.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          phone: user.phone,
          photo: user.photo,
          admin: user.admin,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1 day" }
      );

      // const token = generateToken(user._id)
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "lax", // Changed from "none" to "lax" for localhost
        secure: false, // Changed from true to false for localhost HTTP
      });
      return res.status(201).json(token);
    } else {
      return res.status(400);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(400).json("wrong email password combination");

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword)
      return res.status(400).json("wrong email password combination");

    if (user) {
      const token = jwt.sign(
        {
          _id: user._id,
          email: user.email,
          admin: user.admin,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1 day" }
      );

      // const token = generateToken(user._id)

      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "lax",
        secure: false,
      });
      return res.status(200).json(token);
    } else {
      return res.status(400).json("wrong email password combination");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const logout = async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "lax",
    secure: false,
  });
  return res.status(200).json({ message: "You have been logged out." });
};

const user = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json(`user was not found`);

    if (user) {
      const { _id, name, email, photo, phone, bio } = user;

      return res.status(200).json({
        _id,
        name,
        email,
        photo,
        phone,
        bio,
      });
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const loggedIn = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }

    const verified = jwt.verify(token, process.env.SECRET_KEY);
    if (verified) {
      return res.json(true);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const updateProfile = async (req, res) => {
  try {
    const schema = joi.object({
      name: joi.string().min(2).max(25).required(),
      email: joi.string().required().email(),
      password: joi.string().min(6).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) res.status(400).json(error.details[0].message);

    const user = await User.findById(req.user._id);

    if (user) {
      const { name, email, bio, photo, phone } = user;
      (user.email = email), (user.name = req.body.name || name);
      user.photo = req.body.photo || photo;
      user.phone = req.body.phone || phone;
      user.bio = req.body.bio || bio;

      const update_user = await user.save();

      const updated = jwt.sign(
        {
          _id: update_user._id,
          name: update_user.name,
          email: update_user.email,
          photo: update_user.photo,
          phone: update_user.phone,
          bio: update_user.bio,
          admin: update_user.admin,
        },
        process.env.SECRET_KEY
      );

      return res.json(updated);
    } else {
      res.status(404);
      throw new Error("user was not found.");
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const changePassword = async (req, res) => {
  try {
    const schema = joi.object({
      password: joi.string().min(6).required(),
      oldPassword: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400);
      throw new Error("user was not found");
    }

    const { password, oldPassword } = req.body;

    if (!password || !oldPassword) {
      res.status(400);
      throw new Error("old and new password fields are required");
    }

    const checkPassword = await bcrypt.compare(oldPassword, user.password);

    if (!checkPassword)
      return res
        .status(400)
        .json("The password you entered doesnot match your current password.");

    if (user && checkPassword) {
      user.password = password;
      await user.save();
      res.status(200).json("Password has been changed.");
    } else {
      res.status(400);
      throw new Error(
        "The password you entered doesnot match your current password."
      );
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400);
      throw new Error("The user doesnot exist.");
    }

    //delete token if it exists
    const token = await Token.findOne({
      userId: user.user_id,
    });

    if (token) {
      await token.deleteOne();
    }

    let resetToken = crypto.randomBytes(32).toString("hex") + user._id;
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    await new Token({
      userId: user._id,
      token: hashedToken,
      createdAt: Date.now(),
      expiresAt: Date.now() + 30 * (60 * 1000), //30 mins
    }).save();

    const reset_url = `${process.env.CLIENT}/reset-password/${resetToken}`;

    const message = `
                <h2>Hello ${user.name}</h2>
                <p>Please click on the link below to reset your password.</p>
                <p>
                    <h4>Note:</h4>
                     This reset link is valid for only 30 minutes
                </p>
                <a href=${reset_url} clicktracking=Off>${reset_url}</a>
                <p>Regards,</p>
                <p>The inventory system team</p>
        `;

    const subject = "Password Reset";
    const send_to = user.email;
    const sent_from = process.env.EMAIL_USER;

    try {
      await sendEmail(subject, message, send_to, sent_from);
      return res
        .status(200)
        .json({ success: true, message: "Email has been sent." });
    } catch (error) {
      return res.status(500).json("Email was not sent " + error.message);
    }
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    const { resetToken } = req.params;

    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    //find token
    const userToken = await Token.findOne({
      token: hashedToken,
      expiresAt: { $gt: Date.now() },
    });

    if (!userToken) {
      res.status(404);
      throw new Error("The token is invalid or has expired.");
    }

    //find user

    const user = await User.findOne({
      _id: userToken.userId,
    });

    user.password = password;
    await user.save();

    return res.status(200).json("password has been reset. You can now login.");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("-password");
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json("User not found");
    return res.status(200).json("User deleted successfully");
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

module.exports = {
  register,
  login,
  logout,
  user,
  loggedIn,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
};
