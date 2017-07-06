import { Component, OnInit }     from '@angular/core';

import { Router }               from '@angular/router';

import { Reservation }          from './reservation';
import { ReservationService }   from './reservation.service';

import { Vehicule }             from '../vehicule/vehicule';
import { VehiculeService }      from '../vehicule/vehicule.service';


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

    
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-create').setAttribute('class','active');
        this.getListVehicule();
    }

    ngOnDestroy(): void { 
        //Met la navbar reservation-create en inactive
        document.getElementById('nav-reservation-create').removeAttribute('class');
    } 

           
    getListVehicule() {
        
        this.vehiculeService.getListVehicule()
            .subscribe(
                listVehicule => this.listVehicule = listVehicule,
                error =>  this.errorMessage = <any>error,
            );
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
