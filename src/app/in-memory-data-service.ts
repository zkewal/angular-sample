import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const test = [
      { id: 1, name: 'test' },
    ];
    return {test};
  }
}
