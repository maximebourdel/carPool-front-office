// _guard/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

//pour le décryptage du token
import { JwtHelper }                    from 'angular2-jwt';

/**
 * Cette classe vérifie qu'un utilisateur est bien logué
 */
@Injectable()
export class AuthGuard implements CanActivate {

        /**
         * Constructeur d'une vérification utilisateur
         */
	constructor(private authentication: AuthenticationService, private router: Router) {}

        /**
         * Voit il y a présence d'un token (voit si token expiré)
         * @param {ActivatedRouteSnapshot} route
         * @param {RouterStateSnapshot} state
         * @returns {boolean} vrai ou faux
         */
	canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
            if(this.authentication.loggedIn()) {
                return true;
            } else {
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                return false;
            }
	}
}

/**
 * Cette classe vérifie qu'un utilisateur est bien logué et admin
 */
@Injectable()
export class AuthAdminGuard implements CanActivate {

        /**
         * Constructeur d'une vérification Admin
         */
	constructor(
            private authentication: AuthenticationService
            , private router: Router
            , private jwtHelper: JwtHelper
        ) {}

        /**
         * Etape 1 Voit il y a présence d'un token (ne vérifie pas si token expiré)
         * @returns {boolean} vrai ou faux
         */
        hasAuthToken(): boolean {
            return localStorage.getItem('token') !== null;
        }

        /**
         * Etape 2 Voit si on bien à faire à un admin est logué ou non
         * @returns {boolean} vrai ou faux
         */
        isAdmin(): boolean {
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

        /**
         * Etape 3 si retourne vrai, c'est ok (voit si token expiré)
         * @param {ActivatedRouteSnapshot} route
         * @param {RouterStateSnapshot} state
         * @returns {boolean} vrai ou faux
         */
	canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
            if(this.authentication.loggedIn() && this.isAdmin()) {
                return true;
            } else {
                this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
                return false;
            }
	}
}
