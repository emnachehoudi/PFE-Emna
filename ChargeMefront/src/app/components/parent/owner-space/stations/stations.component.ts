import { Component, OnInit } from '@angular/core';
import { GetStationBorn } from '../../../../models/get-station-born';
import { OwnerService } from '../../../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router } from '@angular/router';
import { AllBorn} from '../../../../models/all-born';
import { AllMoedrateur } from '../../../../models/all-moedrateur';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Connecteur } from '../../../../models/connecteur';
import { Born } from '../../../../models/born';
import { Owner } from '../../../../models/owner';
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrl: './stations.component.css'
})
export class StationsComponent implements OnInit {
  
  showStationSuccessPopup: any;
  allstation = new GetStationBorn();
  page = 0;
  pageb=0;
  pagemod=0;
  allmoderateur=new AllMoedrateur();
  allborn=new AllBorn();
  showStationDetailsPopup = false;
  showTerminalDelete = false;
  showTerminalDeleteSuccess = false
   createStation: any = {
  confirmStatus: 'Confirmer',
  typeStation:'reel',
  stationStatus:"ouvert"
  };
  openDetails=false;
  selectedStation: any;
  listCon:Connecteur[]=[]
  listConCheK:Connecteur[]=[]
  listConDejaCheK:Connecteur[]=[]
  newStation: any = {};
  createStationForm: FormGroup;
  createTerminalForm: FormGroup;
  editStation: any = {};
  confirmationAdmin="Confirmer"
  showStationCreatePopup = false;
  showStationEditPopup = false;
  showStationEditSuccessPopup = false;
  showTerminalEditPopup = false;
  showDeletePopup = false;
  showDeleteSuccessPopup = false;
  showTerminalCreatePopup = false;
  showCheckboxes = false;
  showCheckboxesEdit = false;
  rest = "";
  selectedstation: any;
  selectedStationDetails={
    name:'',
    adresse:'',
    confirmationAdmin:'',
    etat:'',
    telf:'',
    registerNumber:''



  }
   StationModerators:any;
   StationTerminals:any;
  idStation=-1;
  born=new Born();
  stationEdit: any; 
 
  ownerStation=new Owner()
  contactForm!: FormGroup;
  createTerminal: any = {
    owner:'OandA',
  };
  idBorn=-1
  idowner=""
  allBornes:any;
  ancienSerialNbr=""
  ancienNameBorn=""
  anciRN: any;
   sta: any;
  constructor(private formBuilder: FormBuilder, private ownerservice: OwnerService, private cookies: CookieService, private router: Router,private route: ActivatedRoute) {
    this.createStationForm = this.formBuilder.group({});
    this.createTerminalForm = this.formBuilder.group({});
   }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      // Accédez aux paramètres envoyés
      
