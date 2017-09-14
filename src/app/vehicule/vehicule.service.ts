import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Vehicule }     from './vehicule';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';

@Injectable()
export class VehiculeService {
 
    baseUrl: string = 'http://' + environment.API_PATH;
           
    constructor (private authHttp: AuthHttp) {}
 
    getListVehicule (): Observable<Vehicule[]> {
        
        let url = this.baseUrl + 'admin/vehicule/all';

        return this.authHttp.get(url)
                   .map( this.extractData );         
    }

    getVehicule (vehiculeId: number): Observable<Vehicule> {
        
        let url = this.baseUrl + 'admin/vehicules/';

        return this.authHttp.get(url + vehiculeId)
                   .map( this.extractData );      
    }
    
    getVehiculeDispo (dateDebut: string, dateFin: string, ville: string)
        : Observable<Vehicule> {
        
        let url = this.baseUrl + 'auth/vehicules/dispos';

        return this.authHttp.post(url, {
                    'dateDebut':dateDebut
                    ,'dateFin':dateFin
                    , 'ville': ville
                }).map( res => this.extractData(res) );
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }
}
