import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Reservation }  from './reservation';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';


@Injectable()
export class ReservationService {
 
    baseUrl: string = 'http://' + environment.API_PATH;
           
    constructor (private authHttp: AuthHttp) {}
 
    getListReservation (): Observable<Reservation[]> {
        
        let url = this.baseUrl + 'reservation/all';

        return this.authHttp.get(url)
                   .map( this.extractData )
                   .catch(this.handleError);         
    }
    
    getSumdaybydayReservation (): Observable<any[]> {
        
        let url = this.baseUrl + 'reservation/sumdaybyday';

        return this.authHttp.get(url)
                   .map( this.extractData )
                   .catch(this.handleError);         
    }    

    getRequete (): Observable<any[]> {
        
        let url = this.baseUrl + 'reservation/requete';

        return this.authHttp.get(url)
                   .map( this.extractData )
                   .catch(this.handleError);         
    } 
        
    getSearchReservation (term: string): Observable<Reservation[]> {
        
        let url = this.baseUrl + 'reservations/' + term;

        return this.authHttp.get(url)
                   .map( this.extractData )
                   .catch(this.handleError);         
    }

    createReservation(reservation: Reservation): Observable<Reservation> {
        
        let url = this.baseUrl + 'reservations';
        
        return this.authHttp
            .post(url, JSON.stringify( reservation ) )
            .map( res => this.extractData(res) )
        ;
    }   

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        console.error("errMsg");
        return Observable.throw(errMsg);
    }
}
