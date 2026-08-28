import type { PickupFactoryPayload } from "../pickup-factory.payload";
import { CLIENT_PRIORITIZATION_WEIGHTS } from "./prioritization-weights";
import type { PriorityStrategy } from "./priority-strategy.interface";
import { calculateTimePriorityWeights } from "./priority-weight-calculation.helper";

export class ClientTypePriorityStrategy implements PriorityStrategy {
  calculatePriority(pickupRegister: PickupFactoryPayload): number {
    return (
      CLIENT_PRIORITIZATION_WEIGHTS[pickupRegister.clientType] +
      calculateTimePriorityWeights(pickupRegister.createdAt)
    );
  }
}
