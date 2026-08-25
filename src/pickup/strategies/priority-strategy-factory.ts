import { PrioritizationTypes } from "./prioritization-types.enum";
import { PackageAmountPriorityStrategy } from "./package-amount-priority.strategy";
import { ClientTypePriorityStrategy } from "./client-type-priority.strategy";
import { PriorityStrategy } from "./priority-strategy.interface";

export class PriorityStrategyFactory {
  constructor(
    private readonly packageAmountStrategy: PackageAmountPriorityStrategy,
    private readonly clientTypeStrategy: ClientTypePriorityStrategy,
  ) {}

  createStrategy(prioritizationType: PrioritizationTypes): PriorityStrategy {
    switch (prioritizationType) {
      case PrioritizationTypes.CLIENT_TYPE:
        return this.clientTypeStrategy;
      case PrioritizationTypes.PACKAGE_AMOUNT:
        return this.packageAmountStrategy;
      default:
        throw new Error("Strategy not found");
    }
  }
}
