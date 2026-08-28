import type { PickupFactoryPayload } from "../pickup-factory.payload";
import type { PriorityStrategy } from "./priority-strategy.interface";

export class PriorityStrategyContext {
  strategy?: PriorityStrategy;

  setStrategy(strategy: PriorityStrategy) {
    this.strategy = strategy;
  }

  calculatePriority(pickup: PickupFactoryPayload): number {
    if (!this.strategy)
        throw new Error('Strategy not setted')
      
    return this.strategy.calculatePriority(pickup);
  }
}
