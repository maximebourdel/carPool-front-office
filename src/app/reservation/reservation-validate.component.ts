import { Component, OnInit, OnDestroy
    , ViewEncapsulation, ViewChild }    from '@angular/core';

import { Router }                       from '@angular/router';

import { Vehicule }                     from '../vehicule/vehicule';

import { Reservation }                  from './reservation';
import { ReservationService }           from './reservation.service';

import { FlashMessagesService }         from 'angular2-flash-messages';

import { JwtHelper }                    from 'angular2-jwt';


@Component({
  selector: 'reservation-validate',
  templateUrl: 'reservation-validate.component.html',
  
    providers: [ ReservationService ]
  , encapsulation: ViewEncapsulation.None
})
export class ReservationValidateComponent implements OnInit, OnDestroy {

    @ViewChild('myTable') table: any;

    listReservations : Reservation[] = [];
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
    
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-admin').setAttribute('class','active');
        this.getListReservation();
    }

    ngOnDestroy(): void { 
        //Met la navbar reservation-create en inactive
        document.getElementById('nav-reservation-admin').removeAttribute('class');
    } 
    
    getListReservation() {
        this.reservationService.getListReservation()
            .subscribe( (listReservations) => {
                this.listReservations = listReservations;
                setTimeout(() => { this.loadingIndicator = false; }, 750);
            }
        );
    }
  
    toggleExpandRow(row:number) {
        this.table.rowDetail.toggleExpandRow(row);
    }
    
    putStatutReservation (reservation: Reservation, statut: string, message: string) {
        
        //On demande à l'utilisateur si il est certain de son choix quand il annule une résa
        if (statut=='Annulée'){
            if(confirm('Voulez vous vraiment annuler cette réservation ?')==false) {
                return;
            }
        }
        //Alors on change la valeur du formulaire
        reservation.statut= statut;
        //Puis on envoie au serveur
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
    
    getRowClass(row) {
        return {
            'bg-warning': row.statut === "En cours d'administration"
            , 'bg-success': row.statut === "Confirmée" 
            , 'bg-danger': row.statut === "Annulée" 
            
        };
    }
    
    gotoCreate(): void {
        this.router.navigate(['reservation/new']);
    }
    

    vehiculeSorter(propA: Vehicule, propB: Vehicule) {
        
        // Effectue un sorter
        if (propA.immatriculation.toLowerCase() < propB.immatriculation.toLowerCase()) return -1;
        if (propA.immatriculation.toLowerCase() > propB.immatriculation.toLowerCase()) return 1;
    }    

}
