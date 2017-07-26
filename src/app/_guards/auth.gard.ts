// _guard/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

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
