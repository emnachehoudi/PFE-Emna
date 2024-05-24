import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './components/Home/log-in/signin/signin.component';
import { SignUpComponent } from './components/Home/log-in/sign-up/sign-up.component';
import { LogInComponent } from './components/Home/log-in/log-in.component';
import { AdminSpaceComponent } from './components/parent/admin-space/admin-space.component';
import { OwnerSpaceComponent } from './components/parent/owner-space/owner-space.component';
import { DashboardComponent } from './components/parent/admin-space/child/dashboard/dashboard.component';
import { AdminListComponent } from './components/parent/admin-space/child/admin-list/admin-list.component';
import { OwnerListComponent } from './components/parent/admin-space/child/owner-list/owner-list.component';
import { UserListComponent } from './components/parent/admin-space/child/user-list/user-list.component';
import { ZoneListComponent } from './components/parent/admin-space/child/zone-list/zone-list.component';
import { StationlistComponent } from './components/parent/admin-space/child/stationlist/stationlist.component';
import { SidenavComponent } from './components/parent/admin-space/sidenav/sidenav.component';
import { BodyComponent } from './components/parent/body/body.component';
import { ProfilComponent } from './components/parent/admin-space/child/profil/profil.component';
import { DetailsOwnerComponent } from './components/parent/admin-space/child/owner-list/details-owner/details-owner.component';
import { ViewComponent } from './components/parent/admin-space/child/admin-list/view/view.component';
import { Sidenav1Component } from './components/parent/owner-space/sidenav1/sidenav1.component';
import { Body1Component } from './components/parent/owner-space/body1/body1.component';
import { HomeComponent } from './components/parent/owner-space/home/home.component';
import { ModeratorComponent } from './components/parent/owner-space/moderator/moderator.component';
import { StationsComponent } from './components/parent/owner-space/stations/stations.component';
import { ClaimComponent } from './components/parent/owner-space/claim/claim.component';
import { ModifyModeratorComponent } from './components/parent/owner-space/modify-moderator/modify-moderator.component';
import { ModifyStationComponent } from './components/parent/owner-space/modify-station/modify-station.component';
import { ModeratorService } from './components/parent/owner-space/modify-moderator/moderator.service';
import { ModeratorSpaceComponent } from './components/parent/moderator-space/moderator-space.component';
import { Body2Component } from './components/parent/moderator-space/body2/body2.component';
import { SidemodComponent } from './components/parent/moderator-space/sidemod/sidemod.component';
import { HomeModComponent } from './components/parent/moderator-space/home-mod/home-mod.component';
import { ReservationComponent } from './components/parent/moderator-space/reservation/reservation.component';
import { ClaimModComponent } from './components/parent/moderator-space/claim-mod/claim-mod.component';
import { CreateClaimComponent } from './components/parent/moderator-space/create-claim/create-claim.component';
import { EditProfilComponent } from './components/parent/admin-space/child/profil/edit-profil/edit-profil.component';
import { SuperAdminComponent } from './components/parent/super-admin/super-admin.component';
import { ClientComponent } from './components/parent/client/client.component';
import { Sidenav3Component } from './components/parent/super-admin/sidenav3/sidenav3.component';
import { Body3Component } from './components/parent/super-admin/body3/body3.component';
import { HistoryComponent } from './components/parent/super-admin/history/history.component';
import { Adminlist1Component } from './components/parent/super-admin/adminlist1/adminlist1.component';
import { Ownerlist1Component } from './components/parent/super-admin/ownerlist1/ownerlist1.component';
import { Stationlist1Component } from './components/parent/super-admin/stationlist1/stationlist1.component';
import { Moderatorlist1Component } from './components/parent/super-admin/moderatorlist1/moderatorlist1.component';
import { Userlist1Component } from './components/parent/super-admin/userlist1/userlist1.component';
import { Zoneliste1Component } from './components/parent/super-admin/zoneliste1/zoneliste1.component';
import { ReclamationComponent } from './components/parent/super-admin/reclamation/reclamation.component';
import { Reservation1Component } from './components/parent/super-admin/reservation1/reservation1.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HomeResComponent } from './components/parent/client/home-res/home-res.component';
import { ClaimClientComponent } from './components/parent/client/claim-client/claim-client.component';
import { LoginAdminComponent } from './components/parent/admin-space/login-admin/login-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginOwnerComponent } from './components/parent/owner-space/login-owner/login-owner.component';
import { NotificationPopupComponent } from './components/parent/body/notification-popup/notification-popup.component';
import { CreatestationComponent } from './components/parent/admin-space/child/stationlist/createstation/createstation.component';
import { CreatezoneComponent } from './components/parent/admin-space/child/zone-list/createzone/createzone.component';
//import { AuthSuperComponent } from './components/parent/super-admin/auth-super/auth-super.component';
//import { CreateAdminModalComponent } from './create-admin-modal/create-admin-modal.component';
//import { DeleteConfirmationModalComponent } from './delete-confirmation-modal/delete-confirmation-modal.component';
//import { MyComponentComponent } from './my-component/my-component.component';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationDialogComponent } from './components/parent/owner-space/moderator/confirmation-dialog/confirmation-dialog.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PopupComponent } from './components/parent/moderator-space/popup/popup.component';
import { CreatemodComponent } from './components/parent/owner-space/moderator/createmod/createmod.component'; // Ajoutez cette ligne
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { CreataSComponent } from './components/parent/owner-space/creata-s/creata-s.component';

//FullCalendarModule.registerPlugins([
//  InteractionPlugin,
 // DaygridPlugin
//])
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignUpComponent,
    LogInComponent,
    AdminSpaceComponent,
    OwnerSpaceComponent,
    DashboardComponent,
    AdminListComponent,
    OwnerListComponent,
    UserListComponent,
    ZoneListComponent,
    StationlistComponent,
    SidenavComponent,
    BodyComponent,
    ProfilComponent,
    DetailsOwnerComponent,
    ViewComponent,
    Sidenav1Component,
    Body1Component,
    HomeComponent,
    ModeratorComponent,
    StationsComponent,
    ClaimComponent,
    ModifyModeratorComponent,
    ModifyStationComponent,
    ModeratorSpaceComponent,
    Body2Component,
    SidemodComponent,
    HomeModComponent,
    ReservationComponent,
    ClaimModComponent,
    CreateClaimComponent,
    EditProfilComponent,
    SuperAdminComponent,
    ClientComponent,
    Sidenav3Component,
    Body3Component,
    Adminlist1Component,
    Ownerlist1Component,
    Stationlist1Component,
    Moderatorlist1Component,
    Userlist1Component,
    Zoneliste1Component,
    ReclamationComponent,
    Reservation1Component,
    HistoryComponent,
    CreataSComponent,
    HomeResComponent,
    ClaimClientComponent,
    LoginAdminComponent,
    LoginOwnerComponent,
    NotificationPopupComponent,
    CreatestationComponent,
    CreatezoneComponent,
    ConfirmationDialogComponent,
    PopupComponent,
    CreatemodComponent,
  
  
    //AuthSuperComponent,
    //CreateAdminModalComponent,
    //DeleteConfirmationModalComponent,
   // MyComponentComponent,
   
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatExpansionModule,
    MatIconModule,
    FullCalendarModule,
    CanvasJSAngularChartsModule
  ],
  providers: [
    provideAnimationsAsync(),
    ModeratorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export class ModeratorModule {
 
 }

