import { Component, OnInit, OnDestroy
    , ViewEncapsulation, ViewChild }    from '@angular/core';

import { Router }                       from '@angular/router';


import { Reservation }                  from './reservation';
import { ReservationService }           from './reservation.service';

import { FlashMessagesService }         from 'angular2-flash-messages';

import { JwtHelper }                    from 'angular2-jwt';


@Component({
  selector: 'reservation-my-list',
  templateUrl: 'reservation-my-list.component.html',
  
    providers: [ ReservationService ]
  , encapsulation: ViewEncapsulation.None
})
export class ReservationMyListComponent implements OnInit, OnDestroy {

    @ViewChild('myTable') table: any;

    myListReservations : Reservation[] = [];
    expanded: any = {};
    timeout: any;
    loadingIndicator: boolean = true;

    userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    nomUtilisateur = this.userAttributes['nom'];
    prenomUtilisateur = this.userAttributes['prenom'];
    emailUtilisateur = this.userAttributes['username'];

    constructor(
        private jwtHelper: JwtHelper,
        private reservationService: ReservationService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService,  
    ) {}
    
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
            .subscribe( (myListReservations) => {
                this.myListReservations = myListReservations;
                setTimeout(() => { this.loadingIndicator = false; }, 750);
            }
        );
    }
  
    toggleExpandRow(row:number) {
        this.table.rowDetail.toggleExpandRow(row);
    }
    
    cancelReservation (reservation: Reservation) {
        //On demande à l'utilisateur si il est certain de son choix
        if ( confirm('Voulez vous vraiment annuler cette réservation ?') == false ){
            return;
        }
        
        reservation.statut= "Annulée";
        
        this.reservationService.cancelReservation(reservation)
            .subscribe(
                () => {
                    //on la retire de la liste
                    this.myListReservations = this.myListReservations.filter(h => h !== reservation);
                    //Message flash
                    this._flashMessagesService.show(
                        'Demande d\'annulation de réservation envoyée.'
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );
                }
            )
    }     
    
    getRowClass(row) {
        return {
            'bg-warning': row.statut === "En cours d'administration"
            , 'bg-info': row.statut === "Confirmée" 
            
        };
    }
    
    gotoCreate(): void {
        this.router.navigate(['reservation/new']);
    }

}
