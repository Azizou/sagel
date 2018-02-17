import { PouchDbServiceProvider } from './../pouch-db-service/pouch-db-service';
import { Product } from './../../models/product';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductsProvider {

  private pouchDbService: PouchDbServiceProvider;

  products: Product[] = [];
  constructor(PouchDbService: PouchDbServiceProvider) {
    this.pouchDbService = this.pouchDbService;
  }

  load() {

  }

  add(product) {

  }

  delete() {

  }

  query() {

  }
}
