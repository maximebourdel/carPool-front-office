import { Component, OnInit }                    from '@angular/core';
//Pour gérer les redirections
import { Router }                               from '@angular/router';
//Gestion des formulaires
import { FormGroup, FormBuilder , Validators}   from '@angular/forms';
//Import des Classes Véhicule
import { Vehicule }                             from '../vehicule/vehicule';
import { VehiculeService }                      from '../vehicule/vehicule.service';
//Import des Classes Reservation
import { Reservation }                          from './reservation';
import { ReservationService }                   from './reservation.service';
//Affiche les flashbags
import { FlashMessagesService }                 from 'angular2-flash-messages';
//Pour le décryptage du token
import { JwtHelper }                            from 'angular2-jwt';
//Pour l'objet Busy
import { Subscription }                         from 'rxjs';
//Classe utilisée pour la redirection
import { Redirect }                             from '../tools/redirect';

/**
 * Cette page représente le formulaire pour effectuer une demande pour une
 * nouvelle réservation
 */
@Component({
    selector: 'reservation-create',
    providers: [ ReservationService, VehiculeService ],
    templateUrl: 'reservation-create.component.html'
})
export class ReservationCreateComponent implements OnInit {
    
    /**
     * Stocke le message d'erreur
     */
    errorMessage: string;
    /**
     * Stocke la nouvelle future réservation
     */
    reservation: Reservation = new Reservation();
    /**
     * Représente le véhicule disponible en fonction de 
     * la date_debut, date_fin, ville demandé par l'utilsiateur
     */
    vehiculeDispo: Vehicule;
    /**
     * Représente le formulaire de réservation
     */
    reservationForm: FormGroup;
    /**
     * Boolean déterminant si la date_debut <= date_fin
     */
    dateValid: string = 'false';
    /**
     * Pour le busy (attente)
     */
    busy: Subscription;
    /**
     * Variable pour les redirections sur une autre page
     */
    redirect: Redirect;
    /**
     * Constructeur initialisant le ReservationCreate component
     */
    constructor (
        private jwtHelper: JwtHelper,
        private _flashMessagesService: FlashMessagesService,
        private reservationService: ReservationService,
        private vehiculeService: VehiculeService,
        private router: Router,
        private fb: FormBuilder
    ) {
        //Attribution du routeur à la classe de redirection
        this.redirect = new Redirect(this.router);
        //Initialisation du formulaire
        this.createForm();
    } 

    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit(): void {
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-create').setAttribute('class','active');
    }

    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy(): void {
        //Met la navbar reservation-create en inactive
        document.getElementById('nav-reservation-create').removeAttribute('class');
    }
    
    /**
     * Initialise la variable vehiculeDispo ou non si il y a un véhicule 
     * disponible
     * @param dateDebut Jour ou le véhicule sera récupéré par le demandeur
     * @param dateFin Jour ou le véhicule sera rendu par le demandeur
     * @param ville Ville de rattachement du véhicule
     */
    getVehiculeDispo(dateDebut: string, dateFin: string, ville: string): void {
        this.vehiculeService.getVehiculeDispo(dateDebut,dateFin, ville)
            .subscribe( 
                (vehiculeDispo) => {
                    //pas de résultat
                    if (vehiculeDispo.id == null){
                        this.vehiculeDispo = null
                    } else {
                        this.vehiculeDispo = vehiculeDispo;
                    }
                    this.reservationForm.value.vehicule = this.vehiculeDispo;
                }
            );        
    }

    /**
     * Fonction appelée si un véhicule dispo est bien trouvé,
     * lorsque l'utilisateur appuis sur "Submit"
     * Va envoyer la réservation au serveur pour l'enregistrer 
     * puis rediriger l'utilisateur vers sa liste de réservations
     */
    addReservation(): void { 
        //On vérifie que le formulaire n'est pas vide
        if (!this.reservationForm) { return; }
        
        //on initalise les autres variables 
        var userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        
        this.reservation.vehicule = this.vehiculeDispo;
        this.reservation.feedback = null;
        this.reservation.nom = userAttributes['nom'];
        this.reservation.prenom = userAttributes['prenom'];
        this.reservation.date_debut = this.reservationForm.value.dateDebut;
        this.reservation.date_fin = this.reservationForm.value.dateFin;
        this.reservation.email = userAttributes['username'];
        this.reservation.statut = "En cours d'administration";
        
        this.busy = this.reservationService
            .createReservation(this.reservation)
            .subscribe(
                () => {
                    //Redirection vers la page des réservations
                    this.redirect.gotoMyListReservation();
                    //Message flash
                    this._flashMessagesService.show(
                        "Réservation en cours d'administration !"
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );
                }
            )
    }    
    
    /**
     * Fonction transverse vérifiant que les dates de réservations sont 
     * conformes ou non
     * @param dateDebut Jour ou le véhicule sera récupéré par le demandeur
     * @param dateFin Jour ou le véhicule sera rendu par le demandeur
     * @param ville Ville de rattachement du véhicule
     */
    checkDatesReservation(dateDebut: string, dateFin: string, ville: string): void {
        if(dateDebut !== '' && dateFin !== '') {
            //On vérifie que les dates sont conformes
            if (dateDebut <= dateFin) {
                //On appelle la fonction de recherche d'un véhicule
                this.getVehiculeDispo(dateDebut, dateFin, ville);
                //On dégrise le bouton valider
                this.reservationForm.controls['dateDebut'].setErrors(null);
                this.reservationForm.controls['dateFin'].setErrors(null);
            } else {
                
                this._flashMessagesService.show(
                    'Dates non conformes !'
                    , { cssClass: 'alert-danger', timeout: 3500 }
                );
                //on n'affiche plus le vehicule
                this.vehiculeDispo=undefined;
                
                //On grise le bouton valider
                this.reservationForm.controls['dateDebut'].setErrors({'incorrect': true});
                this.reservationForm.controls['dateFin'].setErrors({'incorrect': true});
            }  
        }
    }
    
    /**
     * Initialise le formulaire et active son suivi interractif
     */
    createForm(): void {
        //initialise les éléments du formulaire
        this.reservationForm = this.fb.group({ 
             ville:         ['Nantes', Validators.required ]
            , dateDebut:    ['', Validators.required ]
            , dateFin:      ['', Validators.required ]
            
        });
        //Active le suivi des modifications de dateDebut, dateFin et ville
        let nameControl = this.reservationForm.valueChanges;
        nameControl.forEach(
            (value) => this.checkDatesReservation(
                value.dateDebut
                , value.dateFin
                , value.ville
            )
        );        
    }
}
