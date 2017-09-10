import { Component, OnInit, OnDestroy } from '@angular/core';

//pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {

    constructor (
        private jwtHelper: JwtHelper
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
    hasAuthToken() {
        return localStorage.getItem('token') !== null;
    }

    isAdmin() {
        if(this.hasAuthToken()){
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
