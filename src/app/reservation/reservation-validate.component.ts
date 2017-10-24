import { Component, OnInit, OnDestroy
    , ViewEncapsulation, ViewChild }    from '@angular/core';
//Import des Classes Vehicules
import { Vehicule }                     from '../vehicule/vehicule';
//Import des Classes Reservation
import { Reservation }                  from './reservation';
import { ReservationService }           from './reservation.service';
//Affiche les flashbags
import { FlashMessagesService }         from 'angular2-flash-messages';
//pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';

/**
 * Cette page représente le formulaire pour effectuer une demande pour une
 * nouvelle réservation
 */
@Component({
  selector: 'reservation-validate',
  templateUrl: 'reservation-validate.component.html',
    providers: [ ReservationService ]
  , encapsulation: ViewEncapsulation.None
})
export class ReservationValidateComponent implements OnInit, OnDestroy {
    
    /**
     * Représente l'élément contenu dans ngx-datatable
     */
    @ViewChild('myTable') table: any;
    /**
     * Stocke la liste des réservations d'un utilisateur
     */
    listReservations : Reservation[] = [];
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
     * Constructeur initialisant le ReservationValidate component
     */    
    constructor(
        private jwtHelper: JwtHelper,
        private reservationService: ReservationService,
        private _flashMessagesService: FlashMessagesService,  
    ) {}
    
    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-admin').setAttribute('class','active');
        this.getListReservation();
    }

    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy(): void { 
        //Met la navbar reservation-create en inactive
        document.getElementById('nav-reservation-admin').removeAttribute('class');
    } 
    
    /**
     * Initialise la variable listReservations contenant
     * la liste totale des réservations
     */
    getListReservation() {
        this.reservationService.getListReservation()
            .subscribe( (listReservations) => {
                this.listReservations = listReservations;
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
     * Initialise la variable myListReservations contenant
     * la liste des réservations d'un utilisateur
     * @param reservation Reservation dont le statut va être modifié
     * @param statut Nouveau statut qui remplace l'ancien
     * @param message Représente le message flash à afficher après redirection
     */
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
    
    /**
     * Change la couleur de la ligne en fonction du statut de la réservation
     * @param row Reservation sélectionnée
     * @return {any} Classe à aplpliquer en fonction du statut
     * @example { bg-warning: false, bg-success: false, , 'bg-danger': true }
     */
    getRowClass(reservation : Reservation) {
        return {
            'bg-warning': reservation.statut === "En cours d'administration"
            , 'bg-success': reservation.statut === "Confirmée" 
            , 'bg-danger': reservation.statut === "Annulée" 
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
