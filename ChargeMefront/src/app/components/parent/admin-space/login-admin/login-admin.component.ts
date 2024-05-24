import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AuthAdmin } from '../../../../models/auth-admin';
import { ModerateurService } from '../../../../services/moderateur.service';
import { SuperadminService } from '../../../../services/superadmin.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent implements OnInit {

  constructor(private superadminservice:SuperadminService,private authAdminService: AdminService,private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }
  admin=new AuthAdmin()
  space=""
  currentURL = window.location.href; 
  
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(this.currentURL.includes("4200"))
    {
      this.space="Admin"
      if(this.cookies.get('token')) 
      { 
        this.router.navigate(['/dashboard'])
      }
    }
    else if(this.currentURL.includes("5200"))
    {
      this.space="Moderator"
      if(this.cookies.get('token'))
      { 
        this.router.navigate(['/home-mod'])
      }
    }
    else if(this.currentURL.includes("4000"))
    {
      this.space="SuperAdmin"
      if(this.cookies.get('token'))
      { 
        this.router.navigate(['/dashboard'])
      }
    }
  
  }

  async login()
{
  var label = document.getElementById("alert");
        if(label)
        {
          label.style.display = "none";
        }
  if(this.currentURL.includes("4200"))
    {
     // this.space="Admin"
     try{
      var res= await this.authAdminService.login(this.admin).toPromise();
      console.log(res["token"])
      this.cookies.set("token",res['token'])
      this.router.navigate(['/dashboard'])
     }
     catch{
      var label = document.getElementById("alert");
      if(label)
      {
        label.style.display = "block";
      }
      console.log("pas de token bro ooooooooooooooooooooo")

        }
    }
    else if(this.currentURL.includes("5200"))
    {
     //this.space="Moderator"
     try{
      var res= await this.moderateurservice.login(this.admin).toPromise();
      console.log(res["token"])
      this.cookies.set("token",res['token'])
      //this.cookies.set("log",res['lg'])
      this.router.navigate(['/home-mod'])
    }
    catch{
      var label = document.getElementById("alert");
      if(label)
      {
        label.style.display = "block";
      }
      console.log("pas de token bro ooooooooooooooooooooo")

        }

    }
      else if(this.currentURL.includes("4000"))
      {
       //this.space="Moderator"
       try{
        var res= await this.superadminservice.login(this.admin).toPromise();
        if(res["token"])
        {
          this.cookies.set("token",res['token'])
        console.log("we have a token !!!!!")
        this.router.navigate(['/dashboard'])
        }
      }catch
      {
        var label = document.getElementById("alert");
        if(label)
        {
          label.style.display = "block";
        }
        console.log("pas de token bro ooooooooooooooooooooo")

      }
        
    }
 
}
image='./assets/charge.png';
}
