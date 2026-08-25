import { PickupRegister } from "../pickup.type";
import { PickupFilter } from "../pickup-filter.interface";

export interface PickupRepository {
  addPickup(pickup: PickupRegister): Promise<void>;
  getAllPickups(): Promise<PickupRegister[]>;
  getPickupById(id: number): Promise<PickupRegister>;
  filterPickups(filter: PickupFilter): Promise<PickupRegister[]>
  updatePickup(pickup: Partial<PickupRegister>): Promise<void>;
  removePickup(id: number): Promise<boolean>;
}