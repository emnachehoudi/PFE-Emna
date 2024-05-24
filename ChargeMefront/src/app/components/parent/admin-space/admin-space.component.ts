import { Component,OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
@Component({
  selector: 'app-admin-space',
  templateUrl: './admin-space.component.html',
  styleUrl: './admin-space.component.css'
})
export class AdminSpaceComponent implements OnInit {
  constructor( private cookies:CookieService,private router:Router) { }
  
    ngOnInit(): void {
      //throw new Error('Method not implemented.');
      if(!this.cookies.get('token'))
      {
        //this.router.navigate(['/loginadmin'])
        var currentURL = window.location.href; 
        if(currentURL.includes("4200")) 
        {
        this.router.navigate(['/loginadmin']) 
        }
        else if(currentURL.includes("5000"))
        {
        this.router.navigate(['/loginowner']) 
        }
        else if(currentURL.includes("5200"))
        {
        this.router.navigate(['/loginadmin']) 
        }
        else if(currentURL.includes("4000"))
        {
        this.router.navigate(['/loginadmin']) 
        }
      }
    }
  image = './assets/charge.png';
 
  isSideNavCollapsed=false;
  screenwidht=0;
  onToggleSideNav(data: SideNavToggle): void{
    this.screenwidht=data.screenwidth;
    this.isSideNavCollapsed=data.collapsed;
}
}