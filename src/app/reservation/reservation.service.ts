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
        
        let url = this.baseUrl + 'admin/reservation/all';

        return this.authHttp.get(url)
                   .map( this.extractData );         
    }
    
    getMyListReservation (email: string): Observable<Reservation[]> {
        
        let url = this.baseUrl + 'auth/reservations/mies/lists';

        return this.authHttp.post(url,  email )
                    .map( res => this.extractData(res) )        
    }
    
    getSumdaybydayReservation (): Observable<any[]> {
        
        let url = this.baseUrl + 'auth/reservation/sumdaybyday';

        return this.authHttp.get(url)
                   .map( this.extractData );         
    }   

    getRequete (): Observable<any[]> {
        
        let url = this.baseUrl + 'auth/reservation/requete';

        return this.authHttp.get(url)
                   .map( this.extractData );    
    } 

    putStatutReservation (reservation : Reservation): Observable<Reservation> {
        
        let url = this.baseUrl + 'auth/reservation/statut';        
        
        return this.authHttp
            .put( url, {'id':reservation.id,'statut':reservation.statut} )
            .map( res => this.extractData(res) )
        ;
    }
            
    getCreneauxByAnneeMois(datesJson: any): Observable<any[]> {
        
        let url = this.baseUrl + 'auth/reservations/creneauxbyanneemois';
        
        return this.authHttp
            .post(url, JSON.stringify( datesJson ) )
            .map( res => this.extractData(res) )
        ;
    }

    createReservation(reservation: Reservation): Observable<Reservation> {
        
        let url = this.baseUrl + 'auth/reservations';
        
        return this.authHttp
            .post(url, JSON.stringify( reservation ) )
            .map( res => this.extractData(res) )
        ;
    } 

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
}
