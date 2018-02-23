import { ItemsProvider } from './../../providers/items/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Product } from '../../models/product';
// import { ItemsProvider } from '../../providers/items/items';
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

  constructor(public navCtrl: NavController, public productService: ItemsProvider, public modalCtrl: ModalController) {
    this.currentProducts = []
  }

  ionViewDidLoad() {
    this.productService.initialize();
    this.currentProducts = this.productService.load() as Product[];
    // console.log(this.currentProducts);
  }

  search(){
    this.currentProducts = this.productService.query()  as Product[];
  }

  add(product){
    let addModal = this.modalCtrl.create('ProductCreatePage');
    addModal.onDidDismiss(product => {
      if (product) {
        this.productService.add(product);
        this.currentProducts = this.productService.load() as Product[];
      }
    })
    addModal.present();
  }

}
