import userModel from "../models/user.model.js";
import { encode_jwt } from "../utils/jwt.util.js";

export const register = async (req, res) => {
  try {
    const userInfo = req.body;
    userInfo.email = userInfo.email.toLowerCase();
    userInfo.userName = userInfo.userName.toLowerCase();

    const [existingEmail, existingUserName] = await Promise.all([
      userModel.findOne({ email: userInfo.email }),
      userModel.findOne({ userName: userInfo.userName }),
    ]);

    if (existingEmail) {
      return res.status(403).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    if (existingUserName) {
      return res.status(403).json({
        success: false,
        message: "User with this username already exists",
      });
    }

    const user = await userModel.create(userInfo);

    res.status(200).json({
      success: true,
      message: user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({
      email: email,
    //   deleted: false,
    });
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const checkPassword = await existingUser.matchPassword(password);
    if (!checkPassword)
      return res.status(400).json({ message: "Check your Password" });

    const token = encode_jwt({ _id: existingUser._id });

    res.status(200).json({
      token: token,
      Token_Type: "Bearer",
      USER_ID: existingUser._id,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  const { _id } = req.user;
  const updateData = req.body;

  try {
    // Check if selected email is already taken
    if (updateData.email) {
      const emailAvailable = await userModel.findOne({
        email: updateData.email,
        deleted: false,
      });

      // throws an error if the username selected is taken
      if (emailAvailable) {
        return res
          .status(403)
          .json({
            success: false,
            message: "User with updated email already exists",
          });
      }
    }

    const updatedData = await userModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedData,
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findById(id);
    await userModel.findByIdAndDelete(id);

    res.json({
      success: "true",
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};
