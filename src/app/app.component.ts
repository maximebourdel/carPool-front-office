import { Component } from '@angular/core';
import { Router } from '@angular/router';
 
import { AuthenticationService } from './authentication/authentication.service';
 
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-root',
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
        if (this.hasAuthToken()){
            let userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            this.nomUtilisateur = userAttributes['nom'];
            this.prenomUtilisateur = userAttributes['prenom'];
        }
    
    }
 
    hasAuthToken() {
        return localStorage.getItem('token') !== null;
    }
 
    logout() {
        this.authenticationService.logout();
        this.router.navigate(['']);  
    }
}
