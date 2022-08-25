import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Traveller } from 'src/app/Traveller';
import { Vehicle_add} from 'src/app/Vehicle_add';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.css']
})
export class AddTravellerComponent implements OnInit 
{
  private apiUrl = environment.apiBasedUrl;
  public formValues !: FormGroup;
  public vehicleValues !: FormGroup;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService ) { }

  ngOnInit(): void {
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
      }
      , err => {
        console.log(err);
        this.formValues.reset();
        this.toast.error({detail:"ERROR",summary:'Aadhar Number is Already Added',duration:5000});
      }
    )
  }

  addVehicle()
  {
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
          sessionStorage.setItem('vehicleId' , res.vehicleId) ;
      }
      , err => {
        console.log(err);
        this.vehicleValues.reset();
        this.toast.error({detail:"ERROR",summary:'Error in Data',duration:5000});
      }
    )
  }


}
