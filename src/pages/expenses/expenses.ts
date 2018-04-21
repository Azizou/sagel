import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { Expense } from './../../models/expense';
import { Tables } from '../../models/constants';
import { ItemsProvider } from '../../providers/items/items';
/**
 * Generated class for the ExpensesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-expenses',
  templateUrl: 'expenses.html',
})
export class ExpensesPage {

  currentItems: Expense[] = [];
  dbName = Tables.Expenses;

  constructor(public navCtrl: NavController, public expenseService: ItemsProvider, public modalCtrl: ModalController) {
    this.currentItems = []
    
  }

  ionViewDidLoad() {
    this.expenseService.initialize(Tables.Expenses);
    this.currentItems = this.expenseService.load(this.dbName) as Expense[];                                                                                                                                                                                                                                                    
  }

  search(){
    this.currentItems = this.expenseService.query(this.dbName)  as Expense[];
  }

  add(product){
    let addModal = this.modalCtrl.create('ExpenseCreatePage');
    addModal.onDidDismiss(expense => {
      if (expense) {
        expense._id = Date.now() + ''
        this.expenseService.add(this.dbName,expense);
        this.currentItems = this.expenseService.load(this.dbName) as Expense[];
      }
    })
    addModal.present();
  }
  
  delete(record){
    this.expenseService.delete(this.dbName, record);
    this.currentItems = this.expenseService.load(this.dbName) as Expense[];
  }

}
