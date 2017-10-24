import { Component, OnInit, OnDestroy } from '@angular/core';

//pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';

import { AuthenticationService }        from '../authentication/authentication.service';

/**
 * Représente la page d'accueil du site
 */
@Component({
  selector: 'app-homepage',
  providers: [ AuthenticationService ],
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {
    
    /**
     * Constructeur initialisant le Homepage
     */
    constructor (
        private jwtHelper: JwtHelper,
        private authenticationService: AuthenticationService
    ) {} 
    
    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit(): void {
        document.getElementById('nav-home').setAttribute('class','active');
    }
    
    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy(): void {
        document.getElementById('nav-home').removeAttribute('class');
    }
    
    /**
     * Permet de vérifier si un utilisateur est connecté ou non pour changer 
     * l'affichage en conséquent
     */
    hasAuthTokenValid(): boolean{
        return localStorage.getItem('token') !== null && this.authenticationService.loggedIn();
    }

    /**
     * Voit si on bien à faire à un admin est logué ou non
     * @returns {boolean} vrai ou faux
     */
    isAdmin(): boolean {
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
