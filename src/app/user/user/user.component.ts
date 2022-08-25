import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Transaction } from 'src/app/Transaction';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private apiUrl = environment.apiBasedUrl ;

  btnVisible : Boolean = true ; 
  
  //transaction:Transaction=new Transaction();

  public transactions:Transaction[]=[];

  constructor(private http : HttpClient) { }

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
    this.http.get<Transaction[]>(  `${this.apiUrl}/getActiveTravellers` ).subscribe(
      res => 
      {
       // console.log(res);
        this.transactions=res;
        console.log(this.transactions);
      }
      , err => {
        // this.toast.error({detail:"ERROR",summary:'Add User Info',duration:5000});
        console.log(err) ;
      }
    )
   }
  }