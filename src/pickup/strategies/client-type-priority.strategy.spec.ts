import { jest } from "@jest/globals";
import { ClientTypes } from "../client-types.enum.ts";
import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { PickupStatus } from "../pickup-status.enum.ts";
import { CLIENT_PRIORITIZATION_WEIGHTS } from "./prioritization-weights.ts";

const mockCalculateTimePriorityWeights = jest.fn();

jest.unstable_mockModule("./priority-weight-calculation.helper.ts", () => ({
  calculateTimePriorityWeights: mockCalculateTimePriorityWeights,
}));

const { ClientTypePriorityStrategy } =
  await import("./client-type-priority.strategy.ts");


describe("ClientTypePiorityStrategy", () => {
  let clientTypePriorityStrategy: InstanceType<typeof ClientTypePriorityStrategy>;
  beforeEach(() => {
    jest.clearAllMocks();
    clientTypePriorityStrategy = new ClientTypePriorityStrategy();
  });
  it("should return the calculation between clientType weight and time with", () => {
    const pickupPayloadMock: PickupFactoryPayload = {
      client: "test",
      region: "teste",
      clientType: ClientTypes.DEFAULT,
      number_of_packages: 0,
      status: PickupStatus.Pending,
      priority: 0,
      createdAt: new Date('2000-1-1'),
    };

    const calculationResultMock =
      CLIENT_PRIORITIZATION_WEIGHTS[pickupPayloadMock.clientType] + 10;

    mockCalculateTimePriorityWeights.mockReturnValue(10);

    const result =
      clientTypePriorityStrategy.calculatePriority(pickupPayloadMock);

    expect(result).toBe(calculationResultMock);
    expect(mockCalculateTimePriorityWeights).toHaveBeenCalledWith(pickupPayloadMock.createdAt);
  });
});
