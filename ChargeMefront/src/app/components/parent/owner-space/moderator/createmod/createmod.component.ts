import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Station } from '../../../../../models/station';
import { ModerateurService } from '../../../../../services/moderateur.service';
import { FormBuilder, Validators } from '@angular/forms';
import { OwnerService } from '../../../../../services/owner.service';
import { Moderateur } from '../../../../../models/moderateur';
import { StationService } from '../../modify-station/station.service';
@Component({
  selector: 'app-createmod',
  templateUrl: './createmod.component.html',
  styleUrl: './createmod.component.css'
})
export class CreatemodComponent {

  moderator = {
    firstname: '',
    lastname: '',
    phone: '',
    address: '',
    status: '',
    stationnum: 0
  };
  createmodForm: any;
  showmodSuccessPopup= false;
  stations: Station[] = [];
 

  constructor(
    private moderatorService: ModerateurService,
    private ownerservice: OwnerService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activaterouter :ActivatedRoute,
    private stationservice: StationService
  ) { }
  
  ngOnInit(): void {
    this.getStations();
    this.initForm();
  }
  getStations(): void {
    this.stationservice.getStations()
    .subscribe((stations: Station[]) => this.stations = stations);
  }
  initForm(): void {
    this.createmodForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone: ['', Validators.required],
      stationName: ['', Validators.required]
    });
  }

  submitForm(): void {
    if (this.createmodForm.valid) {
      const { firstname, lastname, phone, stationName } = this.createmodForm.value;
      const newModerator: Moderateur = { firstname, lastname, phone, stationName };
      this.ownerservice.createModerateur(newModerator).subscribe(
        () => {
          // Réinitialiser le formulaire après la soumission réussie
          this.createmodForm.reset();
          // Afficher la popup de succès
          this.showmodSuccessPopup = true;
        },
        error => {
          console.error('Erreur lors de la création du modérateur :', error);
        }
      );
    }
  }
  
    }
  

  



