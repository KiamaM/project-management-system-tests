import { Component} from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavBarComponent {
  isTourDrawerOpen: boolean = false;
  isProfileDrawerOpen: boolean = false;

  logoutText:string = 'LOG IN'

  currentroute = (this.route.snapshot.routeConfig?.path);
  token = localStorage.getItem('token') as string
  admin = localStorage.getItem('admin') as string

  constructor(private router:Router, private route:ActivatedRoute){

    if(this.currentroute == 'login'){

      this.logoutText = 'LOGOUT'
      
    }
  }

  isLoggedIn = localStorage.getItem('token')
  isAdmin = localStorage.getItem('admin')

  today = new Date()

  navigatetoLogin(){    
    this.router.navigate(['login'])
  }

  navigatetoRegister(){
    this.router.navigate(['register'])
  }

  logout(){
    this.router.navigate(['login'])
    localStorage.clear()    
  }

  toggleTourDrawer() {
    this.isTourDrawerOpen = !this.isTourDrawerOpen;
    this.isProfileDrawerOpen = false; // Close the profile drawer
  }

  toggleProfileDrawer(){
    this.isProfileDrawerOpen = !this.isProfileDrawerOpen;
    this.isTourDrawerOpen = false; // Close the book drawer
  }



  

}

