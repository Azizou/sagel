import { ItemsProvider } from './../../providers/items/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Product } from '../../models/product';
import { Tables } from '../../models/constants';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {

  currentItems: Product[] = [];

  constructor(public navCtrl: NavController, public productService: ItemsProvider, public modalCtrl: ModalController) {
    this.currentItems = []
  }

  ionViewDidLoad() {
    this.productService.initialize(Tables.Inventory);
    this.currentItems = this.productService.load() as Product[];                                                                                                                                                                                                                                                    
  }

  search(){
    this.currentItems = this.productService.query()  as Product[];
  }

  add(product){
    let addModal = this.modalCtrl.create('ProductCreatePage');
    addModal.onDidDismiss(product => {
      if (product) {
        product._id = Date.now() + ''
        this.productService.add(product);
        this.currentItems = this.productService.load() as Product[];
      }
    })
    addModal.present();
  }

}
