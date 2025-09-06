import { Router } from "express";
import { validateLogin } from "./Middleware/ValidateUser";
import { User } from "../Model/User";
import { searchByUsername } from "../Repository/UserRepository";
import {
  RepositoryError,
  RepositoryErrorType,
} from "../Repository/RepositoryError";
import { createToken } from "./Middleware/createToken";
import bcrypt from "bcrypt";

const loginController = Router();
loginController.post(
  "/",
  validateLogin,
  async (req, res, next) => {
    const { username, password } = req.body;
    let user: User;
    try {
      user = await searchByUsername(username);
    } catch (e) {
      if (e instanceof RepositoryError) {
        let status: number;
        const { message, errorType } = e;
        if (
          errorType === RepositoryErrorType.Empty ||
          errorType === RepositoryErrorType.NotFound
        ) {
          status = 404;
        } else {
          status = 400;
        }
        res.status(status).json({ message, errorType });
        return;
      } else {
        throw e;
      }
    }
    let result = await bcrypt.compare(password, user.passwordHash);
    if (result) {
      res.locals["payload"] = {
        username: user.username,
        name: user.name,
        id: user.id,
      };
      next();
    } else {
      res.status(400).json({ msg: "Wrong password" });
    }
  },
  createToken,
);
export { loginController };
