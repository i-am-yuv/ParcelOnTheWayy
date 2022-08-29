import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Address } from 'src/app/Address';
import { Transaction } from 'src/app/Transaction';
import { Traveller } from 'src/app/Traveller';
import { User } from 'src/app/User';
import { User_requests } from 'src/app/User_requests';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-see-details',
  templateUrl: './see-details.component.html',
  styleUrls: ['./see-details.component.css']
})
export class SeeDetailsComponent implements OnInit {
  
  private apiUrl = environment.apiBasedUrl ;
  userObj : User = new User() ;
  userRequestsObj : User_requests = new User_requests() ;
  vehicleNo!: String;
  addressObj : Address = new Address() ;
  travellerObj : Traveller = new Traveller;
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

    this.formValues = this.formBuilder.group(
      {
        source: ['', Validators.required],
        destination: ['', Validators.required]
      })
    
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
    this.http.get<any>(  `${this.apiUrl}/traveller/view/`+sessionStorage.getItem('travellerId')).subscribe(
      res => 
      {
          this.travellerObj.aadharno = res.aadharno ;
      }
      , err => {
        // this.toast.error({detail:"ERROR",summary:'Something Went Wrong',duration:5000});
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
    this.userRequestsObj.source = this.formValues.value.source;
    this.userRequestsObj.destination = this.formValues.value.destination;
    this.userRequestsObj.orderStatus = "pending";
    this.userRequestsObj.transactionId = Number( sessionStorage.getItem('seeTransactionId') );
    this.userRequestsObj.travellerId = Number( sessionStorage.getItem('seeTravellerId') );
    // console.log(sessionStorage.getItem('seeTransactionId') );
    this.userRequestsObj.userId = Number( sessionStorage.getItem('userID') ) ;

    this.http.get<any>(  `${this.apiUrl}/travellerPersonalDetails/`).subscribe(
      res => 
      { //this.formValues.firstName=res.firstName;
        this.userRequestsObj.firstName=res.firstName;
        this.userRequestsObj.lastName=res.lastName;
        this.userRequestsObj.mobileNo=res.mobileNo;
        console.log(this.userRequestsObj);
      }
      , err => {
        // this.toast.error({detail:"ERROR",summary:'Add User Info',duration:5000});
        console.log(err) ;
      }
    )
    // console.log(sessionStorage.getItem('userID') );
    // console.log(this.userRequestsObj);
    this.http.post<any>(  `${this.apiUrl}/userRequests/add/`, this.userRequestsObj).subscribe(
      res => {
        this.toast.success({detail:"SUCCESS",summary:'Request Sent',duration:5000});
        this.formValues.reset();
        sessionStorage.setItem('userRequestsId' , res.user_requests_id);
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'You have already send a request',duration:5000});
      }
    )
  }

}