      this.idowner = params['ownerid'];
      console.log("-------------------------------------------------------")
      console.log(this.idowner); // Cela devrait afficher 'valeur'
      console.log("-------------------------------------------------------")
    });
    
  
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginowner'])
    }
    this.getstation()
  }
  async getstation()
  {
    const rest = await this.ownerservice.getIdOwner().toPromise();
    this.rest=rest['ProprietaireId']
    var res= await this.ownerservice.getAllStation(this.page,rest['ProprietaireId']).subscribe((station) => {
      this.allstation=station;
      console.log("all stations *****",this.allstation)
     // this.allstation.stationborn?.
      
    })
  }
  openBornePopup(idStation:any): void {
    this.listCon=[]
    this.idStation=idStation
    var res4 =  this.ownerservice.getAllConnecteurs().subscribe((con) => {
      this.listCon = con;
    })
   
    this.showTerminalCreatePopup = true;
  }
  openEditPopup(station:any): void {
    this.stationEdit=station;
    this.anciRN=station.registreNumber
    this.showStationEditPopup = true;
  }
  
  async openBorneEditPopup(born:any) {
    this.idBorn=born.id;
    this.ancienNameBorn=born.name
    this.ancienSerialNbr=born.serialNumber
    var resp= await this.ownerservice.getBornbyId(born.id).toPromise();
    if(resp)
    {
      this.born=resp
      console.log("eeeeennnnttttreee "+this.born.name+" "+this.born.serialNumber)
    }
  
    this.listCon=[]
    var s1=0
    var s2=0
    var res4= await this.ownerservice.getAllConnecteurs().toPromise();
    if(res4)
    {
      this.listCon=res4
      s1=1
    }
    
    this.listConDejaCheK=[]
    this.listConCheK=[]
    var list= await this.ownerservice.getConnecteursChecked(born.id).toPromise();
       if(list)
       {
        this.listConDejaCheK=list
        s2=1
       }
       var listInexs: Connecteur[]=[]
       for (let i = 0; i < this.listCon.length; i++) {
        const found = this.listConDejaCheK.find(conn => this.listCon[i].id == conn.id);
        if (found) {
            listInexs.push(found);
        }
    }
      for (let i = 0; i < listInexs.length; i++)
      {
        const found = this.listCon.find(conn => listInexs[i].id == conn.id);
        if (found) {
          this.listCon.splice(this.listCon.indexOf(found),1)
        }
      }
      console.log("length Deja ùù : "+this.listConDejaCheK.length)
      this.listConCheK=this.listConDejaCheK.slice()
      console.log("length Deja éé : "+this.listConCheK.length)
      if(s1==1 && s2==1)
       {
        this.showTerminalEditPopup = true;
  
       }
    }
  async next()
  { 
    if(this.page<(Number(this.allstation.nbr)-1))
    {
    this.page=this.page+1
    var res= await this.ownerservice.getAllStation(this.page,this.rest).subscribe((station) => {
      this.allstation=station;
      
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allstation.nbr+"---------")
      //console.log("----------"+this.rest+"---------")

    })
  }
}
async Previous()
  { 
    if(this.page>0)
    {
    this.page=this.page-1
    var res= await this.ownerservice.getAllStation(this.page,this.rest).subscribe((station) => {
      this.allstation=station;
      console.log("----------"+this.page+"---------")
      console.log("----------"+this.allstation.nbr+"---------")
    })
  }
  }
  async nextB() {
    if (this.pageb < (Number(this.allborn.nbr) - 1)) {
      this.pageb = this.pageb + 1;
      this.ownerservice.getAllBornForStation( this.idStation.toString()).subscribe((born) => {
        this.allborn.borns = born; // Adapter la réponse à l'objet attendu
      });
    }
  }

  async previousB() {
    if (this.pageb > 0) {
      this.pageb = this.pageb - 1;
      this.ownerservice.getAllBornForStation(this.idStation.toString()).subscribe((born) => {
        this.allborn.borns = born; // Adapter la réponse à l'objet attendu
      });
    }
  }

  async PreviousMod() {
    if (this.pagemod > 0) {
      this.pagemod = this.pagemod - 1
      var res = await this.ownerservice.getAllModerateurbystation(this.pagemod,this.idStation).subscribe((mod) => {
        this.allmoderateur = mod;
      })
    }
  }
  async nextMod() {
    if (this.pagemod < (Number(this.allmoderateur.nbr) - 1)) {
      this.pagemod = this.pagemod + 1
      var res = await this.ownerservice.getAllModerateurbystation(this.pagemod,this.idStation).subscribe((mod) => {
        this.allmoderateur = mod;
      })
    }
  }
  toggleDetails(station: any): void {
    this.selectedstation = this.selectedstation === station ? null : station;
    console.log(this.selectedstation)
  }
  openDeletePopup(idStation:any): void {

    this.idStation=idStation
    this.showDeletePopup = true;
  
  }

  async deleteStation() {
    var res= await this.ownerservice.deleteStation(this.idStation).toPromise();
    if(res=="ok" )
    location.reload();
    this.showDeletePopup = false;
    this.showDeleteSuccessPopup = true;


   
  }

  cancelDelete() {
    this.idStation=-1
    this.showDeletePopup = false;
  }
  cancelDeleteStation(event: Event) {
    if (event.target === event.currentTarget) {
    this.idStation=-1
    this.showDeletePopup = false;
    }
  }

  closeDeleteSuccessPopup(): void {
    this.showDeleteSuccessPopup = false;
  }
  openBorneDeletePopup(idborn:any): void {
    this.idBorn=idborn
    this.showTerminalDelete = true;
  }
  async deleteSuccess() {
    var res= await this.ownerservice.deleteBorn(this.idBorn).toPromise();
    if(res=="ok" )
    location.reload();
   // this.showTerminalDelete = false;
   // this.showTerminalDeleteSuccess = true;
  }
  closeDeleteSuccessPopupx(): void {
    this.showTerminalDeleteSuccess = false;
  }
  cancelDeletex(): void {
    this.showTerminalDelete = false;
  }
  cancelDeletex2(event: Event): void {
    if (event.target === event.currentTarget) {
    this.showTerminalDelete = false;
  }
}
 async confirmer(){
  this.page=0
  this.pageb=0
  this.pagemod=0
  this.idowner=""
  this.confirmationAdmin="Confirmer"
  var res = await this.ownerservice.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
    this.allstation = station;
  })
}
async Nonconfirmer() {
  this.page=0
  this.pageb=0
  this.pagemod=0
  this.idowner=""
  this.confirmationAdmin="enCour"
  var res = await this.ownerservice.getAllStation(this.page,this.confirmationAdmin).subscribe((station) => {
    this.allstation = station;
  })
}

  // openDetailPopup(station:any){
  // this.openDetails=true;
  //   this.selectedStationDetails.adresse=station.station.adresse;
  //   this.selectedStationDetails.confirmationAdmin=station.station.confirmationAdmin;
  //   this.selectedStationDetails.etat=station.station.etat;
  //   this.selectedStationDetails.name=station.station.name;
  //   this.selectedStationDetails.registerNumber=station.station.registreNumber;
  //   this.selectedStationDetails.telf=station.station.telf;
  //   console.log("selectedStationDetails  ba3d l'affectation ****",this.selectedStationDetails)
  //   this.getStationModrators(station.nbr,station.station.id)
  //   this.getBornesStations(station.borns)
  // }




 openCreatePopup(): void {
  var labelE = document.getElementById("alertexist");
      if(labelE)
      {
        labelE.style.display = "none";
      }
      this.createStation.registerNumber="";
  this.showStationCreatePopup = true;
}




