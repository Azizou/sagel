import { ExpensesPage } from './../expenses/expenses';
import { SalesPage } from './../sales/sales';
import { BankPage } from './../bank/bank';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Tables } from '../../models/constants';
import { InventoryPage } from '../inventory/inventory';
import { DatePicker } from '@ionic-native/date-picker';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { ItemsProvider } from '../../providers/items/items';
import { Product } from '../../models/product';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tables: any[];
  pdfObject = null;
  params = {
    fromDate: '', // use the datepicker plugin for these later
    toDate: '',
    text: 'Dummy Text, you know it'
  }
  
  constructor(public navCtrl: NavController, private plt: Platform  , private datePicker: DatePicker, private file: File, private fileOpener: FileOpener) {
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

  setEnd(){
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

    this.createReport();
    this.downloadPdf();
    return;
    const start = this.params.fromDate;
    const end = this.params.toDate;
    const tables = [Tables.Inventory, Tables.Sales, Tables.Expenses, Tables.Bank ]
    let db = new ItemsProvider();
    var records = {};
    //Query the data from each table to be included in the result
    for(let i=0; i < tables.length; i++){
      db.initialize(tables[i]);
      records[tables[i]] = db.query({start, end})
    }

    //create a table for each record
    // Products
    let products = records[Tables.Inventory] as Product[]
    let productTable = this.getTable(products);

    let sales = records[Tables.Sales] as Product[]
    let salesTable = this.getTable(sales);

    let expense = records[Tables.Expenses] as Product[]
    let expenseTable = this.getTable(expense);

    let bank = records[Tables.Inventory] as Product[]
    let bankTable = this.getTable(bank);

  }

  getTable(item){
    return "Not yet implemented"
  }

  createReport(){
    var docDefinition = {
      content: [
        { text: 'REMINDER', style: 'header' },
        { text: new Date().toTimeString(), alignment: 'right' },

        { text: 'From', style: 'subheader' },
        { text: this.params.fromDate },

        { text: 'To', style: 'subheader' },
        this.params.toDate,

        { text: this.params.text, style: 'story', margin: [0, 20, 0, 20] },

        {
          ul: [
            'Bacon',
            'Rips',
            'BBQ',
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 0]
        },
        story: {
          italic: true,
          alignment: 'center',
          width: '50%',
        }
      }
    }
    this.pdfObject = pdfMake.createPdf(docDefinition);
  }

  downloadPdf() {
    if (this.plt.is('cordova')) {
      this.pdfObject.getBuffer((buffer) => {
        var blob = new Blob([buffer], { type: 'application/pdf' });

        // Save the PDF to the data Directory of our App
        this.file.writeFile(this.file.dataDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
          // Open the PDf with the correct OS tools
          this.fileOpener.open(this.file.dataDirectory + 'myletter.pdf', 'application/pdf');
        })
      });
    } else {
      // On a browser simply use download!
      this.pdfObject.download();
    }
  }
}
