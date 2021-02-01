import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "@modules/users/services/AuthenticateUserService";
import CreateUserService from "@modules/users/services/CreateUserService";
import FakeCacheProvider from "@shared/providers/CacheProvider/fakes/FakeCacheProvider";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });
  it("should be able to authenticate user", async () => {
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
    await expect(
      authenticateUser.execute({
        email: "johndsdoe@example.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be not able to authenticate with wrong password", async () => {
    await createUser.execute({
      name: "John Doe 2",
      email: "johndoe2@example.com",
      password: "1231231asd",
    });

    await expect(
      authenticateUser.execute({
        email: "johndoe2@example.com",
        password: "1231231d23",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
