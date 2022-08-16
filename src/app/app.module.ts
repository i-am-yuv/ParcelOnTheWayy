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
import { AddTravellerComponent } from './traveller/add-traveller/add-traveller.component';

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
    AddTravellerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
