import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';
import { Transaction } from 'src/app/Transaction';
import { Vehicle_add } from 'src/app/Vehicle_add';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private apiUrl = environment.apiBasedUrl ;

  btnVisible : Boolean = true ; 
  
  transaction:Transaction=new Transaction();
  //getRequestObject : GetRequest[] = new Array() ;
  
  transactions:Transaction[]=new Array();
  public searchString!: string;
  vehicleDetail: Vehicle_add= new Vehicle_add();
  constructor(private http : HttpClient ,  private router: Router, private toast: NgToastService) { }

  ngOnInit(): void 
  {
     
    if( sessionStorage.getItem('addBtnVisible') === 'false' )
    {
      this.btnVisible = false ;
    }
    else 
    {
      this.btnVisible = true ;
    }
    this.getActiveTravellers();
  }


getActiveTravellers()
   {
    this.http.get<any>(  `${this.apiUrl}/getActiveTravellers` ).subscribe(
      res => 
      {
         console.log(res);
         this.transactions=res;
       console.log(this.transactions);
         
       }
      , err => {
        // this.toast.error({detail:"ERROR",summary:'Add User Info',duration:5000});
        console.log(err) ;
      }
    )
   }
    getVehicleDetails(vehicleNo:number){
  this.http.get<Vehicle_add>(  `${this.apiUrl}/getVehicle`+vehicleNo ).subscribe(
    res => 
    {
     // console.log(res);
      this.vehicleDetail=res;
      console.log(this.vehicleDetail);
    }
    , err => {
      // this.toast.error({detail:"ERROR",summary:'Add User Info',duration:5000});
      console.log(err) ;
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

  
  seeDetails <String>( arr :String[]){
    console.log("inseedetails");
    sessionStorage.setItem('seeTravellerId' , String(arr[0]) ) ;
    sessionStorage.setItem('seeVehicleNo' , String(arr[1]) ) ;
    sessionStorage.setItem('seeTransactionId', String(arr[2]));
    console.log(sessionStorage.getItem("seeTravellerId"));
    console.log(sessionStorage.getItem("seeVehicleNo"))
    this.router.navigate(["user/seeDetails"]);
  }

  }