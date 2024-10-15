import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  userName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: [true, "A user must have an email"],
  },
  password: {
    type: String,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
},
{timeStamps: true}
);

userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
});

userSchema.methods.matchPassword = async function (password) {
  if (!password) throw new Error("Password is missing, can not compare");

  try {
    // console.log(password);
    const result = await bcrypt.compare(password, this.password);
    return result;
  } catch (e) {
      return res.json({ 
        Success: false, 
        message: 'Error while comparing password!', 
        error: e.message})
  }
};

userSchema.methods.matchPassword = async function (password) {
    if(!password) throw new Error("Password is missing, can not compare");

    try {
        const result = await bcrypt.compare(password, this.password);
        return result;
    } catch (e) {
        return resizeBy.json({
            success: false,
            messsage: 'Error while comparing password!',
            error: e.message
        })
    }
}

userSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.password;
  delete userData.deleted;
  delete userData.verification_code;
  return userData;
};

const userModel = mongoose.model("User", userSchema)

export default userModel
