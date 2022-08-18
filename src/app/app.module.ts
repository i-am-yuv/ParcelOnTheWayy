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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatRadioModule} from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';


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
    AppRoutingModule,
    BrowserAnimationsModule ,


    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
