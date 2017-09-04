import { Component, OnInit }        from '@angular/core';

import { Router }                   from '@angular/router';
 
import { Reservation }              from './reservation';
import { ReservationService }       from './reservation.service';

import { Vehicule }                 from '../vehicule/vehicule';
import { VehiculeService }          from '../vehicule/vehicule.service';

import { FlashMessagesService } from 'angular2-flash-messages';

import { JwtHelper } from 'angular2-jwt';

@Component({
    selector: 'reservation-my-list',
    templateUrl: 'reservation-my-list.component.html',
    providers: [ ReservationService, VehiculeService ]
})
export class ReservationMyListComponent implements OnInit {
    
    errorMessage: string;
    listReservation: Reservation[];
    listVehicule: Vehicule[];
    userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    nomUtilisateur = this.userAttributes['nom'];
    prenomUtilisateur = this.userAttributes['prenom'];
    emailUtilisateur = this.userAttributes['username'];

    constructor (
        private jwtHelper: JwtHelper,
        private _flashMessagesService: FlashMessagesService,    
        private reservationService: ReservationService,
        private router: Router,
    ) { }
    
    ngOnInit() {
        //Met la navbar nav-liste-reservation en active
        document.getElementById('nav-my-liste-reservation').setAttribute('class','active');
        this.getMyListReservation(); 
    }
    
    ngOnDestroy() {
        //Met la navbar nav-liste-reservation en inactive
        document.getElementById('nav-my-liste-reservation').removeAttribute('class');
    }

    getMyListReservation() {
        this.reservationService.getMyListReservation(this.emailUtilisateur)
            .subscribe(
                listReservation => this.listReservation = listReservation,
                error =>  this.errorMessage = <any>error,
            );
    }
    
    cancelReservation (reservation: Reservation) {
        reservation.statut= "Annulée";
        
        this.reservationService.putStatutReservation(reservation)
            .subscribe(
                () => {
                    //on la retire de la liste
                    this.listReservation = this.listReservation.filter(h => h !== reservation);
                    //Message flash
                    this._flashMessagesService.show(
                        'Demande d\'annulation de réservation envoyée.'
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );
                }
            )
    }    
    
    gotoCreate(): void {
        this.router.navigate(['reservation/new']);
    }
}
