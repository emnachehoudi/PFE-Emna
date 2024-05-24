import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SuperadminService } from '../../../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { AllAdmins } from '../../../../models/all-admins';

@Component({
  selector: 'app-adminlist1',
  templateUrl: './adminlist1.component.html',
  styleUrls: ['./adminlist1.component.css']
})
export class Adminlist1Component implements OnInit {
  constructor(private superadminservice: SuperadminService, private cookies: CookieService, private router: Router) { }
  alladmin = new AllAdmins();
  page = 0;
  showCreatePopup = false;
  showSuccessPopup = false;
  showEditPopup = false;
  showEditSuccessPopup = false;
  showDeletePopup :any;
  showDeleteSuccessPopup = false; // Variable to control admin deletion success popup
  newAdmin: any = {};
  selectPhone:any

  ngOnInit(): void {
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']);
    }
    this.getAlladmin();
  }

  async getAlladmin() {
    var res = await this.superadminservice.getAllAdmin(this.page).subscribe((admins) => {
      this.alladmin = admins;
    });
  }

  async next() {
    if (this.page < (Number(this.alladmin.nbr) - 1)) {
      this.page = this.page + 1;
      var res = await this.superadminservice.getAllAdmin(this.page).subscribe((admins) => {
        this.alladmin = admins;
      });
    }
  }

  async Previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      var res = await this.superadminservice.getAllAdmin(this.page).subscribe((admins) => {
        this.alladmin = admins;
      });
    }
  }

  navigateToAdminDetails(id: number) {
    this.router.navigate(['/view', id]);
  }

  call(phone:any) {
    // Implement or remove this method
    this.selectPhone=phone
  }

  sendEmail() { 
    // Implement or remove this method
  }
  closePopup2(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.selectPhone = null;
    }
  }
  closePopupDelete(event: Event): void {
    // Vérifier si l'événement a été déclenché à l'intérieur du popup
    if (event.target === event.currentTarget) {
      this.showDeletePopup = null;
    }
  }
  openCreatePopup(): void {
    this.showCreatePopup = true; // Corrected variable name
  }
  openEditPopup(): void {
    this.showEditPopup = true; // Corrected variable name
  }
  openDeletePopup(id:any): void {
    this.showDeletePopup = id; // Corrected variable name
  }

  closeCreatePopup(): void {
    this.showCreatePopup = false; // Corrected variable name
  }
  closeEditPopup(): void {
    this.showEditSuccessPopup = false; // Corrected variable name
    this.showEditPopup = false; // Corrected variable name
  }

  closeSuccessPopup(): void {
    this.showSuccessPopup = false;
  }

  closeDeletePopup(): void {
    this.showDeletePopup = null;
  }
  

  closeBothPopups(): void {
    this.closeCreatePopup();
    this.closeSuccessPopup();
  }

  submitCreateAdminForm(): void {
    this.showCreatePopup = false;
    this.showSuccessPopup = true;
  }
  submitEditAdminForm(): void {
    this.showEditPopup = false;
    this.showEditSuccessPopup = true;
  }
  

  deleteAdmin(showDeletePopup:any) {
    // Assuming the delete operation is successful
    this.showDeletePopup = null; // Hide the delete confirmation popup
    var res =  this.superadminservice.deleteAdminId(showDeletePopup).toPromise()
    location.reload();
    //this.showDeleteSuccessPopup = true; // Show the "Admin Deleted" popup
  }
  
  cancelDeletePopup() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }

  cancelSuccessPopup() {
    this.showSuccessPopup = false; // Hide the "Admin Created" popup
  }
  
  cancelBothPopups() {
    this.cancelDeletePopup();
    this.cancelSuccessPopup();
  }
  cancelDeleteSuccessPopup() {
    this.showDeleteSuccessPopup = false;
     // Hide the "Admin Deleted" popup
     
  }
  cancelDelete() {
    this.showDeletePopup = false; // Hide the delete confirmation popup
  }
  
  closeDeleteSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
  }
}
