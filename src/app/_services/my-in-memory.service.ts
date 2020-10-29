import { InMemoryDbService } from 'angular-in-memory-web-api';
import { RequestInfo } from 'angular-in-memory-web-api/interfaces';


export class MyInMemoryService implements InMemoryDbService {

  // In-Memory DB will intercept /api/whatever calls and return data
  createDb() {
    const users = [
      { id: 1, username: 'fred92', password: '1234' },
      { id: 2, username: 'john69', password: 'abcd' },
      // add as many data you need
    ]
    const products = [
      { id: 1, maker: 'Samsung', model: 'Galaxy'},
      { id: 2, maker: 'Sony', model: 'Xperia'}
    ]
    return { users, products } // add as many end-points you want
  }
  
}