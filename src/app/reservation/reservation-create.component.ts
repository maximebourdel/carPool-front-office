import { Component, OnInit }     from '@angular/core';

import { Router }               from '@angular/router';

import { Reservation }          from './reservation';
import { ReservationService }   from './reservation.service';

import { Vehicule }             from '../vehicule/vehicule';
import { VehiculeService }      from '../vehicule/vehicule.service';

declare var d3: any;
declare var moment: any;

@Component({
    selector: 'reservation-create',
    providers: [ReservationService, VehiculeService],
    templateUrl: 'reservation-create.component.html'
})
export class ReservationCreateComponent implements OnInit {

    
    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listData2: any = new Array();
    listData: any = new Array();
    listVehicule: Vehicule[];


    data:any;

    constructor (
        private reservationService: ReservationService,
        private vehiculeService: VehiculeService,
        private router: Router,
    ) {} 
    
            
   
    

    // Set custom color for the calendar heatmap
    color = '#cd2327';

    // Set overview type (choices are year, month and day)
    overview = 'year';

    
    ngOnInit(): void { 

        this.getListVehicule();
        this.getRequete();
    } 
       
    getListVehicule() {
        
        this.vehiculeService.getListVehicule()
            .subscribe(
                listVehicule => this.listVehicule = listVehicule,
                error =>  this.errorMessage = <any>error,
            );
    }

       
    getRequete() {
        
        this.reservationService.getRequete()
            .subscribe((apiListData) => {
                 
                let obj: any = {};
                let objSummary: any = {};
                let objDetail: any = {};
                let listSummary = new Array();
                let listDetail = new Array();
                
                for (let data of apiListData){
                    
                    listSummary = new Array();
                    listDetail = new Array();
                    
                        if (data.nb_resa  == "1"){
                        obj["date"] = data.date.substr(0,10);
                        obj["total"] = +data.nb_resa;
                        
                        objSummary["name"] = data.immatriculation;
                        objSummary["value"] = 86400;
                        listSummary.push(objSummary);
                        
                        objDetail["name"] = data.immatriculation;
                        objDetail["value"] = 86400;
                        objDetail["date"] = data.date.substr(0,10);
                        listDetail.push(objDetail);

                        obj["details"] = listDetail;
                        obj["init"] = function () {
                            this.total = 1
                            return this;
                        };
                        this.listData.push(obj);
                        
                    }
                               
                }
                let now = moment().endOf('day').toDate();
                
                let time_ago = moment().startOf('day').subtract(10, 'year').toDate();
                 debugger;
                this.data= d3.time.days(time_ago, now)
                    .map( ()  => {
                        return this.listData[1].init();
                    });
                });
            
            
            
            
    }
    
    
    addReservation(): void { 
        if (!this.reservation) { return; }
        this.reservationService
            .createReservation(this.reservation)
            .subscribe(
                () => {
                    this.router.navigate(['reservation']); 
                }
            )
    }
        
    gotoListReservation(): void {
        this.router.navigate(['reservation']); 
    }
    
    

    
}
