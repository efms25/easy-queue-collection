import type { FastifyReply, FastifyRequest } from "fastify";
import type { CreatePickupDto } from "./dtos/create-pickup.dto";
import { PickupService } from "./pickup.service";
import type { PickupRegister } from "./pickup.type";
import type { PickupStatus } from "./pickup-status.enum";
import type { PickupFilter } from "./pickup-filter.interface";

export class PickupController {
  constructor(private readonly pickupService: PickupService) {}

  async createPickup(
    request: FastifyRequest<{ Body: CreatePickupDto }>,
    reply: FastifyReply,
  ): Promise<void> {
    const pickupBody = request.body;
    const pickupRegister = this.pickupService.createPickup(pickupBody);

    reply.code(201).send(pickupRegister);
  }

  async updatePickup(
    request: FastifyRequest<{
      Body: { status: PickupStatus };
      Params: { id: number };
    }>,
    reply: FastifyReply,
  ): Promise<void> {
    const { body, params } = request;

    const originalPickup = await this.pickupService.findById(params.id);

    if (!originalPickup) {
      reply.code(404).send();
      return;
    }

    try {
      await this.pickupService.updateStatus(params.id, body.status);
      reply.code(204).send();
    } catch (err: any) {
      reply.code(500).send();
    }
  }

  async filterPickups(
    request: FastifyRequest<{ Querystring: PickupFilter }>,
    reply: FastifyReply,
  ): Promise<void> {
    const pickups = await this.pickupService.find(request.query);
    reply.code(200).send(pickups);
  }

  async findAllPickups(
    _request: FastifyRequest,
    reply: FastifyReply,
  ): Promise<void> {
    const pickups = await this.pickupService.findAll();
    reply.code(200).send(pickups);
  }

  async removePickup(
    request: FastifyRequest<{ Params: { id: number } }>,
    reply: FastifyReply,
  ): Promise<void> {
    const pickup = this.pickupService.findById(request.params.id);
    if (!pickup) {
      reply.code(404).send();
    }
    await this.pickupService.removePickup(request.params.id);
    reply.code(204).send();
  }

  async operationalResume(
    _request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const pickups = this.pickupService.operationalResume();
      reply.code(200).send(pickups);
    } catch (err: any) {
      reply.code(500).send("Internal server error");
    }
  }
}
