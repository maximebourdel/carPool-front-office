import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
 
import { HomepageComponent }            from './homepage/homepage.component';
import { AuthenticationComponent }      from './authentication/authentication.component';
import { AuthGuard, AuthAdminGuard }    from './_guards/auth.gard';

import { VehiculeListComponent }        from './vehicule/vehicule-list.component';
import { VehiculeDetailComponent }      from './vehicule/vehicule-detail.component';

import { ReservationCreneauxComponent } from './reservation/creneaux/reservation-creneaux.component';
import { ReservationMyListComponent }   from './reservation/reservation-my-list.component';
import { ReservationCreateComponent }   from './reservation/reservation-create.component';
import { ReservationValidateComponent } from './reservation/reservation-validate.component';

import { FeedbackCreateComponent }      from './feedback/feedback-create.component';

const routes: Routes = [
    { path: '', component: HomepageComponent },
    { path: 'login', component: AuthenticationComponent},

    //Pour les véhicules
    { path: 'vehicule', component: VehiculeListComponent, canActivate: [AuthAdminGuard] },
    { path: 'vehicule/:id', component: VehiculeDetailComponent , canActivate: [AuthAdminGuard] },

    //Pour les réservations
    { path: 'reservation/myList', component: ReservationMyListComponent, canActivate: [AuthGuard] },
    { path: 'reservation/new', component: ReservationCreateComponent, canActivate: [AuthGuard] },
    { path: 'reservation/creneaux', component: ReservationCreneauxComponent, canActivate: [AuthGuard] },
    { path: 'reservation/administration', component: ReservationValidateComponent, canActivate: [AuthAdminGuard] },   

    //Pour les feedbacks
    { path: 'reservation/feedback/:id', component: FeedbackCreateComponent, canActivate: [AuthGuard] },   

    //Else
    { path: '**', redirectTo: '' }
];
@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
