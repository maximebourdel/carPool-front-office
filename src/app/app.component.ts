import { Component }                from '@angular/core';
 
import { AuthenticationService }    from './authentication/authentication.service';
 
import { JwtHelper }                from 'angular2-jwt';
//Classe utilisée pour la redirection
import { Router }                   from '@angular/router'; 
import { Redirect }                 from './tools/redirect';


/**
 * Classe Principale, tous les component pointent vers elle
 */
@Component({
  selector: 'app-root',
  providers: [ AuthenticationService ],
  templateUrl: './app.component.html'
})
export class AppComponent {
    
    /**
     * URL du logo affiché en gros sur la page
     */
    imageLogo: string = './assets/logo.png';
    /**
     * Représente le nom de l'utilisateur (Récupéré dans l'objet Réservation)
     */
    nomUtilisateur:string;
    /**
     * Représente le prénom de l'utilisateur (Récupéré dans l'objet Réservation)
     */
    prenomUtilisateur: string;
    /**
     * Variable pour les redirections sur une autre page
     */
    redirect: Redirect;

    /**
     * Constructeur du component App
     */
    constructor(
        private jwtHelper: JwtHelper,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) {
        //Attribution du routeur à la classe de redirection
        this.redirect = new Redirect(this.router);
        //Si l'utilisateur est logué
        if (this.hasAuthTokenValid()){
            let userAttributes = this.jwtHelper.decodeToken(localStorage.getItem('token'));
            this.nomUtilisateur = userAttributes['nom'];
            this.prenomUtilisateur = userAttributes['prenom'];
        }
    
    }
 
    /**
     * Voit il y a présence d'un token (vérifie si token expiré)
     * @returns {boolean} vrai ou faux
     */
    hasAuthTokenValid() : boolean {
        return localStorage.getItem('token') !== null && this.authenticationService.loggedIn() ;
    }
 
    /**
     * Enlève les payloads du local storage
     */
    logout() :void {
        this.authenticationService.logout();
        //Redirige vers la page d'accueil
        this.redirect.gotoHome();
    }
    
    /**
     * Voit si on bien à faire à un admin est logué ou non
     * @returns {boolean} vrai ou faux
     */
    isAdmin() : boolean {
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
