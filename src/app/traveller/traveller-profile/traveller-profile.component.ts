import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from 'src/app/User';
import { Address } from 'src/app/Address';
import { Traveller } from 'src/app/Traveller';

@Component({
  selector: 'app-traveller-profile',
  templateUrl: './traveller-profile.component.html',
  styleUrls: ['./traveller-profile.component.css']
})
export class TravellerProfileComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;

  userObj : User = new User() ;
  addressObj : Address = new Address() ;
  btnVisible : Boolean = true ; 
  travellerObj : Traveller = new Traveller();
  constructor(private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }

  ngOnInit(): void {
    if( sessionStorage.getItem('addBtnVisible') === 'false' )
    {
      this.btnVisible = false ;
    }
    else 
    {
      this.btnVisible = true ;
    }
    this.populateProfile() ; 
    this.getAadharNo() ;
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
        // this.toast.error({detail:"ERROR",summary:'Add User Info',duration:5000});
        console.log(err) ;
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
        // this.toast.error({detail:"ERROR",summary:'Something Went Wrong',duration:5000});
        console.log(err) ;
      }
    )
   }

   getAadharNo() {
    this.http.get<any>(  `${this.apiUrl}/traveller/view/`+sessionStorage.getItem('travllerId')).subscribe(
      res2 => 
      {
          this.travellerObj.aadharno = res2.aadharno ;
      }
      , err => {
        // this.toast.error({detail:"ERROR",summary:'Something Went Wrong',duration:5000});
        console.log(err) ;
      }
    )
   }

}
