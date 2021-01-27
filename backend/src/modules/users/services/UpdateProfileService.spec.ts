import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "@modules/users/providers/HashProvider/fakes/FakeHashProvider";
import UpdateProfileService from "@modules/users/services/UpdateProfileService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  });

  it("should be able update the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tre",
      email: "johntre@example.com",
    });

    expect(updatedUser.name).toBe("John Tre");
    expect(updatedUser.email).toBe("johntre@example.com");
  });

  it("should not be able to change to another user email", async () => {
    await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Doe",
        email: "johndoe@example.com",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should be able update the password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Tre",
      email: "johntre@example.com",
      old_password: "123123123",
      password: "321321321",
    });

    expect(updatedUser.password).toBe("321321321");
  });

  it("should not be able update the password without old_password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tre",
        email: "johntre@example.com",
        password: "321321321",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able update the password with wrong old_password", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: "John Tre",
        email: "johntre@example.com",
        old_password: "432432432",
        password: "321321321",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
