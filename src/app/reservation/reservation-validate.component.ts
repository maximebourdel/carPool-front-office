import { Component, OnInit }    from '@angular/core';

import { Router }               from '@angular/router';

import { Reservation }          from './reservation';
import { ReservationService }   from './reservation.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'reservation-validate',
    providers: [ReservationService],
    templateUrl: 'reservation-validate.component.html'
})
export class ReservationValidateComponent implements OnInit {

    
    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listReservation: Reservation[];

    constructor (
        private _flashMessagesService: FlashMessagesService,    
        private reservationService: ReservationService,
        private router: Router,
    ) {} 
    
    
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-validate').setAttribute('class','active');
        this.getListReservation();
    }

    ngOnDestroy(): void { 
        //Met la navbar reservation-create en inactive
        document.getElementById('nav-reservation-validate').removeAttribute('class');
    } 

           
    getListReservation() {
        this.reservationService.getListReservation()
            .subscribe(
                listReservation => this.listReservation = listReservation,
                error =>  this.errorMessage = <any>error,
            );
    }
    
    putStatutReservation (reservation: Reservation, statut: string, message: string) {
        reservation.statut= statut;
        
        this.reservationService.putStatutReservation(reservation)
            .subscribe(
                () => {
                    //Message flash
                    this._flashMessagesService.show(
                        message
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );
                }
            )
    }
}
