import { Component } from '@angular/core';

@Component({
  selector: 'app-home-res',
  templateUrl: './home-res.component.html',
  styleUrl: './home-res.component.css'
})
export class HomeResComponent {
  image = './assets/charge.png';
  maps='./assets/maps.jpg';
  terminal='./assets/bornes.png';
    reservation = {
    date: null,
    heure: null,
    duree: null
  };

  constructor() { }

  submitReservation() {
    // Ici, vous pouvez ajouter la logique pour traiter la réservation
    console.log('Réservation soumise :', this.reservation);
    // Vous pouvez également envoyer les données de réservation à votre backend pour traitement
  }
}
