import { ExpensesPage } from './../expenses/expenses';
import { SalesPage } from './../sales/sales';
import { BankPage } from './../bank/bank';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { Tables } from '../../models/constants';
import { InventoryPage } from '../inventory/inventory';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import pdfMake from 'pdfmake/build/pdfmake';
import { ItemsProvider } from '../../providers/items/items';
import { Product } from '../../models/product';
import { Sale } from '../../models/sale';
import { Expense } from '../../models/expense';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tables: any[];
  products: Product[];
  sales: Sale[];
  expenses: Expense[];
  pdfObject = null;
  params = {
    fromDate: '10-08-2017', // use the datepicker plugin for these later
    toDate: '10-18-2017',
  }
  
  constructor(public navCtrl: NavController, private dbService: ItemsProvider,  private plt: Platform, private file: File, private fileOpener: FileOpener) {
    this.tables = [];
  }

  ionViewDidLoad(){
   this.refresh()
  }

  refresh(){
    for(let table in Tables){
      this.tables.push(table.toString())
    }
    this.dbService.initialize(Tables.Inventory);
    this.dbService.initialize(Tables.Sales);
    this.dbService.initialize(Tables.Expenses);
  }
  
  ionViewDidEnter(){
    this.products = this.dbService.load(Tables.Inventory) as Product[];
    this.sales = this.dbService.load(Tables.Sales) as Sale[];
    this.expenses = this.dbService.load(Tables.Expenses) as Expense[];
   
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



  /** 
   * Given a start and end time, generate a report of the data recorded in that time period as a pdf 
   * 
   */
  generateReport(){
    // alert("generate report called")
    // const start = this.params.fromDate;
    // const end = this.params.toDate;
    // const tables = [Tables.Inventory]//, Tables.Sales, Tables.Expenses, Tables.Bank ]
    // let db = new ItemsProvider();
    // var records = {};
    //Query the data from each table to be included in the result
    // for(let i=0; i < tables.length; i++){
      // records[tables[i]] = this.dbService.load();// query()//{start, end})
    // }

    //create a table for each record
    // Products

    // console.log(products)
    // let productTable = this.getTable(products);

    this.createReport();
    this.downloadPdf();
  }

  createReport(){
    let ptd = []
    let std = []
    let etd = []
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    for (let i = 0; i < this.products.length; i++){
      ptd.push([this.products[i].date, this.products[i].description, this.products[i].collected, this.products[i].broken, this.products[i].remaining ])
    }
    
    for (let i = 0; i < this.sales.length; i++){
      std.push([this.sales[i].date, this.sales[i].description, this.sales[i].quantity, this.sales[i].cost_of_sale, this.sales[i].reference ])
    }
    for (let i = 0; i < this.expenses.length; i++){
      etd.push([this.expenses[i].date, this.expenses[i].description, this.expenses[i].quantity, this.expenses[i].unit_price, this.expenses[i].total_cost ])
    }
    var docDefinition = {
      content: [
        { text: 'Rapport des activites du:', style: 'bigheader', alignment: 'center'},
        { text: 
          [{ text: 'Du ', style: 'subheader' },
          { text: new Date(this.params.fromDate).toLocaleDateString('fr', dateOptions) }, 
          { text: 'au ', style: 'subheader' },
          { text: new Date(this.params.toDate).toLocaleDateString('fr', dateOptions)} ],
          alignment: 'center',
          style: 'subheader'
        },
        
        { text: 'Les proudctions', style: 'header', alignment: 'center', },
          '',
        {
          // alignment: 'center',s
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Date', style: 'header' }, { text: 'Description', style: 'header' }, { text: 'Ramasser', style: 'header' }, { text: 'Casser', style: 'header' }, { text: 'Restant', style: 'header' }]            
            ].concat(ptd)
          }
        },

        //Sales
        { text: 'Vente', style: 'header', alignment: 'center', },
          '',
        {
          // alignment: 'center',s
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Date', style: 'header' }, { text: 'Description', style: 'header' }, { text: 'Ramasser', style: 'header' }, { text: 'Casser', style: 'header' }, { text: 'Casser', style: 'header' }]            
            ].concat(std)
          }
        },

        //Expenses
        { text: 'Depense', style: 'header', alignment: 'center', },
          '',
        {
          // alignment: 'center',s
          table: {
            headerRows: 1,
            body: [
              [{ text: 'Date', style: 'header' }, { text: 'Description', style: 'header' }, { text: 'Quantite', style: 'header' }, { text: 'Prix Unitaire', style: 'header' }, { text: 'Total', style: 'header' }]            
            ].concat(etd)
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigheader: {
          fontSize: 24,
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
      // this.pdfObject.open();
      this.pdfObject.download();
    }
  }
}
