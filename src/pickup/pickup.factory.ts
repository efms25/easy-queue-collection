import { CreatePickupDto } from "./dtos/create-pickup.dto";
import { PickupFactoryPayload } from "./pickup-factory.payload";
import { PickupStatus } from "./pickup-status.enum";

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
