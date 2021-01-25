import { inject, injectable } from "tsyringe";

import IUsersRepository from "@modules/users/repositories/IUsersRepository";
import IUsersTokensRepository from "@modules/users/repositories/IUsersTokensRepository";
import IMailProvider from "@shared/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

// import User from "@modules/users/infra/typeorm/entities/User";

interface IRequest {
  email: string;
}

@injectable()
export default class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,

    @inject("MailProvider")
    private userTokensRepository: IUsersTokensRepository
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("User does not exists");
    }

    await this.userTokensRepository.generate(user.id);

    this.mailProvider.sendMail("Test", "test@test.com");
  }
}
