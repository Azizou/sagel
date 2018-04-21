import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';
import { ExpenseCreatePage } from './expense-create';

@NgModule({
  declarations: [
    ExpenseCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ExpenseCreatePage),
    TranslateModule.forChild()
  ],
})
export class ExpenseCreatePageModule {}
