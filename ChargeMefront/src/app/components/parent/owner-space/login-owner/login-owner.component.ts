import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthAdmin } from '../../../../models/auth-admin';
import { OwnerService } from '../../../../services/owner.service';
import { AuthOwner } from '../../../../models/auth-owner';

@Component({
  selector: 'app-login-owner',
  templateUrl: './login-owner.component.html',
  styleUrl: './login-owner.component.css'
})
export class LoginOwnerComponent implements OnInit {
  constructor(private authOwnerService: OwnerService,private cookies:CookieService,private router:Router) { }
  owner=new AuthOwner()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(this.cookies.get('token'))
      { 
        this.router.navigate(['/home'])
      }
  }
  async login()
  { this.router.navigate(['/home'])
     try{
    this.owner.loginType="N" 
     var res= await this.authOwnerService.login(this.owner).toPromise();
     console.log(res["token"])
     this.cookies.set("token",res['token'])
     this.router.navigate(['/home'])
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
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Créez un objet URL pour la nouvelle image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Mettez à jour l'image avec l'URL de la nouvelle image
        this.image = reader.result as string;
      };
    }
  }
  
  image='./assets/charge.png';
facebook='./assets/facebook.png';
apple='./assets/apple.png';
google='./assets/google.png';
twitter='./assets/twitter.png';
}
