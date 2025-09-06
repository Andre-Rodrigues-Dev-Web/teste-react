import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../../util";
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorizationHeader = req.headers["authorization"];

  if (!authorizationHeader) {
    res.status(401).json({ msg: "No authorization token provided" });
    return;
  }
  const split = authorizationHeader.split(" ");
  if (split.length !== 2) {
    res.status(400).json({ msg: "Invalid authorization bearer token" });
    return;
  }
  const token = split[1];

  jwt.verify(token || "", jwtSecret(), (error, _) => {
    if (error) {
      res.status(401).json({ error });
    } else {
      next();
    }
  });
};
