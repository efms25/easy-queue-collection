import { PickupFactoryPayload } from "../pickup-factory.payload.ts";
import { PickupFilter } from "../pickup-filter.interface.ts";
import { PickupRegister } from "../pickup.type.ts";

export interface PickupRepository {
  addPickup(pickup: PickupFactoryPayload): Promise<PickupRegister>;
  getAllPickups(): Promise<PickupRegister[]>;
  getPickupById(id: number): Promise<PickupRegister>;
  filterPickups(filter: PickupFilter): Promise<PickupRegister[]>
  updatePickup(pickup: Partial<PickupRegister>): Promise<void>;
  removePickup(id: number): Promise<boolean>;
}