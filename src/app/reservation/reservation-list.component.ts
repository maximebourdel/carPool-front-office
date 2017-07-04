import { Component, OnInit }    from '@angular/core';

import { Router }               from '@angular/router';
 
import { Reservation }             from './reservation';
import { ReservationService }      from './reservation.service';

import { Observable }           from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'reservation-list',
    templateUrl: 'reservation-list.component.html',
    providers: [ ReservationService ],
    styles: ['.error {color:red;}']
})
export class ReservationListComponent implements OnInit {
    
    errorMessage: string;
    listReservation: Reservation[];
    listSearchReservation: Observable<Reservation[]>; 
    shortName: string;

    constructor (
        private reservationService: ReservationService,
        private router: Router,
    ) {}

    ngOnInit() {
        //Met la navbar nav-liste-reservation en active
        document.getElementById('nav-liste-reservation').setAttribute('class','active');
        this.getListReservation(); 
    }
    
    ngOnDestroy() {
        //Met la navbar nav-liste-reservation en inactive
        document.getElementById('nav-liste-reservation').removeAttribute('class');
    }

    search (term: string) {
        this.listSearchReservation = this.reservationService.getSearchReservation(term);
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
