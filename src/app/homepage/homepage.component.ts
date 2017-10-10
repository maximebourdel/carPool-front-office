import { Component, OnInit, OnDestroy } from '@angular/core';

//pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';

import { AuthenticationService }        from '../authentication/authentication.service';

@Component({
  selector: 'app-homepage',
  providers: [ AuthenticationService ],
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {

    constructor (
        private jwtHelper: JwtHelper,
        private authenticationService: AuthenticationService
    ) {} 

    ngOnInit(): void {
        document.getElementById('nav-home').setAttribute('class','active');
    }
       
    ngOnDestroy(): void {
        document.getElementById('nav-home').removeAttribute('class');
    }
    
    /**
     * Permet de vérifier si un utilisateur est connecté ou non pour changer l'affichage en conséquent
     */
    hasAuthTokenValid() {
        return localStorage.getItem('token') !== null && this.authenticationService.loggedIn();
    }

    isAdmin() {
        //On vérifie déjà si il est connecté
        if(this.hasAuthTokenValid()){
            var userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            //Si oui on regarde si il a le ROLE_ADMIN
            if (userAttributes['roles'][0] === 'ROLE_ADMIN'){
                return true;
            } else {
                return false
            }
                
        } else {
            return false;
        }
    }
        
}
