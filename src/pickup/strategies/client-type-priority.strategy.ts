import { PickupFactoryPayload } from "../pickup-factory.payload";
import { PriorityStrategy } from "./priority-strategy.interface";

export class ClientTypePriorityStrategy implements PriorityStrategy {
    calculatePriority(pickupRegister: PickupFactoryPayload): number {
        let priorityValue = 0;
        // TODO: Implement calc
        return priorityValue
    }

}