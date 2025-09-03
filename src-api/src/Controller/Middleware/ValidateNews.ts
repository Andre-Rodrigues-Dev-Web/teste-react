import { Request, Response, NextFunction } from "express";
import { NewsPostValidator } from "../../Model/Validators/NewsValidator";
import { UUIDValidator } from "../../Model/Validators/UUIDValidator";
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

export const validateID = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await UUIDValidator.validateAsync(req.params["id"]);
    next();
  } catch (error) {
    res.status(400).json({
      message: "The ID provided in the URL must be a valid UUID",
    });
  }
};
