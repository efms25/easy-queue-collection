import { ClientTypes } from "./client-types.enum";
import { PickupStatus } from "./pickup-status.enum";

export type PickupRegister = {
    id: number;
    client: string;
    region: string;
    clientType: ClientTypes;
    number_of_packages: number; 
    status: PickupStatus;
    priority: number;
    createdAt: Date;
}

export type UpdatePickup = Partial<PickupRegister> & Pick<PickupRegister, 'id'>;