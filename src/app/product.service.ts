import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient:HttpClient) { }

  getAllProductsByMerchant(merchantId:any){
    return this.httpClient.get(`http://localhost:8084/api/v1/product/${merchantId}`);
  }
}
