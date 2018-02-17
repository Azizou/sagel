import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tables } from '../../models/constants';
import { InventoryPage } from '../inventory/inventory';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private tables: any[];
  constructor(public navCtrl: NavController) {
    this.tables = [];
  }

  ionViewDidLoad(){
   this.refresh()
  }

  refresh(){
    for(let table in Tables){
      this.tables.push(table.toString())
    }
  }
  
  openTable(table){
    switch (table) {
      case Tables.Bank: alert(`${table}: not yet implemented`);
        break;
      case Tables.Inventory: 
        // alert(table);
        this.navCtrl.push(InventoryPage);
        break;
      case Tables.Sales: alert(`${table}: not yet implemented`);
        break;
      case Tables.Expenses: alert(`${table}: not yet implemented`);
        break;
      default:
      console.log(table)
        break;
    }
  }
}
