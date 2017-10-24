import { Reservation } from '../reservation/reservation';

/**
 * Objet représentant une Voiture de pool
 */
export class Vehicule {
    /**
     * Constructeur initialisant une Voiture de pool
     * @param id Identifiant technique unique du véhicule
     * @param reservations Objet représentant une réservation de voiture de pool
     * @param immatriculation Clé unique représentant l'immatriculation du vehicule
     * @param ville Ville de rattachement du véhicule
     * @param date_premiere_immatriculation Date de première immatriculation du véhicule
     * @param date_arrivee_vehicule_bd Date ou le véhicule est arrivé à Business&Decision
     * @param type_acquisition Définit si le véhicule est loué ou acheté ou autres...
     * @param nom_responsable Nom du responsable du véhicule 
     * @param marque Marque du fabriquant du véhicule
     * @param derniere_revision Date de dernière révision du véhicule au garage
     */
    constructor(
        public id: number,
        public reservations: Reservation[],
        public immatriculation: string,
        public ville:string,
        public date_premiere_immatriculation: string,
        public date_arrivee_vehicule_bd: string,
        public type_acquisition: string,
        public nom_responsable: string,
        public marque: string,
        public derniere_revision: number
    ) { }
}
