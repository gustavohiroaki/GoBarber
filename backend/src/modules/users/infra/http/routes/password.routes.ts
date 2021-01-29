import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import ForgotPasswordController from "@modules/users/infra/http/controller/ForgotPasswordController";
import ResetPasswordController from "@modules/users/infra/http/controller/ResetPasswordController";

const passwordRouter = Router();

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  ForgotPasswordController.create
);
passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref("password")),
    },
  }),
  ResetPasswordController.create
);

export default passwordRouter;
