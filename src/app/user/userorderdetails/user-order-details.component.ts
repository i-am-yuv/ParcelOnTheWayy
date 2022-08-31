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

    
  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService )
   { }

  ngOnInit(): void 
  {
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
 
}

