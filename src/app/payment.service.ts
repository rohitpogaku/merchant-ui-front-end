import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient:HttpClient) { }

  makePayment(payment:any){
    return this.httpClient.post("http://localhost:8085/api/v1/payment", payment);
  }

  getAllPayments(){
    return this.httpClient.get("http://localhost:8085/api/v1/payment");
  }

  getPaymentByPaymentId(paymentId:number){
    return this.httpClient.get(`http://localhost:8085/api/v1/payment/${paymentId}`);
  }

  getAllPaymentsByMerchant(merchantName:any){
    let params = new HttpParams().set("name", merchantName);
    return this.httpClient.get("http://localhost:8085/api/v1/payment", {params})
  }

  registerMerchant(merchantData:any){
    return this.httpClient.post("http://localhost:8085/api/v1/merchant", merchantData);
  }
}
