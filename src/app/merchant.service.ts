import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private httpClient:HttpClient) { }

  getAllMerchants(){
    return this.httpClient.get("http://localhost:8084/api/v1/merchant");
  }

  getAMerchant(merchantId:any){
    let params = new HttpParams().set("id", merchantId);
    return this.httpClient.get("http://localhost:8084/api/v1/merchant/search", {params});
  }
}
