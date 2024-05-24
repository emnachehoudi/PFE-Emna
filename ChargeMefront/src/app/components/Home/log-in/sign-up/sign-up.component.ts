import { Component } from '@angular/core';
import { Owner } from '../../../../models/owner';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  image = './assets/charge.png';
  user: Owner = new Owner(); // Instanciation de l'objet User
Owner: any;

  onSubmit() {
    // Logique de traitement des données soumises
    console.log('Formulaire soumis avec succès !', this.user);
  }
}
