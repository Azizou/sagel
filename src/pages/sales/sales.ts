import { ItemsProvider } from './../../providers/items/items';
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Sale } from '../../models/sale';
import { Tables } from '../../models/constants';

/**
 * Generated class for the SalesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  currentItems: Sale[] = [];
  dbName = Tables.Sales;

  constructor(public navCtrl: NavController, public saleService: ItemsProvider, public modalCtrl: ModalController) {
    this.currentItems = []
  }

  ionViewDidLoad() {
    this.saleService.initialize(Tables.Sales);
    this.currentItems = this.saleService.load(this.dbName) as Sale[];
  }

  search(){
    this.currentItems = this.saleService.query(this.dbName)  as Sale[];
  }

  add(sale){
    let addModal = this.modalCtrl.create('SaleCreatePage');
    addModal.onDidDismiss(sale => {
      if (sale) {
        sale._id = Date.now() + ''
        this.saleService.add(this.dbName, sale);
        this.currentItems = this.saleService.load(this.dbName, ) as Sale[];
      }
    })
    addModal.present();
  }
  
  delete(record){
    this.saleService.delete(this.dbName, record);
    this.currentItems = this.saleService.load(this.dbName) as Sale[];
  }
}
