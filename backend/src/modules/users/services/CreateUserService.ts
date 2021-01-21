import { hash } from "bcryptjs";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    const hashedPassword = await hash(password, 8);

    if (checkUserExists) {
      throw new AppError("Email adress already used");
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
