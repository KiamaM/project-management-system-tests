import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { RegisterService } from '../../Services/user.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, RouterOutlet, NavBarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  signUpForm!:FormGroup

  constructor(private fb:FormBuilder, private registerService:RegisterService, private router:Router){
    this.signUpForm = fb.group({
      first_name:['', [Validators.required]],
      email:['', [Validators.required], [Validators.email]],
      last_name:['', [Validators.required]],
      password:['', [Validators.required]],      
    })
  }
  registerUser(){
    console.log(this.signUpForm.value); 
    
    const postedData = {...this.signUpForm.value}
    this.registerService.registerUser(postedData).subscribe(
      response =>{
        console.log(response);   
        this.router.navigate(['login'])

      },
      error=>{
        console.error(error);
      }
      
    )
  }
}
