import { jest } from "@jest/globals";
import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { ClientTypes } from "../client-types.enum.ts";
import { PickupStatus } from "../pickup-status.enum.ts";
import { PACKAGE_WEIGHT_MULTIPLIER } from "./prioritization-weights.ts";

const calculateTimePriorityWeightsMock = jest.fn();

jest.unstable_mockModule('./priority-weight-calculation.helper.ts', () => ({
    calculateTimePriorityWeights: calculateTimePriorityWeightsMock
}))

const { PackageAmountPriorityStrategy } = await import("./package-amount-priority.strategy.ts");

describe("PackageAmountPriorityStrategy", () => {
  let packageAmountPriorityStrategy: InstanceType<typeof PackageAmountPriorityStrategy>
  beforeEach(() => {
    jest.clearAllMocks();
    packageAmountPriorityStrategy = new PackageAmountPriorityStrategy()
  });

  it('should return the priority calculated by priority strategy', () => {

     const pickupPayloadMock: PickupFactoryPayload = {
          client: "test",
          region: "teste",
          clientType: ClientTypes.DEFAULT,
          number_of_packages: 10,
          status: PickupStatus.Pending,
          priority: 0,
          createdAt: new Date('2000-1-1'),
        };
    
    const timeWeightMock = 10;

    calculateTimePriorityWeightsMock.mockReturnValue(timeWeightMock);

    const mockResultWeight = (pickupPayloadMock.number_of_packages * PACKAGE_WEIGHT_MULTIPLIER) + timeWeightMock;

    const result = packageAmountPriorityStrategy.calculatePriority(pickupPayloadMock);

    expect(result).toBe(mockResultWeight);
    expect(calculateTimePriorityWeightsMock).toHaveBeenCalledWith(pickupPayloadMock.createdAt);

  })
});
