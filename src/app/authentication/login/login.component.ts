
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignUp } from 'src/app/SignUp';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{
  private apiUrl = environment.apiBasedUrl;
  public loginValues !: FormGroup;

 signupObj : SignUp = new SignUp() ;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService ) { }

  ngOnInit(): void {
    this.loginValues = this.formBuilder.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required]
      })
      
  }

  login() 
  {
    this.signupObj.email = this.loginValues.value.email ;
    this.signupObj.password = this.loginValues.value.password ;

    this.http.post<any>(`${this.apiUrl}/signIn` , this.signupObj )
      .subscribe(
        res => 
        {
            sessionStorage.clear() ;
            this.toast.success({detail:"SUCCESS",summary:'Login Successfully',duration:2000});
            this.loginValues.reset();
            sessionStorage.setItem('loginId' , res.id) ;
            this.populateUSerIdAndAddressId() ;

        }
        , err => {
          this.toast.error({detail:"ERROR",summary:'User Not Found',duration:5000});
        }
      )
  }

  populateUSerIdAndAddressId()
  {
    console.log("login id is "+sessionStorage.getItem('loginId') ) ;
    this.http.get<any>(`${this.apiUrl}/findUser/`+sessionStorage.getItem('loginId') )
    .subscribe(
      res => 
      {       console.log(res) ;
              console.log( "In Success for jivesh") ;
              this.router.navigate(["user"]);
      }
      , error => {
           console.log( "In Error for jivesh") ;
          //  if( error.message === 'User not exists')
          //  {
          //    console.log( "User Not exists") ;
          //    sessionStorage.setItem( 'addBtnVisible' , 'true' ) ;
          //  }
          //  else{
          //  // console.log( "User exists" +err.userid+" hai") ;
          //   sessionStorage.setItem('IdOfAddress' , error.addressId ) ;
          //   sessionStorage.setItem('userID' , error.userid ) ;
          //   sessionStorage.setItem( 'addBtnVisible' , 'false' ) ;
          //  }
          sessionStorage.setItem('userID' , error.userid ) ;
          this.router.navigate(["user"]);
          console.log(error) ;
      }
    )
  }

}



