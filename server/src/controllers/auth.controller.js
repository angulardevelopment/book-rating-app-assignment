import userModel from "../models/user.model.js";
import {
  encode_jwt,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt.util.js";

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
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const existingUser = await userModel.findOne({
      email: email.toLowerCase(),
      deleted: false,
    });
    console.log("existingUser", existingUser);
    if (!existingUser)
      return res.status(404).json({ message: "User does not exist" });

    const checkPassword = await existingUser.matchPassword(password);
    console.log('checkPassword', checkPassword)
    if (!checkPassword)
      return res.status(400).json({ message: "Check your Password" });

    const accessToken = encode_jwt({ _id: existingUser._id });
    console.log('accessToken', accessToken)
    const refreshToken = generateRefreshToken({ _id: existingUser._id });
    console.log('refreshToken', refreshToken)

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).json({
      accessToken: accessToken,
      Token_Type: "Bearer",
      USER_ID: existingUser._id,
    });
  } catch (error) {
    // throw new Error(error)
    res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const User = await userModel.findById({
      _id: id,
      // deleted: false
    });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({
      User,
    });
  } catch (error) {
    res.status(500).json({ message: "Error getting user:" });
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const { page = 1 } = req.query;
    const limit = parseInt(req.query.limit) || 9;
    const skip = (page - 1) * limit;

    const getUsers = await userModel
      .find({ deleted: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const userCount = await userModel.countDocuments(getUsers);
    res.json({
      success: true,
      message: "Users fetched Successfully",
      page,
      limit,
      skip,
      userCount,
      getUsers,
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
        return res.status(403).json({
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

export const refreshAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken", refreshToken);
  if (!refreshToken)
    return res.status(403).json({
      message: "Refresh token not found",
    });

  // verify refresh token
  const { decoded, expired } = verifyRefreshToken(refreshToken);
  console.log("decoded", decoded);

  if (expired) {
    return res.status(403).json({ message: "Refresh token expired" });
  }

  const user = await userModel.findById(decoded._id);
  console.log("user", user);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newAccessToken = encode_jwt({ _id: user._id });

  res.status(200).json({
    accessToken: newAccessToken,
  });
};

export const logout = async (req, res) => {

  try {

    const user = await userModel.findById(req.user);
    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    user.refreshToken = null;
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
