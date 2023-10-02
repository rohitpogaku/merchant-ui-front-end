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
import { ReactiveFormsModule } from '@angular/forms';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { InputComponent } from './input/input.component';
import { FormControlPipe } from './form-control.pipe';
import { PaymentsComponent } from './payments/payments.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    MerchantCardComponent,
    ProductCardComponent,
    MerchantPageComponent,
    PaymentPageComponent,
    InputComponent,
    FormControlPipe,
    PaymentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
