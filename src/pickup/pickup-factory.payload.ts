import { PickupRegister } from "./pickup.type.ts";

export type PickupFactoryPayload = Omit<PickupRegister, 'id'>;