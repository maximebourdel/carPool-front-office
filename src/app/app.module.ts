import { BrowserModule }                    from '@angular/platform-browser';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { DatePicker }                       from './tools/date-picker.component';

import { AppComponent }                     from './app.component';
import { HomepageComponent }                from './homepage/homepage.component';
import { AuthenticationComponent }          from './authentication/authentication.component';

import { AppRoutingModule }                 from './app-routing.module';

import { AuthHttp, AuthConfig }             from 'angular2-jwt';
import { AuthGuard, AuthAdminGuard }        from './_guards/auth.gard';
import { AuthenticationService }            from './authentication/authentication.service';

import { VehiculeListComponent }            from './vehicule/vehicule-list.component';
import { VehiculeDetailComponent }          from './vehicule/vehicule-detail.component';
import { VehiculeService }                  from './vehicule/vehicule.service';

import { ReservationMyListComponent }       from './reservation/reservation-my-list.component';
import { ReservationCreateComponent }       from './reservation/reservation-create.component';
import { ReservationValidateComponent }     from './reservation/reservation-validate.component';
import { ReservationCreneauxComponent }     from './reservation/creneaux/reservation-creneaux.component';
import { ReservationService }               from './reservation/reservation.service';

import { FeedbackCreateComponent }          from './feedback/feedback-create.component';
import { FeedbackService }                  from './feedback/feedback.service';

import { FlashMessagesModule }              from 'angular2-flash-messages';

import { MomentModule }                     from 'angular2-moment';

import { JwtHelper }                        from 'angular2-jwt';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { NgxDatatableModule }               from '@swimlane/ngx-datatable';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BusyModule} from 'angular2-busy';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  	declarations: [
            AppComponent,
            HomepageComponent,
            AuthenticationComponent,
            VehiculeListComponent,
            VehiculeDetailComponent,
            ReservationMyListComponent,
            ReservationCreateComponent,
            ReservationValidateComponent,
            ReservationCreneauxComponent,
            FeedbackCreateComponent,
            DatePicker
  	],
	imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    AppRoutingModule,
            ReactiveFormsModule,
            MomentModule,
            FlashMessagesModule,
            NgxDatatableModule,
            BrowserAnimationsModule,
            BusyModule
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        },
        AuthAdminGuard,
        AuthGuard, 
        AuthenticationService,
        VehiculeService,
        ReservationService,
        FeedbackService,
        {
            provide: LocationStrategy
            , useClass: HashLocationStrategy
        },
        JwtHelper
    ],
  	bootstrap: [AppComponent]
})
export class AppModule { } 

