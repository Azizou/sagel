import { PouchDbServiceProvider } from './../pouch-db-service/pouch-db-service';
import { Product } from './../../models/product';
import { Injectable } from '@angular/core';
import { Tables } from '../../models/constants';
// https://youtu.be/HWbsN1QIIN8 Useful video
@Injectable()
export class ProductsProvider {

  private pouchDbService: PouchDbServiceProvider;
  db : any;

  products: Product[] = [];
  constructor() {
  }

  initialize(){
    this.pouchDbService = new PouchDbServiceProvider();
    this.pouchDbService.configureForUser(Tables.Inventory.toLowerCase());
    this.db = this.pouchDbService.getDB();//might throw an error
    // this.db = localdb || null;
  }

  load() {
    return [new Product({
      date: new Date().toISOString(),
      id: 5,
      description: 'Oeufs',
      quantity: 215,
      broken: 15,
      remaining: 200
    }),
    new Product({
      date: new Date().toISOString(),
      id: 10,
      description: 'Oeufs',
      quantity: 219,
      broken: 5,
      remaining: 214
    })
  ];
  }

  create(product) {
  }

  update(product){

  }

  delete() {

  }

  query() : Product[] {
    this.initialize();
    return this.read()
  }

  read() {
    // function allDocs() : any {
      return this.db.allDocs({ include_docs: true })
        .then(docs => {
          this.products = docs.rows.map(row => {
            row.doc.Date = new Date(row.doc.Date);
            return row.doc;
          });
          return this.products;
        });
    // }

    // this.db.changes({ live: true, since: 'now', include_docs: true })
    //   .on('change', () => {
    //     allDocs().then((emps) => {

    //       this.products = emps;
    //     });
    //   });
    // return allDocs()
  }
}
