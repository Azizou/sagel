import { ExpensesPage } from './../expenses/expenses';
import { SalesPage } from './../sales/sales';
import { BankPage } from './../bank/bank';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Tables } from '../../models/constants';
import { InventoryPage } from '../inventory/inventory';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tables: any[];
  params = {
    fromDate: '', // use the datepicker plugin for these later
    toDate: ''
  }
  
  constructor(public navCtrl: NavController, private datePicker: DatePicker) {
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

  setStart(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  /** 
   * Given a start and end time, generate a report of the data recorded in that time period as a pdf 
   * 
   */
  generateReport(){
    //Query the data from each table to be included in the result


  }
}
