import type { FastifyInstance } from "fastify";
import { PickupService } from "./pickup.service";
import { InMemoryPickupRepository } from "./repositories/in-memory-pickup.repository";
import { PickupFactory } from "./pickup.factory";
import { PickupObservable } from "./pickup.observable";
import { PriorityStrategyContext } from "./strategies/priority-strategy.context";
import { PriorityStrategyFactory } from "./strategies/priority-strategy-factory";
import { PackageAmountPriorityStrategy } from "./strategies/package-amount-priority.strategy";
import { ClientTypePriorityStrategy } from "./strategies/client-type-priority.strategy";
import { CounterObserver } from "./counter.observer";
import { LoggerObserver } from "./logger.observer";
import { PickupController } from "./pickup.controller";
import type { CreatePickupDto } from "./dtos/create-pickup.dto";
import type { PickupStatus } from "./pickup-status.enum";
import type { PickupFilter } from "./pickup-filter.interface";

export default async function pickupRoutes(fastify: FastifyInstance) {
  // DI
  const pickupRepository = new InMemoryPickupRepository();
  const pickupFactory = new PickupFactory();
  const pickupObservable = new PickupObservable();
  const pickupPriorityContext = new PriorityStrategyContext();

  const packageAmountPriorityStrategy = new PackageAmountPriorityStrategy();
  const clientTypePriorityStrategy = new ClientTypePriorityStrategy();
  const priorityStrategyFactory = new PriorityStrategyFactory(
    packageAmountPriorityStrategy,
    clientTypePriorityStrategy,
  );

  const counterObserver = new CounterObserver();
  const loggerObserver = new LoggerObserver("pickup");

  const pickupService = new PickupService(
    pickupRepository,
    pickupFactory,
    pickupObservable,
    pickupPriorityContext,
    priorityStrategyFactory,
    loggerObserver,
    counterObserver,
  );

  const pickupController = new PickupController(pickupService);

  const endpoint = "/pickup";

  fastify.post<{ Body: CreatePickupDto }>(
    `${endpoint}`,
    pickupController.createPickup,
  );
  fastify.patch<{ Body: { status: PickupStatus }; Params: { id: number } }>(
    `${endpoint}/:id`,
    pickupController.updatePickup,
  );
  fastify.delete<{ Params: { id: number } }>(
    `${endpoint}`,
    pickupController.removePickup,
  );
  fastify.get(`${endpoint}`, pickupController.findAllPickups);
  fastify.get<{ Querystring: PickupFilter }>(
    `${endpoint}/filter`,
    pickupController.filterPickups,
  );
}
