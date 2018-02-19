import { PouchDbServiceProvider } from './../pouch-db-service/pouch-db-service';
import { Product } from './../../models/product';
import { Injectable } from '@angular/core';
import { Tables } from '../../models/constants';

@Injectable()
export class ProductsProvider {

  private pouchDbService: PouchDbServiceProvider;
  private db : any;

  products: Product[] = [];
  constructor() {
    this.pouchDbService = new PouchDbServiceProvider();
    this.pouchDbService.configureForUser(Tables.Inventory.toLowerCase());
    let localdb = this.pouchDbService.getDB();//might throw an error
    this.db = localdb || null;
  }

  load() {
    return [new Product({
      date: Date.now(),
      id: 5,
      description: 'Oeufs',
      quantity: 215,
      broken: 15,
      remaining: 200
    })];
  }

  create(product) {
  }

  update(product){

  }

  delete() {

  }

  query() : Product[] {
    return this.read()
  }

  read() {
    function allDocs() : any {
      this.pdb.allDocs({ include_docs: true })
        .then(docs => {
          this.products = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.products;
        });
    }

    this.db.changes({ live: true, since: 'now', include_docs: true })
      .on('change', () => {
        allDocs().then((emps) => {

          this.products = emps;
        });
      });
    return allDocs()
  }
}
