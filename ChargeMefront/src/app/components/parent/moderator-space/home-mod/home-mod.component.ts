import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../services/admin.service';
import { OwnerService } from '../../../../services/owner.service';
import { ModerateurService } from '../../../../services/moderateur.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Born } from '../../../../models/born';


@Component({
  selector: 'app-home-mod',
  templateUrl: './home-mod.component.html',
  styleUrls: ['./home-mod.component.css'] // Correction du chemin pour le styleUrl
})
export class HomeModComponent implements OnInit {
  bornes: Born[] = [
    { 
      disponibilite: 'broken', 
      emplacement: 'Terminal 1', 
      modele: 'Modèle 1', 
      serialNumber: '123456789', 
      etatB: 'Bon état', 
      proprietaire: 'owner 1', 
      pourcentageP: '80%', 
      NumeroTel: '123-456-789', 
      createdAt: '2024-04-20', 
      updatedAt: '2024-04-21', 
      StationId: 1,
      prixParKilowatt: 0.25, // Exemple de valeur pour la propriété prixParKilowatt
      image: './assets/panne.png' // Exemple de chemin d'image
    },
    { 
      disponibilite: 'available', 
      emplacement: 'Terminal 2', 
      modele: 'Modèle 1', 
      serialNumber: '123456789', 
      etatB: 'Bon état', 
      proprietaire: 'owner 1', 
      pourcentageP: '80%', 
      NumeroTel: '123-456-789', 
      createdAt: '2024-04-20', 
      updatedAt: '2024-04-21', 
      StationId: 1,
      prixParKilowatt: 0.25, // Exemple de valeur pour la propriété prixParKilowatt
      image: './assets/dispo.png' // Exemple de chemin d'image
    },
    { 
      disponibilite: 'unavai', 
      emplacement: 'terminal 1', 
      modele: 'Modèle 1', 
      serialNumber: '123456789', 
      etatB: 'Bon état', 
      proprietaire: 'owner 1', 
      pourcentageP: '80%', 
      NumeroTel: '123-456-789', 
      createdAt: '2024-04-20', 
      updatedAt: '2024-04-21', 
      StationId: 1,
      prixParKilowatt: 0.25, // Exemple de valeur pour la propriété prixParKilowatt
      image: './assets/occupé.png' // Exemple de chemin d'image
    },
    // Ajoutez d'autres bornes ici
];
  elRef: any;


  constructor(
    private authAdminService: AdminService,
    private ownerservice: OwnerService,
    private moderateurservice: ModerateurService,
    private cookies: CookieService,
    private router: Router,
    
  ) { }

  ngOnInit(): void {
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginadmin']);
    }
  }

  
  
  popupVisible = false;
  borneSelectionnee: any;

  afficherPopup(borne: any) {
    this.popupVisible = true;
    this.borneSelectionnee = borne;
    console.log('Popup affiché', borne); // Ajoutez ce console.log() pour vérifier si le pop-up est affiché correctement et pour afficher les détails de la borne sélectionnée
  }

  fermerPopup() {
    this.popupVisible = false;
    this.borneSelectionnee = null;
    console.log('Popup fermé'); // Ajoutez ce console.log() pour vérifier si le pop-up est fermé correctement
  }
 }