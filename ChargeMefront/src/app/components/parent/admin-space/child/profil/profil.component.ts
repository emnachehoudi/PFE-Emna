import { Component, OnInit } from '@angular/core';
import { Admin } from '../../../../../models/admin';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AdminService } from '../../../../../services/admin.service';
import { OwnerService } from '../../../../../services/owner.service';
import { ModerateurService } from '../../../../../services/moderateur.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
showProfileEditPopup: any;
imgprofil='./assets/images.jpeg';
editEmail: any;
editPhoneNumber: any;
showEditSuccessPopup: any;
  constructor(private authAdminService: AdminService,private ownerservice:OwnerService,private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) { }
  currentURL = window.location.href; 
  editFirstname: any = {};
  editLastname: any = {};
  editRole: any = {};
  admin=new Admin()
  role="none"
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(this.currentURL.includes("4200"))
    {
      if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
    }
    else if(this.currentURL.includes("5000"))
    {
      if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginowner'])
      }
    }
    else if(this.currentURL.includes("5200"))
    {
      if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
    }
  
    this.getAdmin();
  }
  async getAdmin() {
    if(this.currentURL.includes("4200"))
    {
    try {
      const res = await this.authAdminService.getIdAdmin().toPromise();
      const adminData = await this.authAdminService.getAdmin(res['AdminId']).toPromise();
      if (adminData) {
        this.admin = adminData;
        this.role="Admin";
      } else {
        // Handle the case where adminData is undefined (e.g., show error message)
      }
    } catch (error) {
      console.error(error);
    }
    }
    else if(this.currentURL.includes("5000"))
    {
      try {
        const res = await this.ownerservice.getIdOwner().toPromise();
        const adminData = await this.ownerservice.getOwner(res['ProprietaireId']).toPromise();
        if (adminData) {
          this.admin.firstname = adminData.firstname;
          this.admin.lastname = adminData.lastname;
          if(adminData.loginType=="N")
          {
            this.admin.login = adminData.login;
          }else{
            this.admin.login = adminData.email;
          }
          
          this.admin.phone = adminData.phone;
          this.role="Owner";

        } 
        
      } catch (error) {
        console.error(error);
      }
    }
    else if(this.currentURL.includes("5200"))
    {
      try {
        const res = await this.moderateurservice.getIdModerateur().toPromise();
        const adminData = await this.moderateurservice.getModerateur(res['ModerateurId']).toPromise();
        if (adminData) {
          this.admin.firstname = adminData.firstname;
          this.admin.lastname = adminData.lastname;
          this.admin.login = adminData.login;
          this.admin.phone = adminData.phone;
          this.role="Moderator";

        } 
        
      } catch (error) {
        console.error(error);
      }
    }
  }
  editProfile(): void {
    this.showProfileEditPopup = true;
  }
  submitEditProfileForm(): void {
    this.showEditSuccessPopup = true;
    this.showProfileEditPopup = false;
  }
  closeEditProfileForm(): void {
    this.showProfileEditPopup = false;
  }
  closeEditPopup(): void {
    this.showEditSuccessPopup = false;
    this.showProfileEditPopup = false;
  }
 
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Créez un objet URL pour la nouvelle image
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Mettez à jour imgprofil avec l'URL de la nouvelle image
        this.imgprofil = reader.result as string;
      };
    }
  }
}