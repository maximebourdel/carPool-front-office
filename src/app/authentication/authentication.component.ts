import { Component }                            from '@angular/core';

//Gestion des formulaires
import { FormGroup, FormBuilder , Validators}   from '@angular/forms';

import { Router, ActivatedRoute }               from '@angular/router';
 
import { AuthenticationService }                from './authentication.service';
//Pour le Busy
import { Subscription }                         from 'rxjs';

@Component({
  selector: 'app-authentication',
  providers: [AuthenticationService],
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
	
    returnUrl: string;
    loginForm: FormGroup;
    busy: Subscription;
    error: string = '';
    
 
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
 
    onSubmit() {
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
    
    createForm() {
        //initialise les éléments du formulaire
        this.loginForm = this.fb.group({ 
            'username': ['', Validators.required],
            'password': ['', Validators.required]

        });    
    }

}
