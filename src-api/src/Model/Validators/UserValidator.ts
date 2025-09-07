import Joi from "joi";

export const UserPostValidator = Joi.object({
  name: Joi.string()
    .trim()
    .regex(/^[A-Za-z0-9À-ÿ ]+$/i)
    .min(3)
    .required(),
  username: Joi.string().trim().alphanum().min(3).required(),
  password: Joi.string().trim().min(3).required(),
}).required();

export const LoginValidator = Joi.object({
  username: Joi.string().trim().alphanum().min(3).required(),
  password: Joi.string().trim().min(3).required(),
}).required();
