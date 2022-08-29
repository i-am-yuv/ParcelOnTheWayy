import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { PendingRequest } from 'src/app/PendingRequest';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

  showTravellerProfile : Boolean = true ;
  private apiUrl = environment.apiBasedUrl ;

  btnVisible : Boolean = true ; 
  
  request:PendingRequest=new PendingRequest();
  
  
  requests: PendingRequest[]=[];
  public searchString!: string;
  constructor(private http : HttpClient ,  private router: Router, private toast: NgToastService) { }
  
  

  ngOnInit(): void 
  {
    if( sessionStorage.getItem('travellerId') === null )
    {
      this.showTravellerProfile = false ;
    }
    else{
         this.showTravellerProfile = true ;
    }
    this.getPendingRequests();
  }

  getPendingRequests()
   {
    this.http.get<any[]>(  `${this.apiUrl}/userRequests` ).subscribe(
      res => 
      {
        
        for (var _i = 0; _i < res.length; _i++) {
       
         this.request.userId=res[_i][0].userId;
         this.request.transactionId=res[_i][0].transactionId;
         this.request.travellerId=res[_i][0].travellerId;
         this.request.orderStatus=res[_i][0].orderStatus;
         this.request.destination=res[_i][0].destination;
         this.request.source=res[_i][0].source;
         this.request.userFirstName=res[_i][0].userFirstName;
         this.request.userLastName=res[_i][0].userLastName;
         this.request.userPhoneNo=res[_i][0].userPhoneNo;
        
         
          this.requests.push(Object.assign({},this.request));
        
        }
    
      }
      , err => {
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

}
