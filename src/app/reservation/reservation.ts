import { Vehicule } from '../vehicule/vehicule';
import { Feedback } from '../feedback/feedback';

/**
 * Objet représentant une réservation de voiture de pool
 */
export class Reservation {
    
    /**
     * Constructeur initialisant une Reservation
     * @param id Identifiant technique unique de la réservation
     * @param vehicule Objet représentant une Voiture de pool
     * @param feedback Objet représentant un retour sur la réservation
     * @param email Email de l'utilisateur ayant fait la réservation (représente l'id unique de l'utilisateur)
     * @param nom Nom de famille de l'utilisateur ayant fait la réservation (en majuscule)
     * @param prenom Prénom de l'utilisateur ayant fait la réservation
     * @param date_debut Jour ou le véhicule sera récupéré par le demandeur
     * @param date_fin Jour ou le véhicule sera rendu par le demandeur
     * @param statut Statut de la réservation peut-être annulée, en attente confirmé ou autres...
     * @param is_feedbackable Champ technique permettant de savoir si l'utilisateur a été notifié et si il peut faire le feedback
     * @param date_creation Champ technique permettant d'enregistrer la date de d'insertion de la ligne
     * @param date_der_maj Champ technique permettant d'enregistrer la date de dernière modification de la ligne
     */
    constructor(
        public id?: number,
        public vehicule?: Vehicule,
        public feedback?: Feedback,
        public email?: string,
        public nom?: string,
        public prenom?: string,
        public date_debut?: string,
        public date_fin?: string,
        public statut?: string,
        public is_feedbackable?: boolean,
        public date_creation?: string,
        public date_der_maj?: string
     
    ) { }
}
