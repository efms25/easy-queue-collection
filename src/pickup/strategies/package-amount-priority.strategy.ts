import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { PACKAGE_WEIGHT_MULTIPLIER } from "./prioritization-weights.ts";
import { PriorityStrategy } from "./priority-strategy.interface.ts";
import { calculateTimePriorityWeights } from "./priority-weight-calculation.helper.ts";

export class PackageAmountPriorityStrategy implements PriorityStrategy {
  calculatePriority(pickupRegister: PickupFactoryPayload): number {
    return (
      Math.floor(
        pickupRegister.number_of_packages * PACKAGE_WEIGHT_MULTIPLIER,
      ) + calculateTimePriorityWeights(pickupRegister.createdAt)
    );
  }
}
