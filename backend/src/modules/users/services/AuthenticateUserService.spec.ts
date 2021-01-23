import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import CreateUserService from "@modules/users/services/CreateUserService";

import AppError from "@shared/errors/AppError";

describe("AuthenticateUser", () => {
  it("should be able to authenticate user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123123123",
    });

    expect(response).toHaveProperty("token");
  });

  it("should not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    expect(
      authenticateUser.execute({
        email: "johndsdoe@example.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to authenticate with wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    await createUser.execute({
      name: "John Doe 2",
      email: "johndoe2@example.com",
      password: "1231231asd",
    });

    expect(
      authenticateUser.execute({
        email: "johndoe2@example.com",
        password: "1231231d23",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
