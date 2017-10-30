import { Component, OnInit, OnDestroy
    , ViewEncapsulation, ViewChild }    from '@angular/core';
//Pour gérer les redirections
import { Router }                       from '@angular/router';
//Import des Classes Véhicule
import { Vehicule }                     from '../vehicule/vehicule';
//Import des Classes Reservation
import { Reservation }                  from './reservation';
import { ReservationService }           from './reservation.service';
//Affiche les flashbags
import { FlashMessagesService }         from 'angular2-flash-messages';
//Pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';
//Classe utilisée pour la redirection
import {Redirect}                       from '../tools/redirect';

/**
 * Cette page représente la liste des réservations associées
 * à l'utilisateur connecté
 */
@Component({
    selector: 'reservation-my-list',
    templateUrl: 'reservation-my-list.component.html',
    providers: [ ReservationService ],
    encapsulation: ViewEncapsulation.None
})
export class ReservationMyListComponent implements OnInit, OnDestroy {
    
    
    /**
     * Représente l'élément contenu dans ngx-datatable
     */
    @ViewChild('myTable') table: any;
    /**
     * Stocke la liste des réservations d'un utilisateur
     */
    myListReservations : Reservation[] = [];
    /**
     * Détermine si la barre bleue de chargement continue d'être affichée
     */
    loadingIndicator: boolean = true;
    /**
     * Représente le token de l'utilisateur
     */
    userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
    /**
     * Représente le nom de l'utilisateur (Récupéré dans l'objet Réservation)
     */
    nomUtilisateur = this.userAttributes['nom'];
    /**
     * Représente le prénom de l'utilisateur (Récupéré dans l'objet Réservation)
     */
    prenomUtilisateur = this.userAttributes['prenom'];
    /**
     * Représente l'mail de l'utilisateur (Récupéré dans l'objet Réservation)
     */
    emailUtilisateur = this.userAttributes['username'];
    /**
     * Variable pour les redirections sur une autre page
     */
    redirect: Redirect;

    /**
     * Constructeur initialisant le ReservationMyList component
     */
    constructor(
        private jwtHelper: JwtHelper,
        private reservationService: ReservationService,
        private router: Router,
        private _flashMessagesService: FlashMessagesService,  
    ) {
        //Attribution du routeur à la classe de redirection
        this.redirect = new Redirect(this.router);
    }
    
    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit() {
        //Met la navbar nav-liste-reservation en active
        document.getElementById('nav-my-liste-reservation').setAttribute('class','active');
        this.getMyListReservation();
    }
    
    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy() {
        //Met la navbar nav-liste-reservation en inactive
        document.getElementById('nav-my-liste-reservation').removeAttribute('class');
        this.redirect = null;
    }
    
    /**
     * Initialise la variable myListReservations contenant
     * la liste des réservations d'un utilisateur
     */
    getMyListReservation() {
        this.reservationService.getMyListReservation(localStorage.getItem('token'))
            .subscribe( (myListReservations) => {
                this.myListReservations = myListReservations;
                //Met fin au défilement de la barre bleue (chargement)
                setTimeout(() => { this.loadingIndicator = false; }, 750);
            }
        );
    }
  
    /**
     * Permet d'étendre une ligne et afficher la sous ligne
     * @param row Numéro de la ligne
     */
    toggleExpandRow(row: number) {
        this.table.rowDetail.toggleExpandRow(row);
    }
    
    /**
     * Permet d'annuler une réservation
     * @param reservation Reservation à annuler
     */
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
                    this.myListReservations = this.myListReservations.filter(
                        h => h !== reservation
                    );
                    //Message flash
                    this._flashMessagesService.show(
                        'Demande d\'annulation de réservation envoyée.'
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );
                }
            )
    }     
    
    /**
     * Récupère la reservation pour une ligne
     * @param reservation Reservation associée à la ligne
     * @return {any} Classe à aplpliquer en fonction du statut
     * @example { bg-warning: false, bg-success: false }
     */
    getRowClass(reservation : Reservation) {
        return {
            'bg-warning': reservation.statut === "En cours d'administration"
            , 'bg-success': reservation.statut === "Confirmée" 
        };
    }

    /**
     * Permet de ranger les colonnes immatriculations 
     * par ordre croissant/décroissant
     * @return {number} -1 ou 1
     */
    vehiculeSorter(propA: Vehicule, propB: Vehicule) {
        // Effectue un sorter
        if (propA.immatriculation.toLowerCase() < propB.immatriculation.toLowerCase()) 
            return -1;
        if (propA.immatriculation.toLowerCase() > propB.immatriculation.toLowerCase()) 
            return 1;
    }
}
