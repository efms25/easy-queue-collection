import type { PickupFactoryPayload } from "../pickup-factory.payload";
import { PACKAGE_WEIGHT_MULTIPLIER } from "./prioritization-weights";
import type { PriorityStrategy } from "./priority-strategy.interface";
import { calculateTimePriorityWeights } from "./priority-weight-calculation.helper";

export class PackageAmountPriorityStrategy implements PriorityStrategy {
  calculatePriority(pickupRegister: PickupFactoryPayload): number {
    return (
      Math.floor(
        pickupRegister.number_of_packages * PACKAGE_WEIGHT_MULTIPLIER,
      ) + calculateTimePriorityWeights(pickupRegister.createdAt)
    );
  }
}
