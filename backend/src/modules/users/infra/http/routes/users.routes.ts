import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";
import multer from "multer";
import uploadConfig from "@config/upload";

import UsersController from "@modules/users/infra/http/controller/UsersController";
import UserAvatarController from "@modules/users/infra/http/controller/UserAvatarController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  UsersController.create
);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  UserAvatarController.update
);

export default usersRouter;
