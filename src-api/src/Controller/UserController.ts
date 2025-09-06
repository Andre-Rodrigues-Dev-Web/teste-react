import { Router } from "express";
import { validateAddUser, validateLogin } from "./Middleware/ValidateUser";
import {
  addUser,
  searchByUsername,
  usernameExists,
} from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../Model/User";
import {
  RepositoryError,
  RepositoryErrorType,
} from "../Repository/RepositoryError";
import { jwtSecret } from "../util";
const userController = Router();
const createToken = (_: Request, res: Response) => {
  const payload: { name: string; username: string } = res.locals["payload"];
  jwt.sign(payload, jwtSecret(), (error, encoded) => {
    if (error) {
      res.status(500).json({ error });
      return;
    }
    if (encoded) {
      res.status(201).json({ token: encoded });
      return;
    }
    res
      .status(500)
      .json({ msg: "Couldn't encode user password nor determine an error" });
  });
};
userController.post(
  "/login",
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
      res.locals["payload"] = { username, password };
      next();
    } else {
      res.status(400).json({ msg: "Wrong password" });
    }
  },
  createToken,
);
userController.post(
  "/",
  validateAddUser,
  async (req, res, next) => {
    const { name, username, password } = req.body;
    if (await usernameExists(username)) {
      res
        .status(409)
        .json({ msg: `A user with username "${username}" already exists` });
      return;
    }
    let passwordHash = await bcrypt.hash(password, 10);
    await addUser({ name, username, passwordHash });
    res.locals["payload"] = { username, password };
    next();
  },
  createToken,
);
export { userController };
