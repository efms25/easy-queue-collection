import { CreatePickupDto } from "./dtos/create-pickup.dto.ts";
import { PickupFactoryPayload } from "./pickup-factory.payload.ts";
import { PickupStatus } from "./pickup-status.enum.ts";

export class PickupFactory {
  async createPickup(
    pickupData: CreatePickupDto,
  ): Promise<PickupFactoryPayload> {
    const pickupInitialDefaults = {
      status: PickupStatus.Pending,
      createdAt: new Date(),
      priority: 0
    };

    return {
      ...pickupData,
      ...pickupInitialDefaults,
    };
  }
}
