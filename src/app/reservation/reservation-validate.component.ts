import { Component, OnInit }     from '@angular/core';

import { Router }               from '@angular/router';

import { Reservation }          from './reservation';
import { ReservationService }   from './reservation.service';

import { Vehicule }             from '../vehicule/vehicule';
import { VehiculeService }      from '../vehicule/vehicule.service';

@Component({
    selector: 'reservation-validate',
    providers: [ReservationService, VehiculeService],
    templateUrl: 'reservation-validate.component.html'
})
export class ReservationValidateComponent implements OnInit {

    
    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listVehicule: Vehicule[];


    data:any;

    constructor (
        private reservationService: ReservationService,
        private vehiculeService: VehiculeService,
        private router: Router,
    ) {} 
    
    
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-validate').setAttribute('class','active');
        this.getListVehicule();
    }

    ngOnDestroy(): void { 
        //Met la navbar reservation-create en inactive
        document.getElementById('nav-reservation-validate').removeAttribute('class');
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
