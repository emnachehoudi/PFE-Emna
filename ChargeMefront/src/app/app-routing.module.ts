import { NgModule, createComponent } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { CreateAdminModalComponent } from './create-admin-modal/create-admin-modal.component';
import { SignUpComponent } from './components/Home/log-in/sign-up/sign-up.component';
import { AdminSpaceComponent } from './components/parent/admin-space/admin-space.component';
import { DashboardComponent } from './components/parent/admin-space/child/dashboard/dashboard.component';
import { AdminListComponent } from './components/parent/admin-space/child/admin-list/admin-list.component';
import { OwnerListComponent } from './components/parent/admin-space/child/owner-list/owner-list.component';
import { UserListComponent } from './components/parent/admin-space/child/user-list/user-list.component';
import { ZoneListComponent } from './components/parent/admin-space/child/zone-list/zone-list.component';
import { SigninComponent } from './components/Home/log-in/signin/signin.component';
import { LogInComponent } from './components/Home/log-in/log-in.component';
import { StationlistComponent } from './components/parent/admin-space/child/stationlist/stationlist.component';
import { ProfilComponent } from './components/parent/admin-space/child/profil/profil.component';
import { ViewComponent } from './components/parent/admin-space/child/admin-list/view/view.component';
import { HomeComponent } from './components/parent/owner-space/home/home.component';
import { ModeratorComponent } from './components/parent/owner-space/moderator/moderator.component';
import { StationsComponent } from './components/parent/owner-space/stations/stations.component';
import { ClaimComponent } from './components/parent/owner-space/claim/claim.component';
import { ModifyModeratorComponent } from './components/parent/owner-space/modify-moderator/modify-moderator.component';
import { ModifyStationComponent } from './components/parent/owner-space/modify-station/modify-station.component';
import { HomeModComponent } from './components/parent/moderator-space/home-mod/home-mod.component';
import { ReservationComponent } from './components/parent/moderator-space/reservation/reservation.component';
import { ClaimModComponent } from './components/parent/moderator-space/claim-mod/claim-mod.component';
import { CreateClaimComponent } from './components/parent/moderator-space/create-claim/create-claim.component';
import { Adminlist1Component } from './components/parent/super-admin/adminlist1/adminlist1.component';
import { Ownerlist1Component } from './components/parent/super-admin/ownerlist1/ownerlist1.component';
import { Stationlist1Component } from './components/parent/super-admin/stationlist1/stationlist1.component';
import { Moderatorlist1Component } from './components/parent/super-admin/moderatorlist1/moderatorlist1.component';
import { ReclamationComponent } from './components/parent/super-admin/reclamation/reclamation.component';
import { Zoneliste1Component } from './components/parent/super-admin/zoneliste1/zoneliste1.component';
import { Userlist1Component } from './components/parent/super-admin/userlist1/userlist1.component';
import { Reservation1Component } from './components/parent/super-admin/reservation1/reservation1.component';
import { LoginAdminComponent } from './components/parent/admin-space/login-admin/login-admin.component';
import { LoginOwnerComponent } from './components/parent/owner-space/login-owner/login-owner.component';
import { HistoryComponent } from './components/parent/super-admin/history/history.component';
//import { AuthSuperComponent } from './components/parent/super-admin/auth-super/auth-super.component';
import { HomeResComponent } from './components/parent/client/home-res/home-res.component';
import { ClientComponent } from './components/parent/client/client.component';
import { CreatestationComponent } from './components/parent/admin-space/child/stationlist/createstation/createstation.component';
import { CreatezoneComponent } from './components/parent/admin-space/child/zone-list/createzone/createzone.component';
import { CreatemodComponent } from './components/parent/owner-space/moderator/createmod/createmod.component';
const routes: Routes = [
  // Other routes
  //{ path: 'create', component: CreateAdminModalComponent }, // Add this line for the "create" modal route
  // Other routes
  { path: 'loginadmin', component: LoginAdminComponent },
  //{ path: 'loginsuper', component: AuthSuperComponent },
  { path: 'homeclient', component: HomeResComponent },
  { path: 'client', component: ClientComponent },
  { path: 'loginowner', component: LoginOwnerComponent },
  { path: 'SinUp', component: SignUpComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'login', component: LogInComponent },
  { path: 'admin-space', component: AdminSpaceComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'adminlist', component: AdminListComponent },
  { path: 'ownerlist', component: OwnerListComponent },
  { path: 'userlist', component: UserListComponent },
  { path: 'zonelist', component: ZoneListComponent },
  { path: 'stationlist', component: StationlistComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'view/:id', component: ViewComponent },
  { path: 'home', component: HomeComponent },
  { path: 'moderator', component: ModeratorComponent },
  { path: 'stations', component: StationsComponent },
  { path: 'claim', component: ClaimComponent },
  { path: 'modify-moderator', component: ModifyModeratorComponent },
  { path: 'modify-station', component: ModifyStationComponent },
  { path: 'modify-moderator/:id', component: ModifyModeratorComponent },
  { path: 'home-mod', component: HomeModComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'claim-mod', component: ClaimModComponent },
  { path: 'create-claim', component: CreateClaimComponent },
  { path: 'adminlist1', component: Adminlist1Component },
  { path: 'ownerlist1', component: Ownerlist1Component },
  { path: 'stationlist1', component: Stationlist1Component },
  { path: 'moderatorlist1', component: Moderatorlist1Component },
  { path: 'zoneliste1', component: Zoneliste1Component },
  { path: 'userlist1', component: Userlist1Component },
  { path: 'reclamation', component: ReclamationComponent },
  { path: 'createstation', component: CreatestationComponent},
  { path: 'historique', component: HistoryComponent },
  { path: 'createzone', component: CreatezoneComponent},
  { path: 'reservation1', component: Reservation1Component },
  { path:'modify-station', component: ModifyStationComponent},
   {path: 'createmod' , component: CreatemodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
