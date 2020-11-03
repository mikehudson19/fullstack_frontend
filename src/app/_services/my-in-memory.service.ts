import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';


export class MyInMemoryService implements InMemoryDbService {

  createDb() {
    const users = [
      { id: 1, username: 'fred92', password: '1234' },
      { id: 2, username: 'john69', password: 'abcd' },
      
    ]
    return { users } 
  }
  
}