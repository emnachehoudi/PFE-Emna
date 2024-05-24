import { Component, OnInit } from '@angular/core';

// Importez les types de Google Maps
declare var google: any;

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent implements OnInit{
  image = './assets/charge.png';
  facebook='./assets/facebook.png';
   instagram='./assets/instagram.png';
  twitter='./assets/twitter.png';
  constructor() { }

  ngOnInit(): void {
    // Chargement dynamique de Google Maps
    this.loadGoogleMaps();
  }

  loadGoogleMaps() {
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDT8YCG5HrDpMRYhvfqOW1Bmo2tHIfOFGU&callback=initMap`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    document.head.appendChild(googleMapsScript);
  }

  // Fonction d'initialisation de la carte
  initMap() {
    const myLatLng = { lat: -34.397, lng: 150.644 };
    const map = new google.maps.Map(document.getElementById('map'), {
      center: myLatLng,
      zoom: 8
    });
    const marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: 'Hello World!'
    });
  }
}
