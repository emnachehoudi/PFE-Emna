import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, map, throwError } from 'rxjs';
import { AuthOwner } from '../models/auth-owner';
import { Owner } from '../models/owner';
import { Born } from '../models/born';
import { GetStationBorn } from '../models/get-station-born';
import { Moderateur } from '../models/moderateur';
import { AllMoedrateur } from '../models/all-moedrateur';
import { ListBigReclamation } from '../models/list-big-reclamation';
import { baseUrl } from './../URL/urls';
import { Station } from '../models/station';
import { Connecteur } from '../models/connecteur';
@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  getAllBorn() {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<any>(`${baseUrl}borns`, {
      headers
    });
    
  }
  
  createModerateur(nouveauModerateur: Moderateur): Observable<any> {
    return this.http.post(`${baseUrl}moderateurs`, nouveauModerateur);
  }

  constructor(private http: HttpClient,private cookies: CookieService) { }

  login(data: AuthOwner): Observable<any> {
    //return this.http.post(apiUrl, data);
    return this.http.post(baseUrl+'loginprop', data);
  }

  getIdOwner(): Observable<any> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<any>(`${baseUrl}tokenowner/${this.cookies.get('token')}`, {
      headers
    });
  }
  getOwner(id:any): Observable<Owner> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<Owner>(`${baseUrl}owner/${id}`, {
      headers
    });
  }
  getAllStation(numPage :number, id:string): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json' 
    };
    /*const params = {
      idowner: id
    };*/
    //const params = new HttpParams({fromObject: data});
    const params = new HttpParams().set('idowner', id); 
    
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}filtragestations?page=${numPage}`,{
      params,
      headers,
      
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
          moderteurs: station.Moderateurs.map((moderateur: Moderateur) => ({id:moderateur.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  /*getAllStation(numPage :number, id:string): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json' 
    };
    const data = {
      idowner: id,
    };
    const params = new HttpParams({fromObject: data});
    console.log("ppppppppppp "+params)
    console.log("Requête HTTP : ");
  console.log(`${baseUrl}filtragestations`);
  console.log("Headers : ", headers);
  console.log("Paramètres : ", params);
    const idowner = { id };
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}stationsowners/${4}?page=${numPage}`,{
      headers,
      params:data,
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }*/
  getByStationOwner(idowner:string,numPage :number,confirmationAdmin:String): Observable<GetStationBorn> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };

    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}stationsowners/${idowner}?page=${numPage}&confirmation=`+confirmationAdmin, {
      headers
    }).pipe(
      map(response => ({
        stationborn: response.content.map(station => ({
          station: {
            id: station.id,
            registreNumber: station.registreNumber,
            adresse: station.adresse,
            prixKW: station.prixKW,
            longitude: station.longitude,
            latitude: station.latitude,
            stationType: station.stationType,
            name: station.name,
            telf: station.telf,
            confirmationAdmin: station.confirmationAdmin,
            etat: station.etat,
            AdminId: station.AdminId,
            ProprietaireId: station.ProprietaireId,
          },
          borns: station.Borns.map((born: Born) => ({id:born.id})),
        })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllModerateur(numPage :number,id:string): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateurs/${id}?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        moderateurs: response.content.map(moderateur => ({
            id: moderateur.id,
            firstname: moderateur.firstname,
            lastname: moderateur.lastname,
            password: moderateur.password,
            login: moderateur.login,
            image: moderateur.image,
            phone: moderateur.phone,
            etat: moderateur.etat,
            connexion: moderateur.connexion,
            stationId: moderateur.stationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getstationByRN(name: string): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.get(baseUrl+'station/'+name,{headers});
}

  getAllBornForStation(idStation: string): Observable<Born[]>  {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<Born[]>(`${baseUrl}born/${idStation}`, {
      headers
    });
  }
  getBornbyId(idb:string): Observable<Born> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Born>(`${baseUrl}born/`+idb, {
      headers
    });
  }
  UpdateBorn(born: Born): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createBornJson = JSON.stringify(born);
    //console.log("aaaaaaaaaaaaaaaaaa "+data)
    return this.http.put(baseUrl+'born/'+born.id, createBornJson,{headers});
  }
  getConnecteursChecked(idborn:string): Observable<Connecteur[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{connecteurs:any[]}>(`${baseUrl}connecteurbyborn/${idborn}`, {
      headers
    }).pipe(
      map(response => response.connecteurs.map(conn => ({
        id: conn.id,
        libelle: conn.libelle,
        reference: conn.reference,
        image: conn.image,
        etat: conn.etat,
        createdAt: conn.createdAt,
        updatedAt: conn.updatedAt,
        
    })),
     )
    );
  }
  deleteStation(idStation: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };

    console.log("delete headers ****",headers);
    return this.http.delete(baseUrl+'station/'+idStation,{headers});
  }
  // deleteStation(idStation: number): Observable<any> {
  //   const token = this.cookies.get('token');
  //   if (!token) {
  //     console.error('Token not found');
  //     return throwError('Token not found');
  //   }
  
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });
  
  //   return this.http.delete(baseUrl + 'station/' + idStation, { headers })
  //     .pipe(
  //       catchError(error => {
  //         console.error('Error:', error);
  //         if (error.status === 401) {
  //           console.error('Unauthorized - possibly invalid token');
  //         }
  //         return throwError(error);
  //       })
  //     );
  // }
  
  deleteBorn(idborn: number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    console.log("token ****",this.cookies.get('token'))
    return this.http.delete(baseUrl+'born/'+idborn,{headers});
  }
  deleteBornConn(idborn: number,idconn:number): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    return this.http.delete(baseUrl+'bornconn/'+idborn+"/"+idconn,{headers});
  }
  getAllModerateurbystation(numPage :number,idStation:number): Observable<AllMoedrateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}moderateursbystation/${idStation}?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        moderateurs: response.content.map(moderateur => ({
            id: moderateur.id,
            firstname: moderateur.firstname,
            lastname: moderateur.lastname,
            password: moderateur.password,
            login: moderateur.login,
            image: moderateur.image,
            phone: moderateur.phone,
            etat: moderateur.etat,
            connexion: moderateur.connexion,
            stationId: moderateur.stationId,
            createdAt: moderateur.createdAt,
            updatedAt: moderateur.updatedAt,
            //stationName:moderateur.Station.map((station: Station) => ({name:station.name})),
            stationName:moderateur.Station.name,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  UpdateStation(station: Station): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createStationJson = JSON.stringify(station);
    console.clear()
    console.log("aaaaaaaaaaaaaaaaaa "+station.telf)
    return this.http.put(baseUrl+'station/'+station.id, createStationJson,{headers});
  }
  getTodaysMoney(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{moneyownerday: string}[]>(`${baseUrl}todaysmoneyowner/${id}`, {
      headers
    }).pipe(
      map(response => response[0].moneyownerday) // Extracting the count from the response
    );
  }
  getMonthsMoney(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{moneyownermonth: string}[]>(`${baseUrl}monthsmoneyowner/${id}`, {
      headers
    }).pipe(
      map(response => response[0].moneyownermonth) // Extracting the count from the response
    );
  }
  getModerateurById(id:string): Observable<Moderateur> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<Moderateur>(`${baseUrl}moderateur/`+id, {
      headers
    });
  }
  getNbrModerateur(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}moderateurownernbr/${id}`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  }
  getNbrStation(id:string): Observable<string> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{count: string}>(`${baseUrl}stationownernbr/${id}`, {
      headers
    }).pipe(
      map(response => response.count) // Extracting the count from the response
    );
  } 
 
  createStation(station: Station): Observable<any> {
    //return this.http.post(apiUrl, data);
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`,
      'Content-Type': 'application/json'
    };
    const createStationJson = JSON.stringify(station);
    //console.log("aaaaaaaaaaaaaaaaaa "+data)
    return this.http.post(baseUrl+'createstation', createStationJson,{headers});
  }
  getAllReclamation(numPage :number,id:string): Observable<ListBigReclamation> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
  
    return this.http.get<{content:any[],totalPages:string}>(`${baseUrl}reclamationsbyowner/${id}?page=${numPage}`, {
      headers
    }).pipe(
      map(response => ({
        bigReclam: response.content.map(reclam => ({
          reclamation:{
            id: reclam?.id,
            dateReclam: reclam?.dateReclam,
            description: reclam?.description,
            etat: reclam?.etat,
            createdAt: reclam?.createdAt,
            updatedAt: reclam?.updatedAt,
            AdminId: reclam?.AdminId,
            BornId: reclam?.BornId,
            ClientId: reclam?.ClientId,
            ModerateurId: reclam?.ModerateurId,
            ProprietaireId: reclam?.ProprietaireId,
          },
          born:{
            id: reclam?.Born_id,
            name:reclam?.Born_name,
            serialNumber:reclam?.Born_serialNumber,
            etatB:reclam?.Born_etatB,
            pourcentageP:reclam?.Born_pourcentageP,
            proprietaire:reclam?.Born_proprietaire,
            NumeroTel:reclam?.Born_NumeroTel,
            createdAt:reclam?.Born_createdAt,
            updatedAt:reclam?.Born_updatedAt,
            StationId:reclam?.Born_StationId,
          },
          client:{
            id:reclam?.Client_id,
            firstname:reclam?.Client_firstname,
            lastname:reclam?.Client_lastname,
            login:reclam?.Client_login,
            password:reclam?.Client_password,
            email:reclam?.Client_email,
            image:reclam?.Client_image,
            phone:reclam?.Client_phone,
            loginType:reclam?.Client_loginType,
            codeVerif:reclam?.Client_codeVerif,
            etatVerif:reclam?.Client_etatVerif,
            connexion:reclam?.Client_connexion,
            BlackList:reclam?.Client_BlackList,
            createdAt:reclam?.Client_createdAt,
            updatedAt:reclam?.Client_updatedAt,

          }, 
          moderateur:{
            id:reclam?.Moderateur_id,
            firstname:reclam?.Moderateur_firstname,
            lastname:reclam?.Moderateur_lastname,
            login:reclam?.Moderateur_login,
            password:reclam?.Moderateur_password,
            image:reclam?.Moderateur_image,
            phone:reclam?.Moderateur_phone,
            connexion:reclam?.Moderateur_connexion,
            etat:reclam?.Moderateur_etat,
            createdAt:reclam?.Moderateur_createdAt,
            updatedAt:reclam?.Moderateur_updatedAt,

          }, 
          station:{
            id:reclam?.Born_Station_id,
            registreNumber:reclam?.Born_Station_registreNumber,
            adresse:reclam?.Born_Station_adresse,
            name:reclam?.Born_Station_name,
            etat:reclam?.Born_Station_etat,
            stationType:reclam?.Born_Station_stationType,
            confirmationAdmin:reclam?.Born_Station_confirmationAdmin,
            prixKW:reclam?.Born_Station_prixKW,
            telf:reclam?.Born_Station_telf,
            longitude:reclam?.Born_Station_longitude,
            latitude:reclam?.Born_Station_latitude,
            createdAt:reclam?.Born_Station_createdAt,
            updatedAt:reclam?.Born_Station_updatedAt,
            AdminId:reclam?.Born_Station_AdminId,
            ProprietaireId:reclam?.Born_Station_ProprietaireId,
          } ,
      })),
        nbr: response.totalPages,
      }))
    );
  }
  getAllConnecteurs(): Observable<Connecteur[]> {
    const headers = {
      'Authorization': `Bearer ${this.cookies.get('token')}`
    };
    return this.http.get<{connecteurs:any[]}>(`${baseUrl}connecteurs/`, {
      headers
    }).pipe(
      map(response => response.connecteurs.map(conn => ({
          id: conn.id,
          libelle: conn.libelle,
          reference: conn.reference,
          image: conn.image,
          etat: conn.etat,
          createdAt: conn.createdAt,
          updatedAt: conn.updatedAt,
          
      })),
     )
    );
  }
}
