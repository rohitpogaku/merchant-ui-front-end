import { Component, Input, OnInit } from '@angular/core';
import { IMG_URLS } from '../util/constants';

@Component({
  selector: 'app-merchant-card',
  templateUrl: './merchant-card.component.html',
  styleUrls: ['./merchant-card.component.css']
})
export class MerchantCardComponent{
  @Input() merchant:any;
  @Input() merchantIndex:any;
  urls = IMG_URLS;

  
}
