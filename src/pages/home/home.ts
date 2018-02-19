import { ExpensesPage } from './../expenses/expenses';
import { SalesPage } from './../sales/sales';
import { BankPage } from './../bank/bank';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tables } from '../../models/constants';
import { InventoryPage } from '../inventory/inventory';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tables: any[];
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
      case Tables.Bank: this.navCtrl.push(BankPage);
        break;
      case Tables.Inventory: this.navCtrl.push(InventoryPage);
        break;
      case Tables.Sales:this.navCtrl.push(SalesPage);
        break;
      case Tables.Expenses: this.navCtrl.push(ExpensesPage);
        break;
      default:
      console.log(table)
        break;
    }
  }
}
