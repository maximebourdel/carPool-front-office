import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from './authentication/authentication.service';
 
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
  providers: [ AuthenticationService ],
  templateUrl: './app.component.html'
})
export class AppComponent {
    
    
    imageLogo: string = './assets/logo.png';
    nomUtilisateur:string;
    prenomUtilisateur: string;

    constructor(
        private jwtHelper: JwtHelper,
        private authenticationService: AuthenticationService
        , private router: Router
    ) {
        if (this.hasAuthTokenValid()){
            let userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            this.nomUtilisateur = userAttributes['nom'];
            this.prenomUtilisateur = userAttributes['prenom'];
        }
    
    }
 
    hasAuthTokenValid() {
        return localStorage.getItem('token') !== null && this.authenticationService.loggedIn() ;
    }
 
    logout() {
        this.authenticationService.logout(); 
    }
    
    isAdmin() {
        if(this.hasAuthTokenValid()){
            var userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            
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
