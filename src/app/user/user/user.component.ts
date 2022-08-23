import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  
  constructor() { }

  ngOnInit(): void 
  {
    if( sessionStorage.getItem('addBtnVisible') === 'false' )
    {
      (<HTMLInputElement> document.getElementById("addBtn")).disabled = true;
    }
    else 
    {
      (<HTMLInputElement> document.getElementById("addBtn")).disabled = false ;
    }
  }

}
