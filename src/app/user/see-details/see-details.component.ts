import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Address } from 'src/app/Address';
import { Transaction } from 'src/app/Transaction';
import { User } from 'src/app/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrls: ['./see-details.component.css']
})
export class SeeDetailsComponent implements OnInit {
  
  private apiUrl = environment.apiBasedUrl ;
  userObj : User = new User() ;
  vehicleNo!: String;
  addressObj : Address = new Address() ;
  btnVisible : Boolean = true ; 
  formValues = new FormGroup ({
   
    source: new FormControl(),
    destination:new FormControl()
  });
  public viewForm!:FormGroup;
  transaction:Transaction=new Transaction();
  public formbuilder!:FormBuilder;
  constructor(private router : Router,private http : HttpClient , private toast: NgToastService,private formBuilder : FormBuilder) { }
 
  ngOnInit(): void {

    
    if( sessionStorage.getItem('addBtnVisible') === 'false' )
    {
      this.btnVisible = false ;
    }
    else 
    {
      this.btnVisible = true ;
    }
   
    this.populateProfile();
  }
  populateProfile()
   {
     this.http.get<any>(  `${this.apiUrl}/travellerPersonalDetails/`+sessionStorage.getItem('seeTravellerId') ).subscribe(
      res => 
      { //this.formValues.firstName=res.firstName;
        this.userObj.firstName=res.firstName;
        this.userObj.lastName=res.lastName;
        this.userObj.mobileNo=res.mobileNo;
        console.log(this.userObj);
        this.vehicleNo= sessionStorage.getItem("seeVehicleNo")!;
        console.log(this.vehicleNo);
      }
      , err => {
        // this.toast.error({detail:"ERROR",summary:'Add User Info',duration:5000});
        console.log(err) ;
      }
    )
      
   }

  logOut()
  {
    sessionStorage.clear() ;
    this.toast.success({detail:"SUCCESS",summary:'Log Out Successfully',duration:2000});
    this.router.navigate(["login"]);
  }

  sendRequest(){
    if(this.formValues.valid){
    console.log(this.formValues.value);
    this.toast.success({detail:"SUCCESS",summary:'Request Sent',duration:5000});
    this.router.navigate(["/user"]);
  }
  else{
    this.toast.error({detail:"ERROR",summary:'Something Went wrong ',duration:5000});
     
  }

  }

}