getStationModrators(numPage:number,id:number){

  
  this.ownerservice.getAllModerateurbystation(numPage,id).subscribe((res=>{
     console.log("Stations Modrators : ",res)
     this.StationModerators=res.moderateurs;
  }))
}




// getBornesStations(borneIds: { id: number }[]) {
//   console.log("##########", borneIds);
//   this.ownerservice.getAllBorn().subscribe((res: any) => {
//     console.log("****Stations Bornes : ", res.content);
//     this.allBornes = res.content;
//     const ids = borneIds.map(borne => borne.id); // Extracting the IDs from the array of objects
//     this.StationTerminals = this.allBornes.filter((borne: any) => ids.includes(borne.id));
  
//   });
// }
















openDetailPopup(station: any) {
  console.log("################## from detail******************** ", station.borns);
  console.log("from detail******************** ", station.station);
  this.openDetails = true;
  this.selectedStationDetails.adresse = station.station.adresse;
  this.selectedStationDetails.confirmationAdmin = station.station.confirmationAdmin;
  this.selectedStationDetails.etat = station.station.etat;
  this.selectedStationDetails.name = station.station.name;
  this.selectedStationDetails.registerNumber = station.station.registreNumber;
  this.selectedStationDetails.telf = station.station.telf;
  console.log("selectedStationDetails  ba3d l'affectation ****", this.selectedStationDetails);
  this.getStationModrators(station.nbr, station.station.id);
  this.getBornesStations(station.borns); // passing the list of IDs
}

getBornesStations(borneIds: { id: number }[]) {
  console.log("##########", borneIds);
  this.ownerservice.getAllBorn().subscribe((res: any) => {
    console.log("****Stations Bornes : ", res.content);
    this.allBornes = res.content;
    const ids = borneIds.map(borne => borne.id); // Extracting the IDs from the array of objects
    this.StationTerminals = this.allBornes.filter((borne: any) => ids.includes(borne.id));
    console.log("Filtered StationTerminals: ", this.StationTerminals);
  });
}

closeDetailPopup() {
  this.openDetails = false;
}


}
