import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { MerchantCardComponent } from './merchant-card/merchant-card.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    MerchantCardComponent,
    ProductCardComponent,
    MerchantPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
