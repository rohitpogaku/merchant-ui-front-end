import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../merchant.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-merchant-page',
  templateUrl: './merchant-page.component.html',
  styleUrls: ['./merchant-page.component.css']
})
export class MerchantPageComponent implements OnInit{
  constructor(private activatedRoute:ActivatedRoute, 
              private merchantService:MerchantService,
              private productService:ProductService){}
  merchant:any;
  products:any;

  ngOnInit(): void {
    let merchantId = this.activatedRoute.snapshot.params['id'];
    this.merchantService.getAMerchant(merchantId)
      .subscribe((result:any)=>{
        this.merchant = result;
    });

    this.productService.getAllProductsByMerchant(merchantId).subscribe((result:any)=>{
      this.products = result;
    })

  }
}
