import { ClientTypes } from "../types/client-types.enum";
import { PickupStatus } from "../types/pickup-status.enum";

export interface PickupFilter {
    region?: string;
    clientType?: ClientTypes;
    status?: PickupStatus;
}