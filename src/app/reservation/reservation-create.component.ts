import { Component, OnInit, OnChanges}          from '@angular/core';
//Pour gérer les redirections
import { Router }                               from '@angular/router';
//Gestion des formulaires
import { FormControl, FormGroup
    , FormBuilder , Validators}                 from '@angular/forms';
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
export class ReservationCreateComponent implements OnInit, OnChanges {

    
    errorMessage: string;
    reservation: Reservation = new Reservation ();
    listVehicule: Vehicule[];
    reservationForm: FormGroup;

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

    addReservation(): void { 
        if (!this.reservationForm) { return; }
        //on initalise les autres variables 
        var userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
        this.reservation.email = userAttributes['username'];
        this.reservation.nom = userAttributes['nom'];
        this.reservation.prenom = userAttributes['prenom'];
        this.reservation.statut = 'En cours de modération'; 
        this.reservation.date_debut = this.reservationForm.value.dateDebut;
        this.reservation.date_fin = this.reservationForm.value.dateFin;
        this.reservation.vehicule = this.reservationForm.value.vehicule;           
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
    
    checkDatesReservation() {
        if (this.reservation.date_debut <= this.reservation.date_fin) { 
            return true;
        } else {
            alert('Dates non conformes');
            return false;
        }        
    }
    
    ngOnChanges() {
        this.reservationForm.reset({
          dateDebut: this.reservation.date_debut
          , dateFin: this.reservation.date_fin
          , vehicule: this.reservation.vehicule
        });
    }
    
    createForm() {
        this.reservationForm = this.fb.group({ 
            dateDebut: ['' , Validators.minLength(10)]
            , dateFin: ['' , Validators.minLength(10)]
            , vehicule:['' , Validators.minLength(10)]
            
        });
    }
        
    gotoListReservation(): void {
        this.router.navigate(['reservation/myList']); 
    }
    
    

    
}
