import { Item } from './../../models/item';
import { PouchDbService } from './../pouch-db-service/pouch-db-service';
import { Injectable } from '@angular/core';
// import { Tables } from '../../models/constants';
// https://youtu.be/HWbsN1QIIN8 Useful video
@Injectable()
export class ItemsProvider {

  private pouchDbService: PouchDbService;
  dbs = [];

  items: Item[] = [];
  constructor() {
  }

  initialize(dbName){
    if(!this.dbs[dbName]){
      let pouchDbService = new PouchDbService();
      //this should be configurable
      pouchDbService.configureForUser(dbName.toLowerCase());
      // this.pouchDbService.configureForUser(Tables.Inventory.toLowerCase());
      try {
        this.dbs[dbName] = pouchDbService.getDB();//might throw an error
      }
      catch(error){
        console.error("Could not initialize the db for " + dbName);        
        throw error;        
      }
    }
  }

  load(dbName) {
    return this.query(dbName);
  }

  add(dbName,item) {
    this.dbs[dbName].post(item);
  }

  update(dbName, item){
    return this.dbs[dbName].put(item);
  }

  delete(dbName, item) {
    this.dbs[dbName].remove(item)
  }

  query(dbName, params = {}): Item[] {
    if (this.dbs[dbName]) {
      return this.read(dbName)
    } else {
      console.log("DB not found");
      
    }

  }
  //use time stamp as id
  read(dbName) : Item[]{

    let items = []

    this.dbs[dbName].allDocs({include_docs: true}, (err, result) => {
      if(!err){
        let rows = result.rows;
        for(let i = 0; i < rows.length; i++){
          items.push(rows[i].doc);
        }
      } else {
        console.warn(err);
        
      }
    });
    return items;
  }
}
