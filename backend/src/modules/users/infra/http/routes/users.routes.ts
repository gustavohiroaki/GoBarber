import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import UsersController from "@modules/users/infra/http/controller/UsersController";
import UserAvatarController from "@modules/users/infra/http/controller/UserAvatarController";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", UsersController.create);

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  UserAvatarController.update
);

export default usersRouter;
