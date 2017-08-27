import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {

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
    
}
