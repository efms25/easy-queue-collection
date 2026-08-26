import { ClientTypes } from "../client-types.enum";

export const CLIENT_PRIORITIZATION_WEIGHTS = {
    [ClientTypes.DEFAULT]: 0,
    [ClientTypes.PREMIUM]: 50,
    [ClientTypes.VIP]: 80
}

export const WEIGHT_PER_HOUR_MULTIPLIER = .35;
export const PACKAGE_WEIGHT_MULTIPLIER = 2;