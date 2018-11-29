import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {Routes, RouterModule} from "@angular/router"
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SigninComponent } from './authentification/signin/signin.component';
import { SignupComponent } from './authentification/signup/signup.component';
import { CarListComponent } from './car-list/car-list.component';
import { SingleCarComponent } from './car-list/single-car/single-car.component';
import { SingleFormComponent } from './car-list/single-form/single-form.component';
import { CarFormComponent } from './car-list/car-form/car-form.component';
import { HeaderComponent } from './header/header.component';


import { AuthentificationService } from './services/authentification.service';
import { CarsService } from './services/cars.service';
import { AuthGuardService } from './services/auth-guard.service';

//** et '' c pour gerer les mauvaises urls
const appRoutes: Routes = [
  { path: 'auth/signup', component: SignupComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'cars',canActivate: [AuthGuardService], component: CarListComponent },
  { path: 'cars/new',canActivate: [AuthGuardService], component: CarFormComponent },
  { path: 'cars/view/:id',canActivate: [AuthGuardService], component: SingleCarComponent },
  { path: '', canActivate: [AuthGuardService],component: CarListComponent},
  { path: '**', canActivate: [AuthGuardService],component: CarListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    CarListComponent,
    SingleCarComponent,
    SingleFormComponent,
    CarFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
	RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthGuardService,CarsService,AuthentificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
