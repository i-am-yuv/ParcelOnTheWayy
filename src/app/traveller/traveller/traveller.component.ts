
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';
import { User_requests } from 'src/app/User_requests';
@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;

  showTravellerProfile : Boolean = true ;
  
  userRequestObject:User_requests[] = new Array() ;
  
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
getTravellerRequests()
{
 this.http.get<any[]>(  `${this.apiUrl}/userRequests/`+sessionStorage.getItem('travellerId') ).subscribe(
   res => 
     {
      this.userRequestObject = res ;
    
      console.log(res) ;
     }
   , err => {
           console.log(err) ;
       }
 )
}

updateStatus(userRequestId : number )
{
  this.http.put<any[]>(  `${this.apiUrl}/orderDetails/reject/`+userRequestId , null ).subscribe(
    res => 
      {
       console.log(res) ;
        this.ngOnInit() ;
      }
    , err => {
            console.log(err) ;
        }
  )
}


}

