import Joi from "joi";

export const NewsPostValidator = Joi.object({
  title: Joi.string().trim().required(),
  author: Joi.string().trim().required(),
  content: Joi.string().trim().required(),
});
