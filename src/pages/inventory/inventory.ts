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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.products = []
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InventoryPage');
  }

  addInventory(){
    // let addModal = this.modalCtrl.create('ProductCreatePage');
    // addModal.onDidDismiss(item => {
    //   if (item) {
    //     this.products.add(item);
    //   }
    // })
    // addModal.present();
  }

}
