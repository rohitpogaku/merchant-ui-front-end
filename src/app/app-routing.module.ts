import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MerchantPageComponent } from './merchant-page/merchant-page.component';
import { PaymentPageComponent } from './payment-page/payment-page.component';
import { PaymentsComponent } from './payments/payments.component';

const routes: Routes = [
  {path : 'home', component : HomeComponent},
  {path : 'merchant/:id', component:MerchantPageComponent},
  {path : 'checkout', component:PaymentPageComponent},
  {path : 'mypayments', component : PaymentsComponent},
      // {path : 'payment/status', component : CheckPaymentComponent},
      // {path : 'merchant/register', component : MerchantRegistrationComponent},
      // {path : 'login', component : LoginComponent},
  {path : '', redirectTo : '/home', pathMatch : 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
