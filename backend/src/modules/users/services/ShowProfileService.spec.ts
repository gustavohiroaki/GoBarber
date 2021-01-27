import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ShowProfileService from "@modules/users/services/ShowProfileService";

import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe("ShowProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });

  it("should be able to show the profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123123123",
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe("John Doe");
    expect(profile.email).toBe("johndoe@example.com");
  });

  it("should not be able to show the profile with non-existing user", async () => {
    expect(
      showProfile.execute({
        user_id: "123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});