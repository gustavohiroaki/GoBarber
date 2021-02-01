import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProvidersService from "@modules/appointments/services/ListProvidersService";

import FakeCacheProvider from "@shared/providers/CacheProvider/fakes/FakeCacheProvider";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;
let fakeCacheProvider: FakeCacheProvider;

describe("ListProviders", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();

    listProviders = new ListProvidersService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  });

  it("should be able to list the providers", async () => {
    const loggedUser = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    const user1 = await fakeUsersRepository.create({
      name: "John Tre",
      email: "johntre@example.com",
      password: "123123123",
    });

    const user2 = await fakeUsersRepository.create({
      name: "John Qua",
      email: "johnqua@example.com",
      password: "123123123",
    });

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  // it("should not be able to show the profile with non-existing user", async () => {
  //   expect(
  //     showProfile.execute({
  //       user_id: "123123",
  //     })
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
