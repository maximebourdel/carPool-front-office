import { Component, OnInit}                     from '@angular/core';
//Pour gérer les redirections
import { Router }                               from '@angular/router';
//Gestion des formulaires
import { FormGroup, FormBuilder , Validators}   from '@angular/forms';
//Import des Classes Reservation
import { Reservation }                          from './reservation';
import { ReservationService }                   from './reservation.service';
//Import des Classes Véhicule
import { Vehicule }                             from '../vehicule/vehicule';
import { VehiculeService }                      from '../vehicule/vehicule.service';
//Affiche les flashbags
import { FlashMessagesService }                 from 'angular2-flash-messages';
//pour le décryptage du token
import { JwtHelper }                            from 'angular2-jwt';

@Component({
    selector: 'reservation-create',
    providers: [ReservationService, VehiculeService],
    templateUrl: 'reservation-create.component.html'
})
export class ReservationCreateComponent implements OnInit {

    
    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listVehicule: Vehicule[];
    vehiculeDispo: Vehicule;
    reservationForm: FormGroup;
    dateValid: string = 'false';

    constructor (
        private jwtHelper: JwtHelper,
        private _flashMessagesService: FlashMessagesService,
        private reservationService: ReservationService,
        private vehiculeService: VehiculeService,
        private router: Router,
        private fb: FormBuilder
    ) {
        //Initialisation du formulaire
        this.createForm();
    } 

    ngOnInit(): void { 
        //Met la navbar reservation-create en active
        document.getElementById('nav-reservation-create').setAttribute('class','active');
        this.getListVehicule();
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
    
    getVehiculeDispo(dateDebut: string, dateFin: string, ville: string) {
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

    addReservation(): void { 
        
        //On vérifie que le formulaire n'est pas vide
        if (!this.reservationForm) { return; }
        
        //on initalise les autres variables 
        var userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        
        this.reservation.email = userAttributes['username'];
        this.reservation.nom = userAttributes['nom'];
        this.reservation.prenom = userAttributes['prenom'];
        this.reservation.statut = "En cours d'administration";
        this.reservation.date_debut = this.reservationForm.value.dateDebut;
        this.reservation.date_fin = this.reservationForm.value.dateFin;
        
        this.reservation.vehicule = this.vehiculeDispo;   
        
        
        this.reservationService
            .createReservation(this.reservation)
            .subscribe(
                () => {
                    //Redirection vers la page des réservations
                    this.gotoListReservation();
                    //Message flash
                    this._flashMessagesService.show(
                        "Réservation en cours d'administration !"
                        , { cssClass: 'alert-info', timeout: 3500 }
                    );
                }
            )
    }    
    
    checkDatesReservation(dateDebut: string, dateFin: string, ville: string) {
        if(dateDebut !== '' && dateFin !== '') {
            //On vérifie que les dates sont conformes
            if (dateDebut <= dateFin) {
                //On appelle la fonction de recherche d'un véhicule
                this.getVehiculeDispo(dateDebut, dateFin, ville);
                 
            } else {
                this._flashMessagesService.show(
                        'Dates non conformes !'
                        , { cssClass: 'alert-danger', timeout: 3500 }
                );
                //on n'affiche plus le vehicule
                this.vehiculeDispo=undefined;
            }  
        }
    }
    
    createForm() {
        //initialise les éléments du formulaire
        this.reservationForm = this.fb.group({ 
             ville:         ['Nantes', Validators.required ]
            , dateDebut:    ['', Validators.minLength(10) ]
            , dateFin:      ['', Validators.minLength(10) ]
            
        });
        //Active le suivi de date début et date_fin
        let nameControl = this.reservationForm.valueChanges;
        nameControl.forEach(
            (value) => this.checkDatesReservation(
                    value.dateDebut
                    , value.dateFin
                    , value.ville
            )
        );        
    }
        
    gotoListReservation(): void {
        this.router.navigate(['reservation/myList']); 
    }
}
