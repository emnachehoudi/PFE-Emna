// admin.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  admins = [
    { id: 1, name: 'Admin 1', email: 'admin1@example.com', role: 'Admin' },
    { id: 2, name: 'Admin 2', email: 'admin2@example.com', role: 'Moderator' },
    { id: 3, name: 'Admin 3', email: 'admin3@example.com', role: 'Viewer' }
  ];

  getAdmins() {
    return this.admins;
  }
}
