import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service'; 
import { Router } from '@angular/router';
import { Client } from '../../../../models/client';
import { SuperadminService } from '../../../../services/superadmin.service';
import { AllClient } from '../../../../models/all-client';

@Component({
  selector: 'app-userlist1',
  templateUrl: './userlist1.component.html',
  styleUrls: ['./userlist1.component.css'] // Corrected 'styleUrl' to 'styleUrls'
})
export class Userlist1Component implements OnInit {
  selectedClient: any;
  showEditForm = false;
  editedClient=new Client;
  showEditSuccessPopup = false;
  showDeletePopup :any;
  constructor(private superadminservice: SuperadminService, private cookies: CookieService, private router: Router) { }

  page = 0;
  allclient = new AllClient();
  editClientPopup = false;

  ngOnInit(): void {
    // Throw an error if not implemented
    // throw new Error('Method not implemented.');
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']); 
    }
    this.getAllclient();

 
   
  }

  async getAllclient() {
    var res = await this.superadminservice.getAllClient(this.page).subscribe((clients) => {
      this.allclient = clients;
    });
  }

  async next() {
    if (this.page < (Number(this.allclient.nbr) - 1)) {
      this.page = this.page + 1;
      var res = await this.superadminservice.getAllClient(this.page).subscribe((clients) => {
        this.allclient = clients;

        console.log("----------" + this.page + "---------");
        console.log("----------" + this.allclient.nbr + "---------");
      });
    }
  }

  async Previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      var res = await this.superadminservice.getAllClient(this.page).subscribe((clients) => {
        this.allclient = clients;
      });
    }
  }

  async toggleBlocked(client: Client) {
    client.BlackList = !client.BlackList;
    var rest= await this.superadminservice.UpdateClient(client).toPromise();
        if(rest && rest[0] === 1)
        {
         var res= await this.superadminservice.BloquerClient(client).toPromise();
          console.log("updated!!!!!")

        // location.reload();
        }
    console.log("-----"+ client.BlackList+ "-----")
    //client.BlackList = !client.BlackList;
    console.log(`${client.firstname} ${client.lastname} is now ${client.BlackList ? 'blocked' : 'unblocked'}`);
  }

  editClient(client: any) {
    this.showEditForm = true;
    this.selectedClient = client;
  }

  closeEditClientPopup() {
    this.editClientPopup = false;
    this.selectedClient = null;
  }

  successPopup(): void {
    this.showEditForm = false;
    this.showEditSuccessPopup = true;
  }

  fermerSuccessPopup(): void {
    this.showEditSuccessPopup = false;
  }

  fermerPopup(): void {
    this.showEditForm = false;
    this.selectedClient = null;
  } 
  closePopupDelete(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showDeletePopup = null;
    }
  }
  openDeletePopup(id:any): void {
    this.showDeletePopup = id; // Corrected variable name
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
  async deleteClient(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res = await this.superadminservice.deleteClient(showDeletePopup).toPromise()
    if(res=="ok" )
        {
         location.reload();
        }
    //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup
  }
}
