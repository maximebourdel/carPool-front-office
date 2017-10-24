import { Reservation } from '../reservation/reservation';

/**
 * Objet représentant un retour sur la réservation
 */
export class Feedback {
    
    /**
     * Constructeur initialisant un Objet Feedback
     * @param id Identifiant technique unique du Feedback
     * @param reservation Objet représentant une réservation de voiture de pool
     * @param kilometres Kilomètres au compteur du véhicule constaté à la fin de la réservation
     * @param commentaires Commentaire sur la réservation ou le véhicule
     * @param date_creation Champ technique permettant d'enregistrer la date de d'insertion de la ligne
     * @param date_der_maj Champ technique permettant d'enregistrer la date de dernière modification de la ligne
     */
    constructor(
        public id?: number,
        public reservation?: Reservation,
        public kilometres?: number,
        public commentaires?: string,
        public date_creation?: string,
        public date_der_maj?: string
    ) { }
}
