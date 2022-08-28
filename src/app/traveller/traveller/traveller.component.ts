import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

  showTravellerProfile : Boolean = true ;
  
  constructor(private router: Router, private toast: NgToastService) { }

  ngOnInit(): void 
  {
    if( sessionStorage.getItem('travellerId') === null )
    {
      this.showTravellerProfile = false ;
    }
    else{
         this.showTravellerProfile = true ;
    }
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
