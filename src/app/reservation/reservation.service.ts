import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Reservation }  from './reservation';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';

/**
 * Service gérant les interactions serveurs concernant les Reservations
 */
@Injectable()
export class ReservationService {
 
    /**
     * URL permettant d'accéder aux routes de l'api côté serveur
     */
    baseUrl: string = 'http://' + environment.API_PATH;
    
    /**
     * Constructeur initialisant le service Reservation
     */
    constructor (
        private authHttp: AuthHttp
    ) {}

    /**
     * Retourne la liste complète des Réservation
     * @return {Observable<Reservation[]>} Observable listant les Réservations
     */
    getListReservation (): Observable<Reservation[]> {
        
        let url = this.baseUrl + 'admin/reservation/all';

        return this.authHttp.get(url)
                   .map( this.extractData );         
    }
    
    /**
     * Retourne une Réservation
     * @return {Observable<Reservation>} Observable contenant la Réservation
     */
    getReservation (token: any, id: number): Observable<Reservation> {
        
        let url = this.baseUrl + 'auth/reservation/get';

        return this.authHttp
            .post( url, {'token' : token, 'reservation_id': id} )
            .map( res => this.extractData(res) )
        ;      
    }
    
    /**
     * Retourne la liste complète des Réservation pour un utilisateur
     * @return {Observable<Reservation[]>} Observable listant les Réservations
     * pour un utilisateur
     */
    getMyListReservation (token: any): Observable<Reservation[]> {
        
        let url = this.baseUrl + 'auth/reservation/mylist';

        return this.authHttp.post(url,  token )
                    .map( res => this.extractData(res) )        
    }

    /**
     * Permet de changer le statut d'une réservation (nécessite id et statut)
     * @param reservation réservation avec le statut à jours
     * @return {Observable<Reservation>} Observable contenant la Réservation
     */
    putStatutReservation (reservation : Reservation): Observable<Reservation> {
        
        let url = this.baseUrl + 'admin/reservation/changeStatus';
        
        return this.authHttp
            .put( url, {'id':reservation.id,'statut':reservation.statut} )
            .map( res => this.extractData(res) )
        ;
    }
    
    /**
     * Permet d'annuler une réservation en changeant son statut 
     * (nécessite id et statut)
     * @param reservation réservation avec le statut à jours
     * @return {Observable<Reservation>} Observable contenant la Réservation
     */
    cancelReservation (reservation : Reservation): Observable<Reservation> {
        
        let url = this.baseUrl + 'auth/reservation/cancel';
        
        return this.authHttp
            .put( url, {'id':reservation.id,'statut':reservation.statut} )
            .map( res => this.extractData(res) )
        ;
    }
    
    /**
     * Retourne la une liste de jours sur un mois,
     * contenant l'info pour savoir si le véhicule est réservé ou non
     * si il est réservé, donne le nom/prénom du réservant 
     * tout en donnant la ville du véhicule et son immatriculation
     * @return {Observable<any[]>} Observable 
     * @example {
     *  immatriculation : DL 396 KP
     *  jour : 1
     *  is_reserve : 0
     *  nom : 
     *  prenom : 
     *  ville : Niort
     * }
     */
    getCreneauxByAnneeMois(datesJson: any): Observable<any[]> {
        
        let url = this.baseUrl + 'auth/reservation/creneauxbyanneemois';
        
        return this.authHttp
            .post(url, JSON.stringify( datesJson ) )
            .map( res => this.extractData(res) )
        ;
    }

    /**
     * Permet créer une nouvelle réservation
     * @param reservation La nouvelle réservation à créer
     * @return {Observable<Reservation>} Observable contenant la Réservation
     */
    createReservation(reservation: Reservation): Observable<Reservation> {
        
        let url = this.baseUrl + 'auth/reservation/create';
        
        return this.authHttp
            .post(url, JSON.stringify( reservation ) )
            .map( res => this.extractData(res) )
        ;
    } 

    /**
     * Extrait les données de l'objet Response
     * @param res Réponse
     * @return Retourne en json la response ou {} si null
     */
    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }    
}
