import { PickupFactoryPayload } from "../pickup-factory.payload";

export interface PriorityStrategy {
  calculatePriority(pickupRegister: PickupFactoryPayload): number;
}
