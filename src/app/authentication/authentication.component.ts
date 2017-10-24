import { Component }                            from '@angular/core';

//Gestion des formulaires
import { FormGroup, FormBuilder , Validators}   from '@angular/forms';

import { Router, ActivatedRoute }               from '@angular/router';
 
import { AuthenticationService }                from './authentication.service';
//Pour le Busy (attente)
import { Subscription }                         from 'rxjs';

/**
 * Représente la page d'authentification
 */
@Component({
  selector: 'app-authentication',
  providers: [AuthenticationService],
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
	
    /**
     * Représente la page qu'on avait avant redirection vers login 
     * (permet d'y revenir après bonne authentification)
     */
    returnUrl: string;
    /**
     * Variable représentant le formulaire d'authentification
     */
    loginForm: FormGroup;
    /**
     * Pour le busy (attente)
     */
    busy: Subscription;
    /**
     * Message d'erreur du formulaire
     */
    error: string = '';
    
    /**
     * Constructeur de la pgae d'authentification
     */
    constructor( 
        private authenticationService: AuthenticationService, 
        private router: Router,
        private route: ActivatedRoute,
        private fb: FormBuilder,
    ) {
        //Initialisation du formulaire
        this.createForm();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    /**
     * Fonction renvoyant au serveur les informations entrées par l'utilisateur (login/mdp)
     */
    onSubmit(): void {
        this.busy = this.authenticationService
                .authenticate(this.loginForm.value)
                .subscribe(
            data => { 
                localStorage.setItem('token', data.token);
                this.router.navigate([this.returnUrl]);
            },
            () => this.error = 'Mauvais login ou mot de passe'
        );
    }
    
    /**
     * Initialise les éléments du formulaire
     */
    createForm(): void {
        this.loginForm = this.fb.group({ 
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });    
    }

}
