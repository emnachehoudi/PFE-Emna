import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { OwnerService } from '../../../../services/owner.service';
import { StatOwner } from '../../../../models/stat-owner';


import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html', 
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
border: any;
  constructor(private ownerservice:OwnerService,private cookies:CookieService,private router:Router) { }
  statowner = new StatOwner()
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    if(!this.cookies.get('token'))
    {
      this.router.navigate(['/loginowner'])
    }
    this.getStatOwner()
     
  }
  imgprofil='./assets/images.jpeg';
  async getStatOwner()
  {
    const rest = await this.ownerservice.getIdOwner().toPromise();
    rest['ProprietaireId']
    var nbrClient: string;
    this.ownerservice.getNbrModerateur(rest['ProprietaireId']).subscribe(
      (count: string) => {
        nbrClient = count;
        if(nbrClient==null||nbrClient.length==0) 
          this.statowner.nbrmoderateur = "0";
        else{
          this.statowner.nbrmoderateur = nbrClient;
        }
        //this.statowner.nbrmoderateur = nbrClient;
      },
      (error) => {
        console.error(error);
      });

      var nbrStation: string;
    this.ownerservice.getNbrStation(rest['ProprietaireId']).subscribe(
      (count: string) => {
        nbrStation = count;
        if(nbrStation==null||nbrStation.length==0)
          this.statowner.nbrstation = "0";
        else{
          this.statowner.nbrstation = nbrStation;
        }
        //this.statowner.nbrstation = nbrStation;
      },
      (error) => {
        console.error(error);
      });

      var nbrOwners: string;
      this.ownerservice.getMonthsMoney(rest['ProprietaireId']).subscribe( 
        (count: string) => {
          nbrOwners = count;
          if(nbrOwners==null||nbrOwners.length==0)
          this.statowner.monthsmoney = "0";
        else{
          this.statowner.monthsmoney = nbrOwners;
        }
        },
        (error) => {
          console.error(error); 
        });

        var money: string;
      this.ownerservice.getTodaysMoney(rest['ProprietaireId']).subscribe(
        (count: string) => {
          money = count;
          if(money==null||money.length==0)
          {
            this.statowner.todaysmoney = "0";
          }
          else{
            this.statowner.todaysmoney = money;
          }
          console.log("to days ----:"+money.length)
        },
        (error) => {
          console.error(error);
        });

  }
 
 


  chartOptions = {
    responsive: {
      enabled: true, // Activer la réactivité
      rules: [
          {
              maxWidth: 600, // Largeur maximale de l'écran
              minHeight: 200, // Hauteur minimale du graphique
              maxHeight: 300 // Hauteur maximale du graphique
          },
          {
              maxWidth: 900, // Largeur maximale de l'écran
              minHeight: 300, // Hauteur minimale du graphique
              maxHeight: 400 // Hauteur maximale du graphique
          },
          // Ajoutez d'autres règles au besoin pour différentes tailles d'écran
      ]
  },
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "Statistics per week"
		},
		axisX: {
			valueFormatString: "DD MMM",
			intervalType: "month",
			interval: 1
		},
		axisY: {
			title: "Money",
		  suffix: "TND"
		},
		toolTip: {
			shared: true
		},
		legend: {
      cursor: "pointer",
      itemclick: function(e: any){
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
              e.dataSeries.visible = false;
          } else{
              e.dataSeries.visible = true;
          }
          e.chart.render();
      }
  },
		
		data: [{
			type:"line",
			name: "Minimum",
			showInLegend: true,
			yValueFormatString: "#,###TND",
			dataPoints: [		
				{ x: new Date(2021, 0, 1), y: 27 },
				{ x: new Date(2021, 1, 1), y: 28 },
				{ x: new Date(2021, 2, 1), y: 35 },
				{ x: new Date(2021, 3, 1), y: 45 },
				{ x: new Date(2021, 4, 1), y: 54 },
				{ x: new Date(2021, 5, 1), y: 64 },
				{ x: new Date(2021, 6, 1), y: 69 },
				{ x: new Date(2021, 7, 1), y: 68 },
				{ x: new Date(2021, 8, 1), y: 61 },
				{ x: new Date(2021, 9, 1), y: 50 },
				{ x: new Date(2021, 10, 1), y: 41 },
				{ x: new Date(2021, 11, 1), y: 33 }
			]
		},
		{
			type: "line",
      color: "#ff8c00",
			name: "Maximum",
			showInLegend: true,
			yValueFormatString: "#,###TND",
			dataPoints: [
				{ x: new Date(2021, 0, 1), y: 40 },
				{ x: new Date(2021, 1, 1), y: 42 },
				{ x: new Date(2021, 2, 1), y: 50 },
				{ x: new Date(2021, 3, 1), y: 62 },
				{ x: new Date(2021, 4, 1), y: 72 },
				{ x: new Date(2021, 5, 1), y: 80 },
				{ x: new Date(2021, 6, 1), y: 85 },
				{ x: new Date(2021, 7, 1), y: 84 },
				{ x: new Date(2021, 8, 1), y: 76 },
				{ x: new Date(2021, 9, 1), y: 64 },
				{ x: new Date(2021, 10, 1), y: 54 },
				{ x: new Date(2021, 11, 1), y: 44 }
			]
		}]
	}	
  isButtonVisible = false;
 
	visitorsChartDrilldownHandler = (e: any) => {
		this.chart.options = this.visitorsDrilldownedChartOptions;	
		this.chart.options.data = this.options[e.dataPoint.name];
		this.chart.options.title = { text: e.dataPoint.name }
		this.chart.render();
		this.isButtonVisible = true;
	}
 
	visitorsDrilldownedChartOptions = {
		animationEnabled: true,
		theme: "light2",
		axisY: {
			gridThickness: 0,
			lineThickness: 1
		},
		data: []
	};
 
	newVSReturningVisitorsOptions = {
		animationEnabled: true,
		theme: "light2",
		title: {
			text: "New vs Returning Visitors"
		},
		
		data: []
	};
  chart: any;
	options: any = {
		"New vs Returning Visitors": [{
			type: "pie",
			name: "New vs Returning Visitors",
			startAngle: 90,
			cursor: "pointer",
			explodeOnClick: false,
			showInLegend: true,
			legendMarkerType: "square",			
			click: this.visitorsChartDrilldownHandler,
			indexLabelPlacement: "inside",
			indexLabelFontColor: "white",
			dataPoints: [
				{ y: 551160, name: "New Visitors", color: "#ff8c00", indexLabel: "62.56%" },
				{ y: 329840, name: "Returning Visitors", color: "#50b432", indexLabel: "37.44%" }
			]
		}],
		"New Visitors": [{
			color: "#ff8c00",
			name: "New Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 42600 },
				{ label: "Feb", y: 44960 },
				{ label: "Mar", y: 46160 },
				{ label: "Apr", y: 48240 },
				{ label: "May", y: 48200 },
				{ label: "Jun", y: 49600 },
				{ label: "Jul", y: 51560 },
				{ label: "Aug", y: 49280 },
				{ label: "Sep", y: 46800 },
				{ label: "Oct", y: 57720 },
				{ label: "Nov", y: 59840 },
				{ label: "Dec", y: 54400 }
			]
		}],
		"Returning Visitors": [{
			color: "#50b432",
			name: "Returning Visitors",
			type: "column",
			dataPoints: [
				{ label: "Jan", y: 21800 },
				{ label: "Feb", y: 25040 },
				{ label: "Mar", y: 23840 },
				{ label: "Apr", y: 24760 },
				{ label: "May", y: 25800 },
				{ label: "Jun", y: 26400 },
				{ label: "Jul", y: 27440 },
				{ label: "Aug", y: 29720 },
				{ label: "Sep", y: 29200 },
				{ label: "Oct", y: 31280 },
				{ label: "Nov", y: 33160 },
				{ label: "Dec", y: 31400 }
			]
		}]
	};
 
	handleClick(event: Event) { 
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["New vs Returning Visitors"];
		this.chart.render(); 
		this.isButtonVisible = false;
	  } 	
	 
	getChartInstance(chart: object) {
		this.chart = chart;
		this.chart.options = this.newVSReturningVisitorsOptions;
		this.chart.options.data = this.options["New vs Returning Visitors"];
		this.chart.render();
	}    
}
