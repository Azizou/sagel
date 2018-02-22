import { PouchDbService } from './../pouch-db-service/pouch-db-service';
import { Product } from './../../models/product';
import { Injectable } from '@angular/core';
import { Tables } from '../../models/constants';
// https://youtu.be/HWbsN1QIIN8 Useful video
@Injectable()
export class ProductsProvider {

  private pouchDbService: PouchDbService;
  db : any;

  products: Product[] = [];
  constructor() {
  }

  initialize(){
    if(!this.db){
      this.pouchDbService = new PouchDbService();
      this.pouchDbService.configureForUser(Tables.Inventory.toLowerCase());
      try {
        this.db = this.pouchDbService.getDB();//might throw an error
      }
      catch(error){
        console.error("Could not initialize the db");        
        throw error;
        
      }
    }
  }

  load() {
    return this.query();
  }

  add(product) {
    this.db.post(product);
  }

  /**
   * Does the same thing as adding a new product.
   * @param product 
   */
  update(product){
    return this.db.put(product);
  }

  delete(product) {
    this.db.remove(product)
  }

  query(): Product[] {
    this.initialize();
    if (this.db) {
      return this.read()
    }

  }

  read() : Product[]{

    let products = []

    this.db.allDocs({include_docs: true}, (err, result) => {
      if(!err){
        let rows = result.rows;
        for(let i = 0; i < rows.length; i++){
          products.push(rows[i].doc);
        }
      }
    });
    return products;
  }
}
