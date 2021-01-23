import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IHashProvider from "@modules/users/providers/HashProvider/models/IHashProvider";

import AppError from "@shared/errors/AppError";

import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    const hashedPassword = await this.hashProvider.generateHash(password);

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
