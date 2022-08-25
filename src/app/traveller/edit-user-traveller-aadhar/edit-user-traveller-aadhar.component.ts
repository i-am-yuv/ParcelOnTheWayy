import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Traveller } from 'src/app/Traveller';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-user-traveller-aadhar',
  templateUrl: './edit-user-traveller-aadhar.component.html',
  styleUrls: ['./edit-user-traveller-aadhar.component.css']
})
export class EditUserTravellerAadharComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;
  public formValue !: FormGroup ;

  constructor(private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group(
    {
      aadharno:['',Validators.required] 
    }
    )
    this.addAadhar();
  }

  addAadhar() 
  {
    this.http.get<any>(  `${this.apiUrl}/traveller/view/`+sessionStorage.getItem('travellerId')).subscribe(
      res => 
      {
          this.formValue.controls['aadharno'].setValue(res.aadharno) ;
      }
      , err => {
        this.toast.error({detail:"ERROR",summary:'Something Went wrong in AadharNo',duration:5000});
      }
    )
  }

  travellerObj : Traveller = new Traveller() ;

  updateAadhar() {
    this.travellerObj.aadharno = this.formValue.value.aadharno;
    this.http.put<any>(  `${this.apiUrl}/traveller/edit/`+sessionStorage.getItem('travellerId') , this.travellerObj ).subscribe(
      res => 
      {
          console.log(res) ;
          this.router.navigate(["user/traveller/travellerProfile"]);
          this.toast.success({detail:"SUCCESS",summary:'Aadhar Number Updated Successfully',duration:2000});
          
      }
      , err => {
        this.toast.error({detail:"Error",summary:'Something Went Wrong',duration:5000});
      }
    )
  }

}
