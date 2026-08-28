import type { PickupRegister } from "../pickup.type";
import type { PickupFilter } from "../pickup-filter.interface";
import type { PickupFactoryPayload } from "../pickup-factory.payload";

export interface PickupRepository {
  addPickup(pickup: PickupFactoryPayload): Promise<PickupRegister>;
  getAllPickups(): Promise<PickupRegister[]>;
  getPickupById(id: number): Promise<PickupRegister>;
  filterPickups(filter: PickupFilter): Promise<PickupRegister[]>
  updatePickup(pickup: Partial<PickupRegister>): Promise<void>;
  removePickup(id: number): Promise<boolean>;
}