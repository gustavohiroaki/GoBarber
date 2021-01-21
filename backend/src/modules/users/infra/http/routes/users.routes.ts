import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload";

import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import CreateUserService from "@modules/users/services/CreateUserService";
import UpdateUserAvatarService from "@modules/users/services/UpdateUserAvatarService";

import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userRepository = new UserRepository();
    const createUser = new CreateUserService(userRepository);

    const user = await createUser.execute({
      name,
      email,
      password,
    });
    // @ts-expect-error
    delete user.password;

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  async (req, res) => {
    const userRepository = new UserRepository();
    const updateUserAvatar = new UpdateUserAvatarService(userRepository);

    const user = await updateUserAvatar.execute({
      user_id: req.user.id,
      avatarFilename: req.file.filename,
    });

    // @ts-expect-error
    delete user.password;

    return res.json(user);
  }
);

export default usersRouter;
