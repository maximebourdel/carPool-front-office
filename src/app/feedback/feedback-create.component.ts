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
import { FlashMessagesService } from 'angular2-flash-messages';
//Pour l'objet Busy
import { Subscription }         from 'rxjs';

/**
 * Cette page représente le formulaire pour 
 * créer un feedback sur une réservation
 */
@Component({
    selector: 'feedback-create',
    providers: [ FeedbackService, ReservationService ],
    templateUrl: 'feedback-create.component.html'
})
export class FeedbackCreateComponent {

    /**
     * Reservation associée au feedback
     */
    reservation: Reservation;
    /**
     * Représente notre Feedback qui sera enrichi
     */
    feedback: Feedback = new Feedback ();
    /**
     * Boolean étant à faux si réservation n'existe pas ou utilisateur n'est
     * n'a pas le droit de faire le feedback car n'est pas celui qui a créé la 
     * réservation (voir service puis API coté symfony)
     * vrai si l'utilisateur est bien celui qui a créé la reservation
     */
    isReservationOk: boolean = false;
    /**
     * Représente le formulaire de feedback
     */
    feedbackForm: FormGroup;
    /**
     * Pour le busy (attente)
     */
    busy: Subscription;

    /**
     * Constructeur initialisant le FeedbackCreate component
     */
    constructor (
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
    
    /**
     * Retourne la réservation liée au feedback en fonction 
     * du numéro d'identifiant fourni dans l'url
     * retourne undefined si la réservation n'existe pas ou si 
     * l'utilisateur n'est pas créateur de la réservation en question
     */
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

    /**
     * Fonction appelée lorsque l'utilisateur appuis sur "Submit"
     * Va envoyer le feedback au serveur pour l'enregistrer 
     * puis rediriger l'utilisateur vers sa liste de réservations
     */
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
    
    /**
     * Initialise le formulaire
     */
    createForm() {
        //initialise les éléments du formulaire
        this.feedbackForm = this.fb.group({ 
             kilometres:    ['', Validators.required ]
            , commentaires: ['']
            
        });
    }
    
    /**
     * Redirection vers la page listant les réservations d'un utilisateur
     */
    gotoListReservation(): void {
        this.router.navigate(['reservation/myList']); 
    }
}
