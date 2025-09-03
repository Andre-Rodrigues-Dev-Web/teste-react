import Joi from "joi";

export const UUIDValidator = Joi.string().uuid().required();
