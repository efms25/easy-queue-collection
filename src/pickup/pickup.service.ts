import { CounterObserver } from "./counter.observer";
import { CreatePickupDto } from "./dtos/create-pickup.dto";
import { LoggerObserver } from "./logger.observer";
import { PickupFilter } from "./pickup-filter.interface";
import { PickupStatus } from "./pickup-status.enum";
import { PickupFactory } from "./pickup.factory";
import { PickupObservable } from "./pickup.observable";
import { PickupRegister, UpdatePickup } from "./pickup.type";
import { PickupRepository } from "./repositories/Pickup-repository.interface";
import { PriorityStrategyFactory } from "./strategies/priority-strategy-factory";
import { PriorityStrategyContext } from "./strategies/priority-strategy.context";

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

        const priorityStrategy = this.priorityStrategyFactory.createStrategy(data.prioritize_by);
        
        this.priorityStrategyContext.setStrategy(priorityStrategy);
        newPickup.priority = this.priorityStrategyContext.calculatePriority(newPickup);

        const pickupRegister = await this.pickupRepository.addPickup(newPickup);

        this.pickupObservable.subscribe(this.loggerObserver);
        this.pickupObservable.subscribe(this.counterObserver);

        this.pickupObservable.notify(pickupRegister);

        return pickupRegister;
    }

    async updateStatus(id: number, status: PickupStatus) {
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

    async removePickup(id: number) {
        await this.pickupRepository.removePickup(id);
    }
}