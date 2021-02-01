import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import CreateUserService from "@modules/users/services/CreateUserService";

import FakeCacheProvider from "@shared/providers/CacheProvider/fakes/FakeCacheProvider";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });
  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with same email from another", async () => {
    await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    await expect(
      createUser.execute({
        name: "John Doe",
        email: "johndoe@example.com",
        password: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
