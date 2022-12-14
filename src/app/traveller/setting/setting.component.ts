

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Traveller } from 'src/app/Traveller';
import { Vehicle_add} from 'src/app/Vehicle_add';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit 
{
  private apiUrl = environment.apiBasedUrl;
  public formValues !: FormGroup;
  public vehicleValues !: FormGroup;

  IsAadharVisible : Boolean = true ;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService ) { }

  ngOnInit(): void {

    if( sessionStorage.getItem('travellerId') === null )
    {
      this.IsAadharVisible = true ;
    }
    else{
      this.IsAadharVisible = false ;
    }

    this.formValues = this.formBuilder.group(
      {
        aadharno: ['', Validators.required] 
      })

      this.vehicleValues = this.formBuilder.group(
        {
          vehicleType: ['', Validators.required] ,
          availableSpace: ['', Validators.required] ,
          vehicleNo: ['', Validators.required] 
        })
  }

  travellerObj : Traveller = new Traveller() ;
  vehiclerObj : Vehicle_add = new Vehicle_add() ;

  addTraveller()
  {
    this.travellerObj.id = Number( sessionStorage.getItem('loginId') ) ;
    this.travellerObj.aadharno = this.formValues.value.aadharno ;

    this.http.post<any>(`${this.apiUrl}/traveller/add` , this.travellerObj )
    .subscribe(
      res => 
      {
        console.log(res) ;
          this.toast.success({detail:"SUCCESS",summary:'Aadhar Number Added Successfully',duration:2000});
          this.formValues.reset();
          sessionStorage.setItem('travellerId' , res.travellerId) ;
          this.ngOnInit() ;
      }
      , err => {
        console.log(err);
        this.formValues.reset();
        this.toast.error({detail:"ERROR",summary:'Please Fill 12 Digit Aadhar Number!!',duration:5000});
      }
    )
  }
  logOut()
  {
    if (confirm("Sure , you want to log out") == true) { 
    sessionStorage.clear() ;
    this.toast.success({detail:"SUCCESS",summary:'Log Out Successfully',duration:2000});
    this.router.navigate(["login"]);
    }
    else{
    }
  }

  addVehicle()
  {
    if( sessionStorage.getItem('travellerId') === null  )
    {
      this.toast.info({detail:"INFO",summary:'Add Your Aadhar Details First',duration:2000});
    }
    else{
      this.vehiclerObj.travellerId = Number( sessionStorage.getItem('travellerId') ) ;
      this.vehiclerObj.vehicleType = this.vehicleValues.value.vehicleType ;
      this.vehiclerObj.vehicleNo = this.vehicleValues.value.vehicleNo ;
      this.vehiclerObj.availableSpace = this.vehicleValues.value.availableSpace ;
  
  
      this.http.post<any>(`${this.apiUrl}/vehicle/add` , this.vehiclerObj )
      .subscribe(
        res => 
        {
            console.log(res) ;
            this.toast.success({detail:"SUCCESS",summary:'Vehicle Details Added Successfully',duration:2000});
            this.vehicleValues.reset();
        }
        , err => {
          console.log(err);
          this.vehicleValues.reset();
          this.toast.error({detail:"ERROR",summary:'Error in Data',duration:5000});
        }
      )
    }
    
  }


}

