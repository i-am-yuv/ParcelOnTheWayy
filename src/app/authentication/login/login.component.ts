
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
            sessionStorage.setItem('loginId' , res.id) ;
            this.toast.success({detail:"SUCCESS",summary:'Login Successfully',duration:2000});

            this.loginValues.reset();
            this.router.navigate(["user"]);
        }
        , err => {
          this.toast.error({detail:"ERROR",summary:'User Not Found',duration:5000});
        }
      )
  }
}



