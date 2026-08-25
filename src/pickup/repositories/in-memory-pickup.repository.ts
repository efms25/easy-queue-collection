import { PickupFilter } from "../pickup-filter.interface";
import { PickupRepository } from "./Pickup-repository.interface";
import { PickupRegister, UpdatePickup } from "../pickup.type";

export class InMemoryPickupRepository implements PickupRepository {
  pickups = new Map<number, PickupRegister>();

  async addPickup(pickup: PickupRegister): Promise<void> {
    if (this.pickups.has(pickup.id))
      throw new Error("Value with the same id already added.");

    this.pickups.set(pickup.id, pickup);
  }

  async getAllPickups(): Promise<PickupRegister[]> {
    const result = Array.from(this.pickups.values());
    return result;
  }
  async getPickupById(id: number): Promise<PickupRegister> {
    const result = this.pickups.get(id);

    if (!result) throw new Error(`Pickup ${id} is not found;`);

    return result;
  }

  async filterPickups(filter: PickupFilter): Promise<PickupRegister[]> {
    const pickupEntries = [...this.pickups.values()];

    const filtered = pickupEntries.filter((entry: PickupRegister) =>
      Object.entries(filter).every(
        ([key, value]) => entry[key as keyof PickupRegister] === value,
      ),
    );

    return filtered
  }
  
  async updatePickup(pickup: UpdatePickup): Promise<void> {
    if (this.pickups.has(pickup.id))
      throw new Error("Value with the same id already added.");

    try {
      const originalPickup = this.pickups.get(pickup.id);

      const newPickup: PickupRegister = {
        id: originalPickup!.id,
        client: pickup.client ?? originalPickup!.client,
        region: pickup.region ?? originalPickup!.region,
        clientType: pickup.clientType ?? originalPickup!.clientType,
        number_of_packages: pickup.number_of_packages ?? originalPickup!.number_of_packages,
        status: pickup.status ?? originalPickup!.status,
        createdAt: originalPickup!.createdAt,
        priority: pickup.priority ??originalPickup!.priority
      };

      this.pickups.set(pickup.id, newPickup);
    } catch (error: any) {
      throw new Error();
    }
  }
  async removePickup(id: number): Promise<boolean> {
    return this.pickups.delete(id);
  }
}
