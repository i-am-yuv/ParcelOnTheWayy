import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Address } from 'src/app/Address';
import { User } from 'src/app/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css']
})
export class EdituserComponent implements OnInit {


  private apiUrl = environment.apiBasedUrl ;
  public formValue !: FormGroup ;
  


  constructor(private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }

  ngOnInit(): void 
  {
    this.formValue = this.formBuilder.group(
      {
        firstName:['',Validators.required] ,
        lastName:['' , Validators.required],
        mobileNo:['' , Validators.required],
         state:['' , Validators.required],
         city:['' , Validators.required],
        pincode:['' , Validators.required],
        street:['' , Validators.required],
        landmark:['' , Validators.required],
        id:['' ],
        AdressID:['']
      }
    )
      this.addUser() ;
  }

  addUser()
  {
    this.http.get<any>(  `${this.apiUrl}/address/`+sessionStorage.getItem('IdOfAddress')).subscribe(
      res => 
      {
          this.formValue.controls['state'].setValue(res.state) ;
          this.formValue.controls['city'].setValue(res.city) ;
          this.formValue.controls['pincode'].setValue( res.pincode) ;
          this.formValue.controls['street'].setValue(res.street) ;
          this.formValue.controls['landmark'].setValue(res.landmark) ;
          this.addUser1() ;
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went wrong in Address',duration:5000});
      }
    )
  }

   addUser1()
  {
    this.http.get<any>(  `${this.apiUrl}/viewUser/`+sessionStorage.getItem('userID')).subscribe(
      res => 
      {
        this.formValue.controls['firstName'].setValue(res.firstName) ;
        this.formValue.controls['lastName'].setValue(res.lastName) ;
        this.formValue.controls['mobileNo'].setValue(res.mobileNo) ;
      }
      , err => {
        this.toast.error({detail:"Your Details Are Already Filled",summary:'Please delete your current details to add new',duration:5000});
      }
    )
  }


  userObj : User = new User() ;
  addressObj : Address = new Address() ;


  updateUser()
  {
    this.addressObj.city = this.formValue.value.city ;
    this.addressObj.landmark = this.formValue.value.landmark ;
    this.addressObj.pincode = Number(this.formValue.value.pincode) ;
    this.addressObj.state = this.formValue.value.state ;
    this.addressObj.street = this.formValue.value.street  ;
      
    this.http.put<any>(  `${this.apiUrl}/address/edit/`+sessionStorage.getItem('IdOfAddress') , this.addressObj ).subscribe(
      res => 
      {
        console.log(res) ;
      }
      , err => {
        this.toast.error({detail:"Your Details Are Already Filled",summary:'Please delete your current details to add new',duration:5000});
      }
    )
   
    this.userObj.firstName = this.formValue.value.firstName;
    this.userObj.lastName = this.formValue.value.lastName;
    this.userObj.mobileNo = this.formValue.value.mobileNo;
    this.userObj.addressId =  Number(sessionStorage.getItem('IdOfAddress'))   ;
    
    this.http.put<any>(  `${this.apiUrl}/user/edit/`+sessionStorage.getItem('userID')  , this.userObj ).subscribe(
      res => 
      {
          console.log(res) ;
          this.router.navigate(["user/profile"]);
          this.toast.success({detail:"SUCCESS",summary:'User Edited Successfully',duration:2000});
          
      }
      , err => {
        this.toast.error({detail:"Error",summary:'Something Went Wrong',duration:5000});
      }
    )
  }

}

