import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/User';
import { Address } from 'src/app/Address';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  private apiUrl = environment.apiBasedUrl ;

  userObj : User = new User() ;
  addressObj : Address = new Address() ;

  
 
   
  constructor(private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }

  ngOnInit(): void {
    console.log( " working") ;
    console.log( sessionStorage.getItem('userID') ) ;
       this.populateProfile() ; 
  }


   populateProfile()
   {
    this.http.get<any>(  `${this.apiUrl}/viewUser/`+sessionStorage.getItem('userID') ).subscribe(
      res => 
      {
          this.userObj.firstName = res.firstName ;
          this.userObj.lastName = res.lastName ;
          this.userObj.mobileNo = res.mobileNo ;
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went Wrong',duration:5000});
      }
    )


      this.http.get<any>(  `${this.apiUrl}/address/`+sessionStorage.getItem('IdOfAddress') ).subscribe(
      res1 => 
      {
          this.addressObj.city = res1.city ;
          this.addressObj.landmark = res1.landmark ;
          this.addressObj.pincode = res1.pincode ;
          this.addressObj.state = res1.state ;
          this.addressObj.street = res1.street ;
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went Wrong',duration:5000});
      }
    )

   }

}
