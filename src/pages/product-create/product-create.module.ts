import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductCreatePage } from './product-create';

@NgModule({
  declarations: [
    ProductCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(ProductCreatePage),
    TranslateModule.forChild()
  ],
})
export class ProductCreatePageModule {}
