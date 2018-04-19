import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SaleCreatePage } from './sale-create';

@NgModule({
  declarations: [
    SaleCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SaleCreatePage),
    TranslateModule.forChild()
  ],
})
export class SaleCreatePageModule {
}
