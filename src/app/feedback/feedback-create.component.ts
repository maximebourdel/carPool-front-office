import { Component }                            from '@angular/core';
//Pour gérer les redirections
import { ActivatedRoute, Router , Params }      from '@angular/router';
//Gestion des formulaires
import { FormGroup, FormBuilder , Validators}   from '@angular/forms';
//Import des Classes Reservation
import { Reservation }                          from '../reservation/reservation';
import { ReservationService }                   from '../reservation/reservation.service';
//Import des Classes Reservation
import { Feedback }                             from './feedback';
import { FeedbackService }                      from './feedback.service';
//Affiche les flashbags
import { FlashMessagesService }                 from 'angular2-flash-messages';
//pour le décryptage du token
import { JwtHelper }                            from 'angular2-jwt';
//Pour l'objet Busy
import { Subscription } from 'rxjs';

@Component({
    selector: 'feedback-create',
    providers: [ FeedbackService, ReservationService ],
    templateUrl: 'feedback-create.component.html'
})
export class FeedbackCreateComponent {

    errorMessage: string;
    reservation: Reservation;
    feedback: Feedback = new Feedback ();
    isReservationOk = false;
    feedbackForm: FormGroup;
    busy: Subscription;

    constructor (
        private jwtHelper: JwtHelper,
        private _flashMessagesService: FlashMessagesService,
        private reservationService: ReservationService,
        private feedbackService: FeedbackService,
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder
    ) {
        //Récupération de la réservation
        this.getReservation();
    }
    
    getReservation() {
        this.route.params
            .switchMap(
                (params: Params) => this.reservationService.getReservation(localStorage.getItem('token'), params['id'])
            )
            .subscribe(
                (reservation: Reservation) => {
                    if (reservation !== undefined ) {
                        this.reservation = reservation;
                        //Initialisation du formulaire
                        this.createForm();
                        this.isReservationOk=true;
                    } else {
                        this.isReservationOk=false;
                    }
                }
            )
    }

    addFeedback(): void { 
        //On vérifie que le formulaire n'est pas vide
        if (!this.feedbackForm) { return; }
        //this.feedback.reservation = this.reservation;
                
        this.feedback.reservation = this.reservation;
        this.feedback.kilometres = this.feedbackForm.value.kilometres;
        this.feedback.commentaires = this.feedbackForm.value.commentaires;
        
        this.busy = this.feedbackService
            .createFeedback(this.feedback)
            .subscribe(
                () => {
                    //Redirection vers la page des réservations
                    this.gotoListReservation();
                    //Message flash
                    this._flashMessagesService.show(
                        "Merci, votre retour a bien été transmis à nos administrateurs !"
                        , { cssClass: 'alert-success', timeout: 3500 }
                    );
                }
            )
    }    
    
    createForm() {
        //initialise les éléments du formulaire
        this.feedbackForm = this.fb.group({ 
             kilometres:    ['', Validators.required ]
            , commentaires: ['']
            
        });
    }
        
    gotoListReservation(): void {
        this.router.navigate(['reservation/myList']); 
    }
}
