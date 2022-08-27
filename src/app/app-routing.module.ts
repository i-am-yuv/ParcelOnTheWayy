import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './authentication/about/about.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { AddTravellerComponent } from './traveller/add-traveller/add-traveller.component';
import { CreateTransactionComponent } from './traveller/create-transaction/create-transaction.component';
import { EditUserTravellerAadharComponent } from './traveller/edit-user-traveller-aadhar/edit-user-traveller-aadhar.component';
import { EditUserTravellerComponent } from './traveller/edit-user-traveller/edit-user-traveller.component';
import { OrdersComponent } from './traveller/orders/orders.component';
import { EditVehicleDetailsComponent } from './traveller/traveller-profile/edit-vehicle-details/edit-vehicle-details.component';
import { TravellerProfileComponent } from './traveller/traveller-profile/traveller-profile.component';
import { TravellerComponent } from './traveller/traveller/traveller.component';
import { AdduserComponent } from './user/adduser/adduser.component';
import { EdituserComponent } from './user/edituser/edituser.component';
import { MessageComponent } from './user/message/message.component';
import { ProfileComponent } from './user/profile/profile.component';
import { SearchComponent } from './user/search/search.component';
import { SeeDetailsComponent } from './user/see-details/see-details.component';

import { UserComponent } from './user/user/user.component';


const routes: Routes = [
 { path:"",redirectTo:"login",pathMatch:'full'},
 { path:"login" , component: LoginComponent} ,
 { path:"signUp" , component:SignupComponent},
 { path:"about" , component:AboutComponent },
 { path:"user" , component:UserComponent},
 { path:"user/profile" , component:ProfileComponent},
 { path:"user/traveller" , component:TravellerComponent },
 {path:"user/search" , component:SearchComponent },
 {path:"user/addUser" , component:AdduserComponent },
 {path:"user/traveller/createTransaction" , component:CreateTransactionComponent } ,
 { path :"user/traveller/travellerProfile" , component:TravellerProfileComponent },
 { path : "user/traveller/orders" , component:OrdersComponent },
 {path:"user/traveller/addTravellerDetails" , component:AddTravellerComponent },
 {path:"user/profile/edit" , component:EdituserComponent },
 {path:"user/traveller/travellerProfile/edit" , component:EditUserTravellerComponent},
 {path:"user/traveller/travellerAadhar/edit" , component:EditUserTravellerAadharComponent},
 {path:"user/traveller/travellerProfile/vehicleDetails/edit", component:EditVehicleDetailsComponent},
  {path:"user/seeDetails" ,component:SeeDetailsComponent},
  {path:"",component:MessageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
