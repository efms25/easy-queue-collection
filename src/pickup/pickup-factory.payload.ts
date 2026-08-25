import { PickupRegister } from "./pickup.type";

export type PickupFactoryPayload = Omit<PickupRegister, 'id'>;