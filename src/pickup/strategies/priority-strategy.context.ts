import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { PriorityStrategy } from "./priority-strategy.interface.ts";

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
