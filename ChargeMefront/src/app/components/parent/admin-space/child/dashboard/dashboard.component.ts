import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { StatAdmin } from '../../../../../models/stat-admin';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AdminService } from '../../../../../services/admin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  constructor(private authAdminService: AdminService,private cookies:CookieService,private router:Router,private cdr: ChangeDetectorRef) { }
  statadmin = new StatAdmin()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token')) 
    {
      this.router.navigate(['/loginadmin'])
    }

    this.getStatAdmin()
  }
  
  imgprofil='./assets/images.jpeg';
  async getStatAdmin()
  {
    var nbrClient: string;
    this.authAdminService.getNbrClient().subscribe(
      (count: string) => {
        nbrClient = count;
        if(nbrClient==null||nbrClient.length==0)
        this.statadmin.nbrclient = "0";
      else{
        this.statadmin.nbrclient = nbrClient;
      }
        //this.statadmin.nbrclient = nbrClient;
      },
      (error) => {
        console.error(error);
      });

      var nbrStation: string;
    this.authAdminService.getNbrStation().subscribe(
      (count: string) => {
        nbrStation = count;
        if(nbrStation==null||nbrStation.length==0)
        this.statadmin.nbrstation = "0";
      else{
        this.statadmin.nbrstation = nbrStation;
      }
       // this.statadmin.nbrstation = nbrStation;
      },
      (error) => {
        console.error(error);
      });

      var nbrOwners: string;
      this.authAdminService.getNbrOwner().subscribe( 
        (count: string) => {
          nbrOwners = count;
          if(nbrOwners==null||nbrOwners.length==0)
          this.statadmin.nbrowners = "0";
        else{
          this.statadmin.nbrowners = nbrOwners;
        }
          //this.statadmin.nbrowners = nbrOwners;
        },
        (error) => {
          console.error(error);  
        });

        var money: string;
      this.authAdminService.getTodaysMoney().subscribe(
        (count: string) => {
          money = count;
          if(money==null||money.length==0)
          this.statadmin.todaysmoney = "0";
        else{
          this.statadmin.todaysmoney = money;
        }
          //this.statadmin.todaysmoney = money;
        },
        (error) => {
          console.error(error);
        });
  }

 
}
