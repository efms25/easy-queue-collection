import { ClientTypePriorityStrategy } from "./client-type-priority.strategy.ts";
import { PackageAmountPriorityStrategy } from "./package-amount-priority.strategy.ts";
import { PrioritizationTypes } from "./prioritization-types.enum.ts";
import { PriorityStrategy } from "./priority-strategy.interface.ts";

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
