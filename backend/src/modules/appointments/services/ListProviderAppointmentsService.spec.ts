import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";
// import FakeUsersRepository from "@modules/users/repositories/fakes/FakeUsersRepository";
import ListProviderAppointmentsService from "@modules/appointments/services/ListProviderAppointmentsService";

// import AppError from "@shared/errors/AppError";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
// let fakeUsersRepository: FakeUsersRepository;
let listProviderAppointmentsService: ListProviderAppointmentsService;

describe("ListProviderAppointments", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    // fakeUsersRepository = new FakeUsersRepository();
    listProviderAppointmentsService = new ListProviderAppointmentsService(
      fakeAppointmentsRepository
    );
  });

  it("should be able to list the appointments on a specific day", async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      user_id: "user",
      provider_id: "provider",
      date: new Date(2020, 4, 20, 14, 0, 0),
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      user_id: "user",
      provider_id: "provider",
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const availability = await listProviderAppointmentsService.execute({
      provider_id: "provider",
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(availability).toEqual([appointment1, appointment2]);
  });
});
