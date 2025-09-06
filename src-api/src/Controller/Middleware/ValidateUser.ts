import { Request, Response, NextFunction } from "express";
import {
  LoginValidator,
  UserPostValidator,
} from "../../Model/Validators/UserValidator";
export const validateAddUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await UserPostValidator.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await LoginValidator.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
