import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-traveller',
  templateUrl: './add-traveller.component.html',
  styleUrls: ['./add-traveller.component.css']
})
export class AddTravellerComponent implements OnInit 
{
  private apiUrl = environment.apiBasedUrl;
  public aadharValues !: FormGroup;


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private toast: NgToastService ) { }

  ngOnInit(): void {
  }

  addAadhar()
  {

  }

}
