import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit{
  payments:any[];
  selectedPaymentId = 1;

  constructor(private activatedRoute:ActivatedRoute, 
    private paymentService:PaymentService){}

  
  merchantName = new FormControl('');

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe((res:any)=>{
      this.payments = res;
    })

    let idFromParams = this.activatedRoute.snapshot.queryParamMap.get('id');

    this.selectedPaymentId = (idFromParams) ? Number(idFromParams) : 1;
  }


  getPayments(){
    this.selectedPaymentId = 0;
    
    this.paymentService.getAllPaymentsByMerchant(this.merchantName.value).subscribe((res:any)=>{
      this.payments = res;
    }, (e:HttpErrorResponse)=>{
      console.log(e.error);
      
    })
  }


  maskCardNumber(cardNumber?:BigInteger){
    return "**** **** " + cardNumber?.toString().slice(8);
  }

  isPaymentSuccessfull(status:string){
    return status.toString() === "SUCCESS";
  }

  isPaymentFailed(status:string){
    return status.toString() === "FAILED";
  }

  isSelected(id:number){
    return this.selectedPaymentId == id;
  }
}
