import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { UserOrderDetails } from 'src/app/UserOrderDetails';

@Component({
  selector: 'app-user-order-details',
  templateUrl: './user-order-details.component.html',
  styleUrls: ['./user-order-details.component.css']
})
export class UserOrderDetailsComponent implements OnInit {
  
  private apiUrl = environment.apiBasedUrl ;

  orderObj : UserOrderDetails[] = new Array();

  public searchString!: string;

  isRatingVisible : Boolean = true ;

  public formValues !: FormGroup ;
  
  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService )
   { }

  ngOnInit(): void 
  {
    this.formValues = this.formBuilder.group(
      {
        rating : ['', Validators.required]
      })
    this.orderDetails() ;
  }
  
  orderDetails()
   {
    this.http.get<any>(  `${this.apiUrl}/getUserOrderDetails/`+sessionStorage.getItem('userID') ).subscribe(
      res => 
      {
          this.orderObj = res ;
          console.log(res) ;
         
      }
      , err => {
      
        console.log(err) ;
      }
    )
   }

   giveRating(travellerId : number , orderId : number  )
   {
    this.http.post<any>( `${this.apiUrl}/addRating/`+travellerId+"/"+this.formValues.value.rating , null ).subscribe(
      res => 
      {
          console.log(res) ; 
          this.toast.success({detail:"Thanks For Using Our Application",summary:'your rating sent Successfully',duration:5000});
          console.log("Rating given") ;
          this.taskCompleted( orderId , 'Completed')  ;
      }
      , err => {
        this.toast.warning({detail:"Error",summary:'Please Select Your Rating',duration:5000});
        console.log(err) ;
      }
    )
   }
   
   taskCompleted( orderId : number , status : String )
   {
     this.http.put<any>(  `${this.apiUrl}/orderDetails/edit/`+orderId+"/"+status , null ).subscribe(
      res => 
      {
          console.log(res) ;
          this.ngOnInit() ;
          console.log("status changed") ;
      }
      , err => {
      
        console.log(err) ;
      }
    )
   }
   
 
}

