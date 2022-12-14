import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './authentication/login/login.component';

import { SignupComponent } from './authentication/signup/signup.component';
import { AboutComponent } from './authentication/about/about.component';
import { UserComponent } from './user/user/user.component';
import { ProfileComponent } from './user/profile/profile.component';
import { TravellerComponent } from './traveller/traveller/traveller.component';
import { CreateTransactionComponent } from './traveller/create-transaction/create-transaction.component';
import { TravellerProfileComponent } from './traveller/traveller-profile/traveller-profile.component';
import { OrdersComponent } from './traveller/orders/orders.component';
import { AdduserComponent } from './user/adduser/adduser.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserOrderDetailsComponent } from './user/userorderdetails/user-order-details.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './user/search/search.component';
import { NgToastModule } from 'ng-angular-popup';
import { EdituserComponent } from './user/edituser/edituser.component';
import { EditUserTravellerComponent } from './traveller/edit-user-traveller/edit-user-traveller.component';
import { EditUserTravellerAadharComponent } from './traveller/edit-user-traveller-aadhar/edit-user-traveller-aadhar.component';
import{FilterPipe} from "src/app/FilterPipe";
import { EditVehicleDetailsComponent } from './traveller/traveller-profile/edit-vehicle-details/edit-vehicle-details.component';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { SeeDetailsComponent } from './user/see-details/see-details.component';
import { MessageComponent } from './user/message/message.component';
import { TimeFormatPipe } from './TimeFormatPipe';
import { SettingComponent } from './traveller/setting/setting.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    UserComponent,
    ProfileComponent,
    TravellerComponent,
    CreateTransactionComponent,
    TravellerProfileComponent,
    OrdersComponent,
    AdduserComponent,
    SearchComponent,
    EdituserComponent,
    EditUserTravellerComponent,
    EditUserTravellerAadharComponent,
    FilterPipe,
    EditVehicleDetailsComponent,
    SeeDetailsComponent,
    MessageComponent,
    UserOrderDetailsComponent,
    TimeFormatPipe,
    SettingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule ,
    ReactiveFormsModule,
    HttpClientModule,
    NgToastModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule, 
    MatCardModule,
    MatFormFieldModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
