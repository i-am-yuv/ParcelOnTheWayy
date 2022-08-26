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
  
  
  transactions:Transaction[]=[];
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
    this.http.get<any[]>(  `${this.apiUrl}/getActiveTravellers` ).subscribe(
      res => 
      {
         console.log(res);
        
       
       
        for (var _i = 0; _i < res.length; _i++) {
          console.log(_i);
       
         this.transaction.availableSpace=res[_i][1].availableSpace;
         this.transaction.deliverDate=res[_i][0].deliverDate;
         this.transaction.endLocation=res[_i][0].endLocation;
         this.transaction.startLocation=res[_i][0].startLocation;
       
         this.transaction.endTime=res[_i][0].endTime;
         this.transaction.startTime=res[_i][0].startTime;
         this.transaction.travellerId=res[_i][0].travellerId;
         this.transaction.transactionId=res[_i][0].transactionId;
         this.transaction.transactionDate=res[_i][0].transactionDate;
         this.transaction.vehicleId=res[_i][0].vehicleId;
         this.transaction.travellerStatus=res[_i][0].travellerStatus;
         this.transaction.vehicleNo=res[_i][1].vehicleNo;
         this.transaction.vehicleType=res[_i][1].vehicleType;
          console.log(this.transaction);
         
          this.transactions.push(Object.assign({},this.transaction));
        
        
       
         
          
         
        }
      console.log(this.transactions);
    
      
        // transactionId!: number;
        // transactionDate!: Date;
        // travellerId!: number;
        // vehicleId!: number;
        // startTime!: number;
        // endTime!: number;
        // travellerStatus!:String;
        // startLocation!: String;
        // endLocation! : String;
        // deliverDate!:Date;
        // vehicleType!:String;
        // vehicleNo!:String; 
        // availableSpace!:String;
       // console.log(this.transactions);
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
    sessionStorage.clear() ;
    this.toast.success({detail:"SUCCESS",summary:'Log Out Successfully',duration:2000});
    this.router.navigate(["login"]);
  }

  
  

  }