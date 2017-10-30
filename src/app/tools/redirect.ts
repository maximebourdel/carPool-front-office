//Pour gérer les redirections
import { Router }       from '@angular/router';
//Import des Classes Reservation
import { Reservation }  from '../reservation/reservation';
//Import des Classes Reservation
import { Vehicule }     from '../vehicule/vehicule';

/**
 * Cette classe contient toutes les méthodes de routing 
 * pour une redirection vers une autre page
 */
export class Redirect {
    
    /**
     * Contructeur initialisant une redirection
     */
    constructor (
        protected router: Router
    ) { }
    
    /**
     * Redirection vers la page d'accueil
     */
    gotoHome(): void {
        this.router.navigate(['']);
    }
    
    /**
     * Redirection vers la page de login
     */
    gotoLogin(): void {
        this.router.navigate(['login']);
    }
    
    /**
     * Redirection vers la page de création d'un feedback d'une réservation
     * @param reservation Représente la réservation associée au feedback à créer
     */
    gotoCreateFeedback(reservation: Reservation): void {
        this.router.navigate(['reservation/feedback/' + reservation.id]);
    }

    /**
     * Redirection vers la page affichant les créneaux
     */
    gotoCreneaux(): void {
        this.router.navigate(['reservation/creneaux']);
    }
    
    /**
     * Redirection vers la page de création d'une Réservation
     */
    gotoCreateReservation(): void {
        this.router.navigate(['reservation/new']); 
    }
        
    /**
     * Redirection vers la page listant les réservations d'un utilisateur
     */
    gotoMyListReservation(): void {
        this.router.navigate(['reservation/myList']); 
    }
    
    /**
     * Redirection vers la page d'administration des réservations
     */
    gotoAdministrationReservation(): void {
        this.router.navigate(['reservation/administration']); 
    }    
    
    /**
     * Redirection vers la page listant les véhicules
     */
    gotoListVehicule(): void {
        this.router.navigate(['vehicule']); 
    }
    
    /**
     * Redirection vers la page de détail du véhicule (via son id)
     * @param vehicule Représente le véhicule sélectionné
     */
    gotoDetailVehicule(vehicule: Vehicule): void {
        this.router.navigate(['vehicule/'+ vehicule.id]);
    }
}
