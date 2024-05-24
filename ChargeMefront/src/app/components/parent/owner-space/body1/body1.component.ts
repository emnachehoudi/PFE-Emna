import { Component,Input,OnInit,input } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from '../../body/notif.service';

@Component({
  selector: 'app-body1',
  templateUrl: './body1.component.html',
  styleUrl: './body1.component.css'
})
export class Body1Component implements OnInit{
  image='./assets/charge.png';
  bgimage='./assets/rectangle.png';
  @Input() collapsed=false;
  @Input() screenWidth=0;

getBodyClass(): string { 
  let styleClass='';
  if(this.collapsed&&this.screenWidth> 768){
    styleClass='body1-trimmed';
  }else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
    styleClass='body1-md-screen'
  }
 return styleClass;
}
constructor(private notificationService: NotificationService, private cookies:CookieService,private router:Router) { }
ngOnInit(): void {
  // throw new Error('Method not implemented.');
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

showNotification: boolean = false;

toggleNotification(): void {
  this.showNotification = !this.showNotification;
}

closeNotification(): void {
  this.showNotification = false;
}
tokenIsExiste(): boolean{
  if(this.cookies.get('token'))
  {
    return true
  }
  else{
    return false
  }
}
logout()
{ var currentURL = window.location.href; 
  if(currentURL.includes("4200"))
  {
    this.cookies.deleteAll();
  this.router.navigate(['/loginadmin']) 
  }
  else if(currentURL.includes("5000"))
  {
    this.cookies.deleteAll();
  this.router.navigate(['/loginowner']) 
  }
  else if(currentURL.includes("5200"))
  {
    this.cookies.deleteAll();
  this.router.navigate(['/loginadmin'])  
  }
  else if(currentURL.includes("4000"))
  {
    this.cookies.deleteAll();
  this.router.navigate(['/loginadmin']) 
  }
}
isNotificationPopupOpen: boolean = false;

toggleNotificationPopup(): void {
  this.isNotificationPopupOpen = !this.isNotificationPopupOpen;
}
}

