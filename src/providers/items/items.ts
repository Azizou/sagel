import { Item } from './../../models/item';
import { PouchDbService } from './../pouch-db-service/pouch-db-service';
import { Injectable } from '@angular/core';
import { Tables } from '../../models/constants';
// https://youtu.be/HWbsN1QIIN8 Useful video
@Injectable()
export class ItemsProvider {

  private pouchDbService: PouchDbService;
  db : any;

  items: Item[] = [];
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

  add(item) { // maybe create a custom id and use put instead of post to benefit from sorting base on id.. timestamp
    this.db.post(item);
  }

  update(item){ // check if _id is present
    if(!item._id){
      throw new Error("Cannot update item without an _id, maybe you want to first create it");      
    }
    return this.db.put(item);
  }

  delete(item) {
    this.db.remove(item)
  }

  query(): Item[] {
    this.initialize();
    if (this.db) {
      return this.read()
    }

  }

  read() : Item[]{

    let items = []

    this.db.allDocs({include_docs: true}, (err, result) => {
      if(!err){
        let rows = result.rows;
        for(let i = 0; i < rows.length; i++){
          items.push(rows[i].doc);
        }
      }
    });
    return items;
  }
}
