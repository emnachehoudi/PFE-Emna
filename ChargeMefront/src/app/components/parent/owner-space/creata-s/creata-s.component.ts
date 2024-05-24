import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OwnerService } from '../../../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import { Station } from '../../../../models/station';
@Component({
  selector: 'app-creata-s',
  templateUrl: './creata-s.component.html',
  styleUrl: './creata-s.component.css'
})
export class CreataSComponent implements OnInit {
  

  createStationForm: FormGroup;
  idowner: any;
  showStationSuccessPopup: boolean = false;
 

  showStationCreatePopup: boolean = false;
  constructor(private ownerservice: OwnerService,private formBuilder: FormBuilder, private cookies: CookieService, private router: Router,private route: ActivatedRoute) 
  {
   this.createStationForm = this.formBuilder.group({});
   
 }
 
 createStation: any = {
 confirmStatus: 'Confirmer',
 typeStation:'reel',
 stationStatus:"ouvert"
 };
  
  
  newStation: any = {};
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id']);
      // Accédez aux paramètres envoyés
      this.idowner = params['ownerid'];
      console.log("-------------------------------------------------------")
      console.log(this.idowner); // Cela devrait afficher 'valeur'
      console.log("-------------------------------------------------------")
    });
  }
  
  async submitCreateStationForm(event: Event)  {
    alert("te5demmmmmmmmmmmmmm")
    event.preventDefault();
    if (this.isFormValid()) {
      var labelE = document.getElementById("alertexist");
      var res= await this.ownerservice.getstationByRN(this.createStation.registerNumber).toPromise();
    if(res && res.createdAt)
    {
      if(labelE)
      {
        labelE.style.display = "block";
      }
    }else{
      const restt = await this.ownerservice.getIdOwner().toPromise();
      if(restt && restt.ownerId)
      {
        const station = new Station();
        station.adresse=this.createStation.address
        station.confirmationAdmin=this.createStation.confirmStatus
        station.registreNumber=this.createStation.registerNumber
        station.name=this.createStation.name
        station.etat=this.createStation.stationStatus
        station.stationType=this.createStation.typeStation
        station.prixKW=this.createStation.pricePerKW
        station.longitude=this.createStation.longitude
        station.latitude=this.createStation.latitude
        station.telf=this.createStation.phone
        station.ProprietaireId=restt['ownerId']
        //const createStationJson = JSON.stringify(station);
        console.log("station",station);
        var res= await this.ownerservice.createStation(station).toPromise();
        if(res && res.createdAt)
        {
        console.log(res.createdAt) 
        location.reload();
        }
        if (res && res.createdAt) {
          console.log("Station créée avec succès !");
          this.showStationSuccessPopup = true; // Affiche le popup de succès
        }
      }
     

      
      // Autres actions à effectuer lorsque le formulaire est valide
    }
    }
}
isFormValid(): boolean {
  // Vérifier si le formulaire est valide en utilisant la propriété valid de FormGroup
  return this.createStationForm.valid;
}
openCreatePopup(): void {
  alert("te5deem")
  this.showStationCreatePopup = true;
}
closeCreatePopup(): void {
  this.showStationSuccessPopup = false; // Ferme le popup
}


}

