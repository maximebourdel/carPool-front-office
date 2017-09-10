// _guard/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

//pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';

@Injectable()
export class AuthGuard implements CanActivate {

	constructor(private authentication: AuthenticationService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
		if(this.authentication.loggedIn()) {
			return true;
		} else {
                    this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                    return false;
		}
	}
}

@Injectable()
export class AuthAdminGuard implements CanActivate {

	constructor(
            private authentication: AuthenticationService
            , private router: Router
            , private jwtHelper: JwtHelper
        ) {}

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

	canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) {
            if(this.authentication.loggedIn() && this.isAdmin()) {
                return true;
            } else {
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                return false;
            }
	}
}