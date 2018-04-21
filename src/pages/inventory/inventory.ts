import { Component } from '@angular/core';
import { ItemsProvider } from './../../providers/items/items';
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
  dbName = Tables.Inventory;

  constructor(public navCtrl: NavController, public productService: ItemsProvider, public modalCtrl: ModalController) {
    this.currentItems = []
    
  }

  ionViewDidLoad() {
    this.productService.initialize(Tables.Inventory);
    this.currentItems = this.productService.load(this.dbName) as Product[];                                                                                                                                                                                                                                                    
  }

  search(){
    this.currentItems = this.productService.query(this.dbName)  as Product[];
  }

  add(product){
    let addModal = this.modalCtrl.create('ProductCreatePage');
    addModal.onDidDismiss(product => {
      if (product) {
        product._id = Date.now() + ''
        this.productService.add(this.dbName,product);
        this.currentItems = this.productService.load(this.dbName) as Product[];
      }
    })
    addModal.present();
  }
  
  delete(record){
    this.productService.delete(this.dbName, record);
    this.currentItems = this.productService.load(this.dbName) as Product[];
  }
}
