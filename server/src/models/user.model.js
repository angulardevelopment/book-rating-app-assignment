import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
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
    refreshToken: {
      type: String,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Only hash the password if it has been modified
  }
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  if (!enteredPassword) throw new Error("Password is missing, can not compare");

  try {
    console.log("Entered password:", enteredPassword);
    console.log("Stored password hash:", this.password);

    const result = await bcrypt.compare(enteredPassword, this.password);
    return result;
  } catch (e) {
    throw new Error("Error while comparing password: " + e.message);
    // return res.json({
    //   Success: false,
    //   message: "Error while comparing password!",
    //   error: e.message,
    // });
  }
};


userSchema.methods.toJSON = function () {
  const userData = this.toObject();

  delete userData.password;
  delete userData.deleted;
  return userData;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
