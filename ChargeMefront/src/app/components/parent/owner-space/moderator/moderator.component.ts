import { Component, OnInit } from '@angular/core';
import { OwnerService } from '../../../../services/owner.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { AllMoedrateur } from '../../../../models/all-moedrateur';
import { Moderateur } from '../../../../models/moderateur';
import { MatDialog } from '@angular/material/dialog';
// Importez votre composant de boîte de dialogue de confirmation
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';


@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styleUrls: ['./moderator.component.css'] // Modifiez 'styleUrl' en 'styleUrls'
})
export class ModeratorComponent implements OnInit {
  constructor(private ownerservice: OwnerService, private cookies: CookieService, private router: Router) { }
  page = 0
  rest = ""
  allmoderateur = new AllMoedrateur()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if (!this.cookies.get('token')) {
      this.router.navigate(['/loginowner'])
    }
    this.getAllModerateur()
  }
  async getAllModerateur() {
    const rest = await this.ownerservice.getIdOwner().toPromise();
    this.rest = rest['ProprietaireId']
    var res = await this.ownerservice.getAllModerateur(this.page, rest['ProprietaireId']).subscribe((moderator) => {
      this.allmoderateur = moderator;
    })
  }
  async next() {
    if (this.page < (Number(this.allmoderateur.nbr) - 1)) {
      this.page = this.page + 1
      var res = await this.ownerservice.getAllModerateur(this.page, this.rest).subscribe((moderator) => {
        this.allmoderateur = moderator;

        console.log("----------" + this.page + "---------")
        console.log("----------" + this.allmoderateur.nbr + "---------")
      })
    }
  }
  async Previous() {
    if (this.page > 0) {
      this.page = this.page - 1
      var res = await this.ownerservice.getAllModerateur(this.page, this.rest).subscribe((moderator) => {
        this.allmoderateur = moderator;
      })
    }
  }
  // Supprimer cette déclaration, car elle n'est pas nécessaire ici
  // expanded: boolean | undefined;

  // Déplacer cette méthode à l'intérieur de la classe ModeratorComponent
 // Dans le composant ModeratorComponent
toggleDetails(mod: Moderateur): void {
  if (mod.firstname !== undefined) {
    mod.expanded = !mod.expanded;
  }
}

}
