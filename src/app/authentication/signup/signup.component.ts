import { Component, OnInit } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { FormGroup , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  private apiUrl = environment.apiBasedUrl ;
  public signupValues !: FormGroup ;

  constructor( private formBuilder : FormBuilder , private http : HttpClient , private router : Router , private toast: NgToastService )
   { }

  ngOnInit(): void {
    this.signupValues = this.formBuilder.group(
      {
        email:['',Validators.required] ,
        password:['' , Validators.required]
      }
    )
  }

  signUp()
  {
       this.http.post<any>(  `${this.apiUrl}/signUp`  , this.signupValues.value )
       .subscribe(
        res=>{
          this.toast.success({detail:"SUCCESS",summary:"Sign Up Successfully" ,duration:5000});
               this.signupValues.reset() ;
               this.router.navigate( ["login"] ) ;
        },
        err=>{
          this.toast.warning({detail:"WARN",summary:'User Already Exists',duration:5000}); 
        }
       )
  }
}

