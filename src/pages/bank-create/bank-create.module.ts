import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BankCreatePage } from './bank-create';

@NgModule({
  declarations: [
    BankCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(BankCreatePage),
  ],
})
export class BankCreatePageModule {}
