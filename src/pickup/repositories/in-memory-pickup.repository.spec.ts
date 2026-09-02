import { jest } from "@jest/globals";
import { ClientTypes } from "../client-types.enum.ts";
import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { PickupStatus } from "../pickup-status.enum.ts";
import { PickupRegister } from "../pickup.type.ts";
import { InMemoryPickupRepository } from "./in-memory-pickup.repository.ts";

const mockPickupPayload: PickupFactoryPayload = {
  client: "Mr. Mock",
  region: "MockCity",
  clientType: ClientTypes.DEFAULT,
  number_of_packages: 0,
  status: PickupStatus.Pending,
  priority: 0,
  createdAt: new Date("2000-1-1"),
};

describe("InMemoryPickupRepository", () => {
  let inMemoryPickupRepositoryMock: InMemoryPickupRepository;
  let mockStore = new Map<number, PickupRegister>();

  beforeEach(() => {
    inMemoryPickupRepositoryMock = new InMemoryPickupRepository(mockStore);
  });

  afterEach(() => {
    mockStore.clear();
  });

  it("should create new pickup", async () => {
    const result =
      await inMemoryPickupRepositoryMock.addPickup(mockPickupPayload);
    expect(result).toMatchObject({ ...result, id: 1 });
  });

  it("should generate incremental ids", async () => {
    const pickup1 =
      await inMemoryPickupRepositoryMock.addPickup(mockPickupPayload);
    const pickup2 =
      await inMemoryPickupRepositoryMock.addPickup(mockPickupPayload);

    expect(pickup1.id).toBe(1);
    expect(pickup2.id).toBe(2);
  });

  it("should return a list of pickups", async () => {
    const pickupListMock = [
      {
        ...mockPickupPayload,
        id: 1,
      },
      {
        ...mockPickupPayload,
        id: 2,
      },
    ];
    jest.spyOn(Array, "from").mockReturnValue(pickupListMock);

    const pickups = await inMemoryPickupRepositoryMock.getAllPickups();

    expect(pickups).toEqual(pickupListMock);
  });

  it("should return a value by id equals 2", async () => {
    const pickupRegisterMock = {
      ...mockPickupPayload,
      id: 2,
    };

    mockStore.set(pickupRegisterMock.id, pickupRegisterMock);

    const pickups = await inMemoryPickupRepositoryMock.getPickupById(2);

    expect(pickups).toEqual(pickupRegisterMock);
  });

  it("should return filtered data by status, client and region", async () => {
    const pickupRegisterMock = {
      ...mockPickupPayload,
      id: 2,
    };

    mockStore.set(pickupRegisterMock.id, pickupRegisterMock);

    const filterParams = {
      status: pickupRegisterMock.status,
      clientType: pickupRegisterMock.clientType,
      region: pickupRegisterMock.region,
    };


    const results =
      await inMemoryPickupRepositoryMock.filterPickups(filterParams);

    expect(results).toEqual([pickupRegisterMock]);
  });
});
