import { Component, OnInit }        from '@angular/core';

import { Router }                   from '@angular/router';
 
import { Reservation }              from './reservation';
import { ReservationService }       from './reservation.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'reservation-list',
    templateUrl: 'reservation-list.component.html',
    providers: [ ReservationService ]
})
export class ReservationListComponent implements OnInit {
    
    errorMessage: string;
    listReservation: Reservation[];
    reservation: Reservation;

    constructor (
        private reservationService: ReservationService,
        private router: Router,
    ) { }
    
    ngOnInit() {
        this.getListReservation(); 
    }

    getListReservation() {
        this.reservationService.getListReservation()
            .subscribe(
                listReservation => this.listReservation = listReservation,
                error =>  this.errorMessage = <any>error,
            );
    }
      
    gotoCreate(): void {
        this.router.navigate(['reservation/new']);
    }
}
