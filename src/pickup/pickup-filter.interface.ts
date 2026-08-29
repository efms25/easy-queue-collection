import { ClientTypes } from "./client-types.enum.ts";
import { PickupStatus } from "./pickup-status.enum.ts";

export interface PickupFilter {
    region?: string;
    clientType?: ClientTypes;
    status?: PickupStatus;
}