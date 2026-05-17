import { PropertyBundle } from '@pms/shared/src/models';

export interface PropertyRepository {
  list(): PropertyBundle[];
  findById(id: string): PropertyBundle | undefined;
}
