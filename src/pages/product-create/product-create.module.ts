import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCreatePage } from './product-create';

@NgModule({
  declarations: [
    ProductCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCreatePage),
  ],
})
export class ProductCreatePageModule {}
