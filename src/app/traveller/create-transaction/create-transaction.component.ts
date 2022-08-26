import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse} from '@angular/common/http'
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgToastService } from 'ng-angular-popup';
import { Vehicle_add } from 'src/app/Vehicle_add';
import { Transaction2 } from 'src/app/Transaction2';


@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;
  public formValues !: FormGroup ;


  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService) { }


  ngOnInit(): void {
    this.formValues = this.formBuilder.group(
      {
        startTime:['' , Validators.required],
        deliverDate:['' , Validators.required],
        endTime:['' , Validators.required],
        startLocation:['' , Validators.required],
        endLocation:['' , Validators.required],
      }
    )
  }
   
  vehiclebj : Vehicle_add = new Vehicle_add() ;
  transactionObj : Transaction2 =new Transaction2() ;

   addTransaction()
  {
    this.transactionObj.vehicleId = Number(sessionStorage.getItem('vehicleId')) ;
    this.transactionObj.travellerId = Number(sessionStorage.getItem('travellerId')) ;
    this.transactionObj.startTime = Number(this.formValues.value.startTime);
    this.transactionObj.endTime = Number(this.formValues.value.endTime);
    this.transactionObj.travellerStatus = "Active";
    this.transactionObj.startLocation = this.formValues.value.startLocation;
    this.transactionObj.endLocation = this.formValues.value.endLocation;
    this.transactionObj.deliverDate= this.formValues.value.deliverDate;
  
   
    this.http.post<any>(  `${this.apiUrl}/transaction/add/`  , this.transactionObj ).subscribe(
      res => 
      {
          console.log(res) ;
          sessionStorage.setItem('transactionId' , res.transactionId ) ;
  
          this.toast.success({detail:"SUCCESS",summary:'transaction Created Successfully',duration:2000});
          this.formValues.reset();
      }
      , err => {
        this.toast.error({detail:"Error in Transection",summary:'Error in Data',duration:5000});
      }
    )
  }

}
