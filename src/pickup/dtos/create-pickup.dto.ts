import { ClientTypes } from "../client-types.enum";
import { PrioritizationTypes } from "../strategies/prioritization-types.enum";

export interface CreatePickupDto {
  client: string;
  region: string;
  clientType: ClientTypes;
  number_of_packages: number;
  prioritize_by: PrioritizationTypes 
}
