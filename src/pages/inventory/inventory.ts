import { ProductsProvider } from './../../providers/products/products';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
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

  currentProducts: Product[] = [];

  constructor(public navCtrl: NavController, public productService: ProductsProvider, public modalCtrl: ModalController) {
    this.currentProducts = []
  }

  ionViewDidLoad() {
    this.productService.initialize();
    this.currentProducts = this.productService.load();
    // console.log(this.currentProducts);
  }

  search(){
    this.currentProducts = this.productService.query();
  }

  add(product){
    let addModal = this.modalCtrl.create('ProductCreatePage');
    addModal.onDidDismiss(product => {
      if (product) {
        this.productService.add(product);
        this.currentProducts = this.productService.load();
      }
    })
    addModal.present();
  }

}
