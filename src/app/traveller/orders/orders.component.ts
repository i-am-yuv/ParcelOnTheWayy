import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { OrderDetails } from 'src/app/OrderDetails';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  
  private apiUrl = environment.apiBasedUrl ;

  orderObj : OrderDetails[] = new Array();
  
  public searchString!: string;

    
  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService )
   { }

  ngOnInit(): void 
  {
    this.travellerOrderDetails() ;
  }
  
  travellerOrderDetails()
   {
    this.http.get<any>(  `${this.apiUrl}/getTravellerOrderDetails/`+sessionStorage.getItem('travellerId') ).subscribe(
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

   updateStatus( orderId : number , status : String )
   {
     this.http.put<any>(  `${this.apiUrl}/orderDetails/edit/`+orderId+"/"+status , null ).subscribe(
      res => 
      {
          console.log(res) ;
          this.ngOnInit() ;
          this.toast.success({detail:"SUCCESS",summary:'Status Change Successfully',duration:2000}) ;
      }
      , err => {
      
        console.log(err) ;
      }
    )
   }
 
}
