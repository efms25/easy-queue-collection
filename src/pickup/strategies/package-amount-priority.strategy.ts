import { PickupFactoryPayload } from "../pickup-factory.payload";
import { PriorityStrategy } from "./priority-strategy.interface";

export class PackageAmountPriorityStrategy implements PriorityStrategy {
    calculatePriority(pickupRegister: PickupFactoryPayload): number {
        let priorityValue = 0;
        // TODO: Implement calc
        return priorityValue
    }
}