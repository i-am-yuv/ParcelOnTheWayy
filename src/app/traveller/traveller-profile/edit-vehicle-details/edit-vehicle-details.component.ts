import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Vehicle_add } from 'src/app/Vehicle_add';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-edit-vehicle-details',
  templateUrl: './edit-vehicle-details.component.html',
  styleUrls: ['./edit-vehicle-details.component.css']
})
export class EditVehicleDetailsComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl;
  public formValue !: FormGroup ;
  
  constructor(private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
      {
        vehicleType: ['', Validators.required] ,
        availableSpace: ['', Validators.required] ,
        vehicleNo: ['', Validators.required] 
      }
    )
    this.addVehicle();
  }

  addVehicle() {
    this.http.get<any>(  `${this.apiUrl}/getVehicle/`+sessionStorage.getItem('vehicleId')).subscribe(
      res => 
      {
          this.formValue.controls['vehicleType'].setValue(res.vehicleType) ;
          this.formValue.controls['vehicleNo'].setValue(res.vehicleNo) ;
          this.formValue.controls['availableSpace'].setValue( res.availableSpace) ;
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went wrong in Vehicle', duration:5000});
      }
    )
  }

  vehicleObj : Vehicle_add = new Vehicle_add();

  updateVehicle() {
    this.vehicleObj.vehicleType = this.formValue.value.vehicleType;
    this.vehicleObj.vehicleNo = this.formValue.value.vehicleNo;
    this.vehicleObj.availableSpace = this.formValue.value.availableSpace;

    this.http.put<any>(  `${this.apiUrl}/vehicle/edit/`+sessionStorage.getItem('vehicleId') , this.vehicleObj ).subscribe(
      res => 
      {
        console.log(res);
        this.router.navigate(["user/traveller/travellerProfile"]);
        this.toast.success({detail:"SUCCESS",summary:'Vehicle Details Edited Successfully',duration:2000});
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Duplicate Vehicle Number',duration:5000});
      }
    )
    }
}
