import { Router } from "express";
import { validateAddUser } from "./Middleware/ValidateUser";
import { addUser, usernameExists } from "../Repository/UserRepository";
import bcrypt from "bcrypt";
import { createToken } from "./Middleware/createToken";
const userController = Router();
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
    let addedUser = await addUser({ name, username, passwordHash });
    res.locals["payload"] = { username, name, id: addedUser.id };
    next();
  },
  createToken,
);
export { userController };
