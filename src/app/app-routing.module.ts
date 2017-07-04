import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
 
import { HomepageComponent }            from './homepage/homepage.component';
import { AuthenticationComponent }      from './authentication/authentication.component';
import { AuthGuard }                    from './_guards/auth.gard';

import { VehiculeListComponent }        from './vehicule/vehicule-list.component';

import { ReservationListComponent }     from './reservation/reservation-list.component';
import { ReservationCreateComponent }   from './reservation/reservation-create.component';

const routes: Routes = [
	{ path: '', component: HomepageComponent },
	{ path: 'login', component: AuthenticationComponent },

	//Pour les véhicules
	{ path: 'vehicule', component: VehiculeListComponent, canActivate: [AuthGuard] },
	
        //Pour les réservations
	{ path: 'reservation', component: ReservationListComponent, canActivate: [AuthGuard] }, 
        { path: 'reservation/new', component: ReservationCreateComponent, canActivate: [AuthGuard] },   

	{ path: '**', redirectTo: '' }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
