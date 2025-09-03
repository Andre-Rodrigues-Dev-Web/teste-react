import { Request, Response, NextFunction } from "express";
import { NewsPostValidator } from "../../Model/Validators/NewsValidator";
export const validateAddNews = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await NewsPostValidator.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    res.status(400).json({ error });
  }
};
