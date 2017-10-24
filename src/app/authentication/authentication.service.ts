import { Injectable }                                               from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { tokenNotExpired }                                          from 'angular2-jwt';

import { Observable }                                               from 'rxjs/Observable';

import { environment }                                              from '../../environments/environment';

/**
 * Service gérant les interactions serveurs concernant l'authentifiation 
 */
@Injectable()
export class AuthenticationService {
    
    /**
     * Initatise un AuthenticationService
     */
    constructor(private http: Http) {}
    
    /**
     * Route envoyant les parametres username et password au serveur
     * @param user : Identifiants entrés par l'utilisateur ex :
     * {username:unEmail, password:unPassword}
     * @return Observable<any> Réponse de la requête
     */
    authenticate(user: any): Observable<any> {
  	let url     = 'http://'+ environment.API_PATH + 'login_check';
        let body    = new URLSearchParams();
        body.append('username', user.username);
        body.append('password', user.password);
  	let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
        let options = new RequestOptions({headers: headers});

  	return this.http
                .post(url, body.toString(), options)
                .map((data: Response) => data.json())
        ;
    }

    /**
     * Enlève les payloads du local storage
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('nom');
        localStorage.removeItem('prenom');
    }

    /**
     * Vérifie si le token n'est pas expiré
     * @return {boolean}
     */
    loggedIn(): boolean {
        return tokenNotExpired();
    }
}
