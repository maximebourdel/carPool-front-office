import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
 
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html'
})
export class AuthenticationComponent {
	
    returnUrl: string;
    loginForm: FormGroup;
    error: string = '';
 
    constructor(
        private formBuilder: FormBuilder, 
        private authenticationService: AuthenticationService, 
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.loginForm = formBuilder.group({
                'username': ['', Validators.required],
                'password': ['', Validators.required]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
	onSubmit() {
            this.authenticationService
                    .authenticate(this.loginForm.value)
                    .subscribe(
                data => { 
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('email', data.user_values.email);
                    localStorage.setItem('nom', data.user_values.nom);
                    localStorage.setItem('prenom', data.user_values.prenom);
                    this.router.navigate([this.returnUrl]);
                },
                () => this.error = 'Mauvais login ou mot de passe'
            );
	}

}
