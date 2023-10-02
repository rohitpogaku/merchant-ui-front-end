import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit{

  paymentResponse:any;


  paymentForm : FormGroup;
  paymentData = {
    merchantId : '',
    cardNumber : '',
    expDate : '',
    cvv : '',
    amount : ''
  }

  nameOnCard() : FormControl{
    return this.paymentForm.get('nameOnCard') as FormControl;
  }

  cardNumber() : FormControl{
    return this.paymentForm.get('cardNumber') as FormControl;
  }

  expDate() : FormControl{
    return this.paymentForm.get('expDate') as FormControl;
  }

  cvv() : FormControl{
    return this.paymentForm.get('cvv') as FormControl;
  }

  amount() : FormControl{
    return this.paymentForm.get('amount') as FormControl;
  }

  constructor(private fb: FormBuilder, 
    private activatedRoute:ActivatedRoute, 
    private paymentService:PaymentService,
    private route: Router){}

  ngOnInit(): void {
    let price:string;
    let id:string;
    this.activatedRoute.queryParams.subscribe((params:any)=>{
      price = params['price'];
      id = params['merchantId'];

      this.initForm(price, id);
    });
    
  }

  initForm(price:string, id:string){
    this.paymentForm = this.fb.group({
      nameOnCard : ['', [Validators.required, Validators.minLength(3)]],
      cardNumber: ['', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]],
      expDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['',[Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      amount : [price],
      merchantId : [id]
    });
  }

  submit() {
    this.setPaymentData();

    this.paymentService.makePayment(this.paymentData).subscribe((result:any)=>{
      this.paymentResponse = result;
    }, (e:HttpErrorResponse)=>{
      console.log(e);
      
    })
  }

  setPaymentData(){
    this.paymentData = JSON.parse(JSON.stringify(this.paymentForm.value));
    let expDate = this.paymentData.expDate;
    this.paymentData.expDate = "20" + expDate.slice(3) + "-" + expDate.slice(0, 2) + "-01";
  }

  isDeclined(){
    return this.paymentResponse?.status == "DECLINED";
  }

  checkStatus(){
    let paymentId = +this.paymentResponse.message.split(':')[1];
    console.log(paymentId);
    
    this.route.navigate(['mypayments'], {queryParams:{id:paymentId}});
  }

  goToMerchantPage(){
    this.route.navigate(['merchant', this.paymentData.merchantId]);
  }

  resetForm(){
    if(!this.isDeclined()){
      this.paymentForm.reset();
    }
  }
}
