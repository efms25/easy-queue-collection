import { ClientTypes } from "./client-types.enum";
import { PickupStatus } from "./pickup-status.enum";

export interface PickupFilter {
    region?: string;
    clientType?: ClientTypes;
    status?: PickupStatus;
}