import { ExpensesPage } from './../pages/expenses/expenses';
import { InventoryPage } from './../pages/inventory/inventory';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePicker } from '@ionic-native/date-picker';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PouchDbService } from '../providers/pouch-db-service/pouch-db-service';
import { BankPage } from '../pages/bank/bank';
import { SalesPage } from '../pages/sales/sales';
import { ItemsProvider } from '../providers/items/items';

import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InventoryPage,
    BankPage,
    SalesPage,
    ExpensesPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    InventoryPage,
    BankPage,
    SalesPage,
    ExpensesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PouchDbService,
    ItemsProvider,
    File,
    FileOpener
  ]
})
export class AppModule {}
