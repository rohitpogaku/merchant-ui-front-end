import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MerchantService } from '../merchant.service';
import { IMG_URLS } from '../util/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  merchants:any;
  merchantUrls = IMG_URLS;

  constructor(private merchantService:MerchantService){}

  ngOnInit(): void {
    this.merchantService.getAllMerchants().subscribe((result:any)=>{
      this.merchants = result;
    }, (e:HttpErrorResponse)=>{
      console.log((e.error));
    })
  }

}
