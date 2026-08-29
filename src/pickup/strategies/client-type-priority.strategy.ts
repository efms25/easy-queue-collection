import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { CLIENT_PRIORITIZATION_WEIGHTS } from "./prioritization-weights.ts";
import { PriorityStrategy } from "./priority-strategy.interface.ts";
import { calculateTimePriorityWeights } from "./priority-weight-calculation.helper.ts";

export class ClientTypePriorityStrategy implements PriorityStrategy {
  calculatePriority(pickupRegister: PickupFactoryPayload): number {
    return (
      CLIENT_PRIORITIZATION_WEIGHTS[pickupRegister.clientType] +
      calculateTimePriorityWeights(pickupRegister.createdAt)
    );
  }
}
