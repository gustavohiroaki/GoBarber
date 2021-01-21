import { Router } from "express";

import UserRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";

import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";

const sessionsRouter = Router();

sessionsRouter.post("/", async (req, res) => {
  const { email, password } = req.body;

  const userRepository = new UserRepository();
  const authenticateUser = new AuthenticateUserService(userRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  // @ts-expect-error
  delete user.password;

  return res.json({ user, token });
});

export default sessionsRouter;
