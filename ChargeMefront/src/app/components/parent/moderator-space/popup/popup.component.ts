import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Born } from '../../../../models/born';
import { Car } from '../home-mod/car';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  
  @Input() borne: Born | null = null;
  @Output() closed = new EventEmitter<void>();
  car: Car = {
    nom: 'Tesla Model S',
    matricule: 'AB-1234',
    typeConnecteur: 'Type 2',
    pourcentageRecharge: 70
  };

  // Déclaration de la variable pour le calendrier
  calendar: Calendar | null = null;

  ngOnInit(): void {
    // Initialisation du calendrier dans la méthode ngOnInit
    this.calendar = new Calendar(document.getElementById('calendar')!, {
      plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
      initialView: 'dayGridMonth',
      events: [
        { title: 'Event 1', date: '2022-04-01' },
        { title: 'Event 2', date: '2022-04-02' }
      ],
      // Options de personnalisation du calendrier
      themeSystem: 'bootstrap', // Utilisez le thème Bootstrap (ou 'standard' par défaut)
      eventColor: 'red', // Couleur des événements
      eventBackgroundColor: 'green', // Couleur de fond des événements
      eventTextColor: 'white' // Couleur du texte des événements
      // Vous pouvez également définir d'autres options de personnalisation ici
    });
    // Rendre le calendrier une fois initialisé
    this.calendar.render();
  }

  fermerPopup(): void {
    this.closed.emit();
  }

  getAvailability(): string {
    // Vérifiez si la propriété disponibilite est définie et si elle est égale à "available"
    if (this.borne?.disponibilite === 'available') {
      return 'Available';
    } else {
      return 'Not Available'; 
    }
  }

  getBatteryStatus(): string {
    // Retourne l'état de la batterie extrait de la propriété etatB de l'objet Born
    return this.borne?.etatB || 'Unknown';
  }
}
