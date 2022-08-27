import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-traveller',
  templateUrl: './traveller.component.html',
  styleUrls: ['./traveller.component.css']
})
export class TravellerComponent implements OnInit {

  showTravellerProfile : Boolean = true ;
  
  constructor() { }

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

}
