import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseCreatePage } from './expense-create';

@NgModule({
  declarations: [
    ExpenseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseCreatePage),
  ],
})
export class ExpenseCreatePageModule {}
