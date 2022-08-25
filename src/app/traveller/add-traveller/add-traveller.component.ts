import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Traveller } from 'src/app/Traveller';
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


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService ) { }

  ngOnInit(): void {
    this.formValues = this.formBuilder.group(
      {
        aadharno: ['', Validators.required] 
      })
  }

  travellerObj : Traveller = new Traveller() ;

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
          sessionStorage.setItem('travllerId' , res.travellerId) ;
      }
      , err => {
        console.log(err);
        this.formValues.reset();
        this.toast.error({detail:"ERROR",summary:'Aadhar Number is Already Added',duration:5000});
      }
    )
  }

}
