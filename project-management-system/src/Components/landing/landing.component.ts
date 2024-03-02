import { Component } from '@angular/core';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavBarComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {


}
