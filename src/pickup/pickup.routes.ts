import type { FastifyInstance } from "fastify";
import { InMemoryPickupRepository } from "./repositories/in-memory-pickup.repository.ts";
import { PickupFactory } from "./pickup.factory.ts";
import { PickupObservable } from "./pickup.observable.ts";
import { PriorityStrategyContext } from "./strategies/priority-strategy.context.ts";
import { PackageAmountPriorityStrategy } from "./strategies/package-amount-priority.strategy.ts";
import { ClientTypePriorityStrategy } from "./strategies/client-type-priority.strategy.ts";
import { PriorityStrategyFactory } from "./strategies/priority-strategy-factory.ts";
import { CounterObserver } from "./counter.observer.ts";
import { LoggerObserver } from "./logger.observer.ts";
import { PickupService } from "./pickup.service.ts";
import { PickupController } from "./pickup.controller.ts";
import { CreatePickupDto } from "./dtos/create-pickup.dto.ts";
import { PickupStatus } from "./pickup-status.enum.ts";
import { PickupFilter } from "./pickup-filter.interface.ts";

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
