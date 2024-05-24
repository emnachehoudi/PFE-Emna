import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OwnerService {
  owners = [
    { id: 1, firstName: 'John', lastName: 'Doe', phone: '123456789', address: '123 Main St', zone: 'Zone 1', status: 'Active', numberOfStations: 2 },
    { id: 2, firstName: 'Jane', lastName: 'Smith', phone: '987654321', address: '456 Elm St', zone: 'Zone 2', status: 'Active', numberOfStations: 1 },
    { id: 3, firstName: 'Alice', lastName: 'Johnson', phone: '555555555', address: '789 Oak St', zone: 'Zone 1', status: 'Inactive', numberOfStations: 3 }
  ];

  constructor() { }

  getAllOwners() {
    return this.owners; 
  }

  getOwnerById(id: number) {
    return this.owners.find(owner => owner.id === id);
  }

  // Méthodes pour ajouter, mettre à jour et supprimer des propriétaires peuvent également être ajoutées ici
}