import { ProductsProvider } from './../../providers/products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Product } from '../../models/product';
/**
 * Generated class for the InventoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  products: Product[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public productService: ProductsProvider) {
    this.products = []
  }

  ionViewDidLoad() {
    this.productService.initialize();
    this.products = this.productService.load();
    console.log(this.products)
  }

  search(){
    this.products = this.productService.query();
  }

  add(product){
    this.productService.create(product);
  }

}
