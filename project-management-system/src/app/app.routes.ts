import { Routes } from '@angular/router';
import { LandingComponent } from '../Components/landing/landing.component';
import { RegisterComponent } from '../Components/register/register.component';
import { LoginComponent } from '../Components/login/login.component';

export const routes: Routes = [
    {path:'', component:LandingComponent},
    {path:'register', component:RegisterComponent},  
    {path:'login', component:LoginComponent},  
];



