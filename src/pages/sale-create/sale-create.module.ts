import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleCreatePage } from './sale-create';

@NgModule({
  declarations: [
    SaleCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SaleCreatePage),
  ],
})
export class SaleCreatePageModule {}
