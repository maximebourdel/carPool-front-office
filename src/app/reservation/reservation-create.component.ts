import { Component, OnInit }     from '@angular/core';

import { Router }               from '@angular/router';

import { Reservation }          from './reservation';
import { ReservationService }   from './reservation.service';

import { Vehicule }             from '../vehicule/vehicule';
import { VehiculeService }      from '../vehicule/vehicule.service';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'reservation-create',
    providers: [ReservationService, VehiculeService],
    templateUrl: 'reservation-create.component.html'
})
export class ReservationCreateComponent implements OnInit {

    
    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listVehicule: Vehicule[];

    constructor (
        private _flashMessagesService: FlashMessagesService,
        private reservationService: ReservationService,
        private vehiculeService: VehiculeService,
        private router: Router,
    ) {} 

    
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-create').setAttribute('class','active');
        this.getListVehicule();
        this.reservation.email = localStorage.getItem('email');
        this.reservation.nom = localStorage.getItem('nom');
        this.reservation.prenom = localStorage.getItem('prenom');
        this.reservation.statut = 'En cours de modération';
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
                    //Redirection vers la page des réservations
                    this.gotoListReservation();
                    //Message flash
                    this._flashMessagesService.show(
                        'Réservation en cours de modération !'
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );

                }
            )
    }
        
    gotoListReservation(): void {
        this.router.navigate(['reservation/myList']); 
    }
    
    

    
}
