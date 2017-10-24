import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Feedback }     from './feedback';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';

/**
 * Service gérant les interactions serveurs concernant les Feedbacks 
 */
@Injectable()
export class FeedbackService {
 
    /**
     * URL permettant d'accéder aux routes de l'api côté serveur
     */
    baseUrl: string = 'http://' + environment.API_PATH;
       
    /**
     * Constructeur initialisant le Feedback service
     */
    constructor (
        private authHttp: AuthHttp
    ) {}

    /**
     * Envoie le nouveau feedback au serveur pour création
     * @param feedback Feedback lié à la réservation
     * @return {Observable<Feedback>} Réponse à la requête
     */
    createFeedback(feedback: Feedback): Observable<Feedback> {
        
        let url = this.baseUrl + 'auth/feedback/create';
        
        return this.authHttp
            .post(url, JSON.stringify( feedback ) )
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
