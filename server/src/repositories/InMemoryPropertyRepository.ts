import { PropertyBundle } from '@pms/shared/src/models';
import { PropertyRepository } from './PropertyRepository';
import { propertyBundles } from '../data/sampleData';

export class InMemoryPropertyRepository implements PropertyRepository {
  private data: PropertyBundle[] = propertyBundles;

  list(): PropertyBundle[] {
    return this.data;
  }

  findById(id: string): PropertyBundle | undefined {
    return this.data.find((item) => item.property.id === id);
  }
}
