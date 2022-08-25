import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  private apiUrl = environment.apiBasedUrl ;
  public orderSendValues !: FormGroup ;

    
  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService )
   { }

  ngOnInit(): void {
    this.orderSendValues = this.formBuilder.group(
      {
        //  transactionId:['',Validators.required] ,
        // travellerId:['' , Validators.required],
        userId:['' , Validators.required],
        orderStatus:['' , Validators.required],
        // modeOfTravel:['' , Validators.required],
        dropLocation:['' , Validators.required],
        pickUpLocation:['' , Validators.required],
        expectedStartTime:['' , Validators.required],
        expectedEndTime:['' , Validators.required]
      }
    )
  }
  
  orderSend(){
    this.http.post<any>( `${this.apiUrl}/orderDetails/add`  , this.orderSendValues.value )
       .subscribe(
        res=>{
          this.toast.success({detail:"SUCCESS",summary:"Order Sent Successfully" ,duration:5000});
          this.orderSendValues.reset() ;
        },
        err=>{
          this.toast.warning({detail:"WARN",summary:"error in data",duration:5000}); 
        }
       )
  }
}
