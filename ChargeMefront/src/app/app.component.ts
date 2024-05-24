import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
interface SideNavToggle{
  screenwidth : number;
  collapsed:boolean;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
constructor( private cookies:CookieService,private router:Router) { }

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      //this.router.navigate(['/loginadmin'])
      var currentURL = window.location.href; 
      if(currentURL.includes("http://localhost:4200")) 
      {
      this.router.navigate(['/loginadmin']) 
      }
      else if(currentURL.includes("http://localhost:5000"))
      {
      this.router.navigate(['/loginowner']) 
      }
      else if(currentURL.includes("http://localhost:5200"))
      {
      this.router.navigate(['/loginadmin']) 
      }
      else if(currentURL.includes("http://localhost:4000"))
      {
      this.router.navigate(['/loginadmin']) 
      }
    }
  }
  title = 'ChargeMe';
  isSideNavCollapsed=false;
  screenwidht=0;
  onToggleSideNav(data: SideNavToggle): void{
    this.screenwidht=data.screenwidth;
    this.isSideNavCollapsed=data.collapsed;
  }
  isPort(targetPort: number): boolean {
    var currentURL = window.location.href; 
    return currentURL.includes(targetPort.toString())
    //return window.location.port === targetPort.toString();
  }
 
}
