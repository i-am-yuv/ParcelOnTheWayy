
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { User_requests } from 'src/app/User_requests';
import { GetRequest } from 'src/app/GetRequest';
@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;

  showTravellerProfile : Boolean = true ;

  getRequestObject : GetRequest[] = new Array() ;
  
  public searchString!: string;

  constructor( private http : HttpClient , private router: Router, private toast: NgToastService) { }

  ngOnInit(): void 
  {
    if( sessionStorage.getItem('travellerId') === null )
    {
      this.showTravellerProfile = false ;
    }
    else{
         this.showTravellerProfile = true ;
    }
    this.getTravellerRequests() ;
    
  }


getTravellerRequests()
{
 this.http.get<any>(`${this.apiUrl}/userRequests/`+sessionStorage.getItem('travellerId') ).subscribe(
   res => 
     {
      this.getRequestObject = res ;
    
      console.log(res) ;
     }
   , err => {
           console.log(err) ;
       }
 )
}

updateStatus(UserRequestId : number )
{
  this.http.put<any[]>(  `${this.apiUrl}/orderDetails/reject/`+UserRequestId , null ).subscribe(
    res => 
      {
       console.log(res) ;
        this.ngOnInit() ;
        this.toast.success({detail:"SUCCESS",summary:'Request Removed Successfully',duration:2000});
        window.location.reload();
      }
    , err => {
            console.log(err) ;
        }
  )
}
acceptOrder( UserRequestId : number )
{
  this.http.post<any[]>(  `${this.apiUrl}/orderDetails/accept/`+UserRequestId , null ).subscribe(
    res => 
      {
       console.log(res) ;
        this.ngOnInit() ;
        this.toast.success({detail:"SUCCESS",summary:'Request Accepted Successfully',duration:2000});
        window.location.reload();
      }
    , err => {
            console.log(err) ;
        }
  )
}


}

