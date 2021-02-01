import { inject, injectable } from "tsyringe";

import ICacheProvider from "@shared/providers/CacheProvider/models/ICacheProvider";
import IUsersRepository from "@modules/users/repositories/IUsersRepository";

import AppError from "@shared/errors/AppError";
// import uploadConfig from "@config/upload";

import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  user_id: string;
}

@injectable()
export default class ListProviderService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id,
      });

      console.log("A query no banco foi feita");

      if (!users) {
        users = [];
      }

      await this.cacheProvider.save(`providers-list:${user_id}`, users);
    }

    return users;
  }
}
