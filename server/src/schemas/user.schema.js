import joi from "joi";

// Joi Validation schema used to verify req data
export const RegisterSchema = joi.object().keys({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  userName: joi.string(),
  email: joi.string().required().email(),
  password: joi.string().min(6).required(),
  confirm_password: joi
    .any()
    .equal(joi.ref("password"))
    .required()
    .label("Confirm password")
    .messages({ "any.only": "Confirm Password does not match the password" }),
});

export const LoginSchema = joi.object().keys({
  email: joi.string().required().email(),
  password: joi.string().min(6).required()
});

