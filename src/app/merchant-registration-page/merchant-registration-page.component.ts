import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-merchant-registration-page',
  templateUrl: './merchant-registration-page.component.html',
  styleUrls: ['./merchant-registration-page.component.css']
})
export class MerchantRegistrationPageComponent implements OnInit{
  merchantResponse:any;
  merchantForm : FormGroup;
  isDeclined = false;
  errorMessage = "";

  getMerchantName() : FormControl{
    return this.merchantForm.get('merchantName') as FormControl;
  }

  getWebsite() : FormControl{
    return this.merchantForm.get('website') as FormControl;
  }

  getEmail() : FormControl{
    return this.merchantForm.get('email') as FormControl;
  }

  getBusinessType() : FormControl{
    return this.merchantForm.get('businessType') as FormControl;
  }

  getAddress() : FormControl{
    return this.merchantForm.get('address') as FormControl;
  }

  getContactNumber() : FormControl{
    return this.merchantForm.get('contactNumber') as FormControl;
  }

  constructor(private fb: FormBuilder, 
    private paymentService:PaymentService,
    private route: Router){}

  ngOnInit(): void {
    this.initForm();
    
  }

  initForm(){
    this.merchantForm = this.fb.group({
      merchantName : ['', [Validators.required, Validators.minLength(3)]],
      website: ['', [Validators.required, Validators.pattern(/^(?!\s+$).+$/)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      businessType: ['',[Validators.required]],
      address : [''],
      contactNumber : ['', [Validators.required, Validators.pattern(/^(?![\s])[0-9]+(?![\s])$/)]]
    });
  }

  submit() {
    console.log(this.merchantForm.value);
    

    this.paymentService.registerMerchant(this.merchantForm.value).subscribe((result:any)=>{
      this.merchantResponse = result;
      this.isDeclined = false;
      
    }, (e:HttpErrorResponse)=>{
      console.log(e);
      this.isDeclined = true;
      this.errorMessage = e.error?.message;
      this.merchantResponse = undefined;
      
    })
  }

  goHome(){
    this.route.navigate(['']);
  }

  resetForm(){
    if(!this.isDeclined){
      this.merchantForm.reset();
    }
  }
}
