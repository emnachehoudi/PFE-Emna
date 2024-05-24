import { Component, OnInit } from '@angular/core';
import { SuperadminService } from '../../../../services/superadmin.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListHistorique } from '../../../../models/list-historique';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  page = 0;
  listhist = new ListHistorique();
  selectedHistoryDetails: any;
  editedHistory: any;
  showDetailsPopup = false;
  showPopup = false;
  reservationModifiee: any; // Stocke la réservation à modifier
  img1 = './assets/images.jpeg';
  showEditForm=false;
  showEditSuccessPopup = false;
  showDeleteSuccessPopup = false;
  supprimerReservationConf = false;
  constructor(private superadminservice: SuperadminService, private cookies: CookieService, private router: Router) { }

  ngOnInit(): void {
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']);
    }
    this.getAllHist();
  }

  async getAllHist() {
    const res = await this.superadminservice.getAllHistorique(this.page).subscribe((list) => {
      this.listhist = list;
    });
  }

  async next() {
    if (this.page < (Number(this.listhist.nbr)) - 1) {
      this.page = this.page + 1;
      const res = await this.superadminservice.getAllHistorique(this.page).subscribe((list) => {
        this.listhist = list;
      });
    }
  }

  async Previous() {
    if (this.page > 0) {
      this.page = this.page - 1;
      const res = await this.superadminservice.getAllHistorique(this.page).subscribe((list) => {
        this.listhist = list;
      });
    }
  }

  modifierReservation(hist: any): void {
    this.reservationModifiee = hist;
    this.showEditForm = true;
  }

  supprimerReservation(hist: any): void {
    this.supprimerReservationConf = true;
  }

  fermerPopup(): void {
    this.showEditForm = false;
    this.reservationModifiee = null;
  }

  showHistoryDetailsPopup(history: any): void {
    this.selectedHistoryDetails = history;
    this.showDetailsPopup = true;
  }

  closeDetailsPopup(): void {
    this.selectedHistoryDetails = null;
    this.showDetailsPopup = false;
  }

  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.popup')) {
      this.showPopup = false;
    }
  }
  successPopup(): void {
    this.showEditSuccessPopup = true;
  }
  fermerSuccessPopup(): void {
    this.showEditSuccessPopup = false;
  }
  supprimerReser(): void {
    this.showDeleteSuccessPopup = true;
    this.supprimerReservationConf = false;
  }
  fermerSupprimerReser(): void {
    this.supprimerReservationConf = false;
  }
  closeDeleteSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
  }
}
