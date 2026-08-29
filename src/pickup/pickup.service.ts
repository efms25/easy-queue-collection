import { CounterObserver } from "./counter.observer.ts";
import type { CreatePickupDto } from "./dtos/create-pickup.dto.ts";
import { LoggerObserver } from "./logger.observer.ts";
import type { PickupFilter } from "./pickup-filter.interface.ts";
import { PickupStatus } from "./pickup-status.enum.ts";
import { PickupFactory } from "./pickup.factory.ts";
import { PickupObservable } from "./pickup.observable.ts";
import type { PickupRegister } from "./pickup.type.ts";
import type { PickupRepository } from "./repositories/Pickup-repository.interface.ts";
import { PriorityStrategyFactory } from "./strategies/priority-strategy-factory.ts";
import { PriorityStrategyContext } from "./strategies/priority-strategy.context.ts";

export class PickupService {
  constructor(
    private readonly pickupRepository: PickupRepository,
    private readonly pickupFactory: PickupFactory,
    private readonly pickupObservable: PickupObservable,
    private readonly priorityStrategyContext: PriorityStrategyContext,
    private readonly priorityStrategyFactory: PriorityStrategyFactory,
    private readonly loggerObserver: LoggerObserver,
    private readonly counterObserver: CounterObserver,
  ) {}

  async createPickup(data: CreatePickupDto): Promise<PickupRegister> {
    const newPickup = await this.pickupFactory.createPickup(data);

    const priorityStrategy = this.priorityStrategyFactory.createStrategy(
      data.prioritize_by,
    );

    this.priorityStrategyContext.setStrategy(priorityStrategy);
    newPickup.priority =
      this.priorityStrategyContext.calculatePriority(newPickup);

    const pickupRegister = await this.pickupRepository.addPickup(newPickup);

    this.pickupObservable.subscribe(this.loggerObserver);
    this.pickupObservable.subscribe(this.counterObserver);

    this.pickupObservable.notify(pickupRegister);

    return pickupRegister;
  }

  async updateStatus(id: number, status: PickupStatus): Promise<void> {
    const pickupRegister = await this.pickupRepository.getPickupById(id);
    pickupRegister.status = status;

    await this.pickupRepository.updatePickup(pickupRegister);

    this.pickupObservable.subscribe(this.loggerObserver);
    this.pickupObservable.subscribe(this.counterObserver);

    this.pickupObservable.notify(pickupRegister);
  }

  async findAll() {
    return await this.pickupRepository.getAllPickups();
  }

  async find(filter: PickupFilter) {
    return await this.pickupRepository.filterPickups(filter);
  }

  async findById(id: number) {
    return await this.pickupRepository.getPickupById(id);
  }

  async removePickup(id: number) {
    await this.pickupRepository.removePickup(id);
  }

  async operationalResume(): Promise<{
    pickups: PickupRegister[];
    total: number;
  }> {
    const pickups = await this.pickupRepository.getAllPickups();
    const total = pickups.length;

    const statusOrder = {
      [PickupStatus.Pending]: 0,
      [PickupStatus.On_the_way]: 1,
      [PickupStatus.Completed]: 2,
    };

    pickups.sort((a, b): number => {
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;

      return b.priority - a.priority;
    });

    return {
      pickups,
      total,
    };
  }
}
