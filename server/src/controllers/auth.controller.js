import userModel from "../models/user.model.js";
import { encode_jwt } from "../utils/jwt.util.js";

export const register = async(req, res) => {
    try {
        const userInfo = req.body
        userInfo.email = userInfo.email.toLowerCase();
        userInfo.userName = userInfo.userName.toLowerCase();

        const [existingEmail, existingUserName] = await Promise.all(
            [
              userModel.findOne({ email: userInfo.email }),
              userModel.findOne({ userName: userInfo.userName }),
            ]
          );
      
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
     
        const user = await userModel.create(userInfo)

        res.status(200).json({
            success: true,
            message: user
        })
    }
    catch(error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export const login = async (req, res) => {
    const {email, password} = req.body;

    try {
        const existingUser = await userModel.findOne({
            email: email,
            deleted: false
        })
        if(!existingUser)
            return res.status(404).json({ message: "User does not exist"});

        const checkPassword = await existingUser.matchPassword(password);
        if(!checkPassword)
            return res.status(400).json({message: "Check your Password"});

        const token = encode_jwt({_id: existingUser._id})

        res.status(200).json({
            token: token,
            Token_Type: "Bearer",
            USER_ID: existingUser._id,
          });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}