import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit{
  payments:any[];
  selectedPaymentId:number;
  searchBy = "NOTHING";

  constructor(private activatedRoute:ActivatedRoute, 
    private paymentService:PaymentService){}

  
  searchField = new FormControl('', Validators.required);

  ngOnInit(): void {
    this.paymentService.getAllPayments().subscribe((res:any)=>{
      this.payments = res;
      this.selectedPaymentId = res.length;
    })

    // let idFromParams = this.activatedRoute.snapshot.queryParamMap.get('id');

    // this.selectedPaymentId = (idFromParams) ? Number(idFromParams) : 1;
    
  }

  searchPayments(){
    const searchValue:string = String(this.searchField.value);
    
    if(this.searchBy == 'pId' && searchValue){
      if(isNaN(parseInt(searchValue))){
        this.getPayments('');
      } else {
        this.getPaymentByPaymentId(Number(searchValue));
      }
    } else {
      this.getPayments(searchValue);    
    }
  }


  getPayments(merchantName:string){
    this.selectedPaymentId = 0;
    
    this.paymentService.getAllPaymentsByMerchant(merchantName).subscribe((res:any)=>{
      this.payments = res;
      this.selectedPaymentId = res.length;
    }, (e:HttpErrorResponse)=>{
      console.log(e.error);
      
    })
  }

  getPaymentByPaymentId(paymentId:number){
    this.paymentService.getPaymentByPaymentId(paymentId).subscribe((res:any)=>{
      this.payments = [res];
      this.selectedPaymentId = 1;
    }, (e:HttpErrorResponse)=>{
      this.payments = [];
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
