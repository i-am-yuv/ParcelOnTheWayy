import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http'
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/User';
import { Address } from 'src/app/Address';
import { delay } from 'rxjs';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;
  public formValues !: FormGroup ;


  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }

  ngOnInit(): void {
    this.formValues = this.formBuilder.group(
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
  }

  userObj : User = new User() ;
  addressObj : Address = new Address() ;

  
 

 
   async addUser()
  {
    this.addressObj.city = this.formValues.value.city ;
    this.addressObj.landmark = this.formValues.value.landmark ;
    this.addressObj.pincode = Number(this.formValues.value.pincode) ;
    this.addressObj.state = this.formValues.value.state ;
    this.addressObj.street = this.formValues.value.street  ;
      
    console.log( "should be first") ;
    
     this.http.post<any>(  `${this.apiUrl}/address/add`  , this.addressObj ).subscribe(
      res => 
      {
          console.log( " Address Id given By Address Table")
          console.log(res.addressId ) ;
          sessionStorage.setItem('IdOfAddress', res.addressId ) ;
          this.addUser1() ;
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went wrong in Address',duration:5000});
      }
    )
  }

   addUser1()
  {
    this.userObj.id = Number( sessionStorage.getItem('loginId') ) ;
    this.userObj.firstName = this.formValues.value.firstName;
    this.userObj.lastName = this.formValues.value.lastName;
    this.userObj.mobileNo = this.formValues.value.mobileNo;
    this.userObj.addressId =  Number(sessionStorage.getItem('IdOfAddress'))   ;
    
    console.log( "addressId in session "  +sessionStorage.getItem('IdOfAddress')) ;
    console.log( "Adress Id in User Table" +this.userObj.addressId ) ;

    this.http.post<any>(  `${this.apiUrl}/user/add`  , this.userObj ).subscribe(
      res => 
      {
        console.log(res) ;
          this.toast.success({detail:"SUCCESS",summary:'User Added Successfully',duration:2000});
          this.formValues.reset();
          this.router.navigate(["user"]);
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went wrong',duration:5000});
      }
    )
  }
  
}

