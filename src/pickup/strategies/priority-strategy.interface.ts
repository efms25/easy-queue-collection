import { PickupFactoryPayload } from "../pickup-factory.payload.ts";

export interface PriorityStrategy {
  calculatePriority(pickupRegister: PickupFactoryPayload): number;
}
