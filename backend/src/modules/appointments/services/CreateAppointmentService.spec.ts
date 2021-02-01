import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";
import CreateAppointmentService from "@modules/appointments/services/CreateAppointmentService";

import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import FakeCacheProvider from "@shared/providers/CacheProvider/fakes/FakeCacheProvider";

import AppError from "@shared/errors/AppError";

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;
let fakeCacheProvider: FakeCacheProvider;

describe("CreateAppointment", () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider
    );
  });

  it("should be able to create a new appointment", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      user_id: "user",
      provider_id: "123123123",
    });

    expect(appointment).toHaveProperty("id");
    expect(appointment.provider_id).toBe("123123123");
  });

  it("should not be able to create two appointment on the same time", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 10).getTime();
    });

    const date = new Date(2020, 4, 10, 11);

    await createAppointment.execute({
      date,
      user_id: "user",
      provider_id: "123123123",
    });

    await expect(
      createAppointment.execute({
        date,
        user_id: "user",
        provider_id: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment on a past date", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        user_id: "user",
        provider_id: "123123123",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment with same user as provider", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        user_id: "sameuser",
        provider_id: "sameuser",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create an appointment out of the business time", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        user_id: "sameuser",
        provider_id: "sameuser",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        date: new Date(2020, 4, 12, 7),
        user_id: "sameuser",
        provider_id: "sameuser",
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
