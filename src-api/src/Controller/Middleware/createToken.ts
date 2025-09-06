import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { jwtSecret } from "../../util";
export const createToken = (_: Request, res: Response) => {
  const payload: { name: string; username: string; id: string } =
    res.locals["payload"];
  jwt.sign(payload, jwtSecret(), (error, encoded) => {
    if (error) {
      res.status(500).json({ error });
      return;
    }
    if (encoded) {
      res.status(201).json({
        token: encoded,
        username: payload.username,
        name: payload.name,
        id: payload.id,
      });
      return;
    }
    res
      .status(500)
      .json({ msg: "Couldn't encode user password nor determine an error" });
  });
};
