import { Request, Response } from "express";
import { classToClass } from "class-transformer";
import { container } from "tsyringe";

import CreateUserService from "@modules/users/services/CreateUserService";

class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });
      return res.json(classToClass(user));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
}

export default new UsersController();
