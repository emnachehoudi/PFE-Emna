import { Component,Input,OnInit,input } from '@angular/core';
import { NotificationService } from './notif.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-body3',
  templateUrl: './body3.component.html', 
  styleUrl: './body3.component.css'
})
export class Body3Component implements OnInit {
  public get notificationService(): NotificationService {
    return this._notificationService; 
  }
  public set notificationService(value: NotificationService) {
    this._notificationService = value;
  }
  image='./assets/charge.png';
  bgimage='./assets/rectangle.png';
  @Input() collapsed=false;
  @Input() screenWidth=0;

getBodyClass(): string {
  let styleClass='';
  if(this.collapsed&&this.screenWidth> 768){
    styleClass='body-trimmed';
  }else if(this.collapsed && this.screenWidth<=768 && this.screenWidth>0){
    styleClass='body-md-screen'
  }
 return styleClass;
}

constructor(private _notificationService: NotificationService, private cookies:CookieService,private router:Router) { }
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

showNotifications() {
  // Appelez une méthode dans le service de notification pour obtenir les notifications
  this.notificationService.getNotifications().subscribe(notifications => {
    // Affichez les notifications dans une boîte de dialogue ou un autre composant de notification
    console.log(notifications); // Exemple de traitement des notifications
  });
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
{ 

  var currentURL = window.location.href; 
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
} 
