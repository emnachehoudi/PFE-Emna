import { Component, OnInit } from '@angular/core';
import { ModerateurService } from '../../../../services/moderateur.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ListeReservation } from '../../../../models/liste-reservation';
import { Reservation } from '../../../../models/reservation';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css'] 
})
export class ReservationComponent implements OnInit {
  reservations: Reservation[] = []; 
  constructor(private moderateurservice:ModerateurService,private cookies:CookieService,private router:Router) {
    
   }
  page=0
  rest=""
  listreserv=new ListeReservation()
  m:any
  img1 = './assets/images.jpeg';
  showPopup = false;
  reservationModifiee: any; // Stocke la réservation à modifier
  ngOnInit(): void {
  
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
      {
        this.router.navigate(['/loginadmin'])
      }
      this.getAllReservation()
  }
  async getAllReservation()
  {
    const rest = await this.moderateurservice.getIdModerateur().toPromise(); 
    this.rest=rest['ModerateurId']
    const adminData = await this.moderateurservice.getModerateur(rest['ModerateurId']).toPromise()
    if(adminData)
    {
    console.log('Données du modérateur :', adminData['StationId']);
    this.m=adminData['StationId']
        //var ids=this.m.stationId
        const res = await this.moderateurservice.getAllReservation(this.page, Number(adminData['StationId'])).subscribe((list) => {
            this.listreserv = list; 
            console.log("------------nice !!!!!-------");
            console.log("------------"+this.listreserv.nbr+"-------");
          }); 
        }
  }
  async next()
  { 
    if(this.page<(Number(this.listreserv.nbr))-1 )
    { 
    this.page=this.page+1
     var res= await this.moderateurservice.getAllReservation(this.page,this.m).subscribe((list) => {
      this.listreserv=list; 
 
    
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.listreserv.nbr+"---------")
    })
  }
  else{
    console.log("----------"+this.page+"---------")
      console.log("----------"+this.listreserv.nbr+"---------")
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.moderateurservice.getAllReservation(this.page,this.m).subscribe((list) => {
      this.listreserv=list;  
    })
  }
  }
  modifierReservation(reservation: Reservation): void {
    this.reservationModifiee = reservation;
    this.showPopup = true;
  }

  supprimerReservation(reservation: Reservation): void {
    // Logique de suppression de la réservation
  }

  fermerPopup(): void {
    this.showPopup = false;
    this.reservationModifiee = null;
  }
  confirmDelete(reservation: any) {
    // Logique pour supprimer la réservation
    console.log('Suppression de la réservation :', reservation);
  }
}
