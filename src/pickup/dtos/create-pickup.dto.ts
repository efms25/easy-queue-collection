import { ClientTypes } from "../client-types.enum.ts";
import { PrioritizationTypes } from "../strategies/prioritization-types.enum.ts";

export interface CreatePickupDto {
  client: string;
  region: string;
  clientType: ClientTypes;
  number_of_packages: number;
  prioritize_by: PrioritizationTypes 
}
