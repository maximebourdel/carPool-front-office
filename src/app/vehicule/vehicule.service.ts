import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Vehicule }     from './vehicule';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';

/**
 * Service gérant les interactions serveurs concernant les Véhicules 
 */
@Injectable()
export class VehiculeService {
    
    /**
     * URL permettant d'accéder aux routes de l'api côté serveur
     */
    baseUrl: string = 'http://' + environment.API_PATH;
    
    /**
     * Constructeur initialisant le service Véhicule
     */
    constructor (private authHttp: AuthHttp) {}
 
    /**
     * Retourne la liste complète des véhicule
     * @return {Observable<Vehicule[]>} Observable listant les véhicules
     */
    getListVehicule (): Observable<Vehicule[]> {
        
        let url = this.baseUrl + 'admin/vehicule/all';

        return this.authHttp.get(url)
                   .map( this.extractData );         
    }

    /**
     * Retourne un véhicule
     * @param vehiculeId Identifiant technique unique du véhicule
     * @return {Observable<Vehicule>} Réponse à la requete
     */
    getVehicule (vehiculeId: number): Observable<Vehicule> {
        
        let url = this.baseUrl + 'admin/vehicules/';

        return this.authHttp.get(url + vehiculeId)
                   .map( this.extractData );      
    }
    
    /**
     * Récupère le véhicule disponible en fonction de la date de début
     * date de fin et et ville choisie
     * @param dateDebut Jour ou le véhicule sera récupéré par le demandeur
     * @param dateFin Jour ou le véhicule sera rendu par le demandeur
     * @param ville Ville de rattachement du véhicule
     * @return {Observable<Vehicule>} Réponse à la requete
     */
    getVehiculeDispo (dateDebut: string, dateFin: string, ville: string)
        : Observable<Vehicule> {
        
        let url = this.baseUrl + 'auth/vehicules/dispos';

        return this.authHttp.post(url, {
                'dateDebut':dateDebut
                ,'dateFin':dateFin
                , 'ville': ville
            }).map( res => this.extractData(res) );
    }

    /**
     * Extrait les données de l'objet Response
     * @param res Réponse
     * @return Retourne en json la response ou {} si null
     */
    private extractData(res: Response): any {
        let body = res.json();
        return body || { };
    }
}
