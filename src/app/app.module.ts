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
import { AuthGuard }                        from './_guards/auth.gard';
import { AuthenticationService }            from './authentication/authentication.service';

import { VehiculeListComponent }            from './vehicule/vehicule-list.component';
import { VehiculeDetailComponent }          from './vehicule/vehicule-detail.component';
import { VehiculeService }                  from './vehicule/vehicule.service';

import { ReservationListComponent }         from './reservation/reservation-list.component';
import { ReservationMyListComponent }       from './reservation/reservation-my-list.component';
import { ReservationCreateComponent }       from './reservation/reservation-create.component';
import { ReservationValidateComponent }     from './reservation/reservation-validate.component';
import { ReservationCreneauxComponent }     from './reservation/creneaux/reservation-creneaux.component';

import { ReservationService }               from './reservation/reservation.service';

import { FlashMessagesModule }              from 'angular2-flash-messages';

import { MomentModule }                     from 'angular2-moment';

import { JwtHelper }                        from 'angular2-jwt';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';

declare var require : any;

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
    return new AuthHttp( new AuthConfig({}), http, options);
}

export function highchartsFactory() {
    const hc = require('highcharts/highstock');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}

@NgModule({
  	declarations: [
            AppComponent,
            HomepageComponent,
            AuthenticationComponent,
            VehiculeListComponent,
            VehiculeDetailComponent,
            ReservationListComponent,
            ReservationMyListComponent,
            ReservationCreateComponent,
            ReservationValidateComponent,
            ReservationCreneauxComponent,
            DatePicker,
  	],
	imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    AppRoutingModule,
            ReactiveFormsModule,
            MomentModule,
            FlashMessagesModule
    ],
    providers: [
        {
            provide: AuthHttp,
            useFactory: authHttpServiceFactory,
            deps: [ Http, RequestOptions ]
        }, 
        AuthGuard, 
        AuthenticationService,
        VehiculeService,
        ReservationService,
        {
                provide: LocationStrategy
                , useClass: HashLocationStrategy
        },
        JwtHelper
    ],
  	bootstrap: [AppComponent]
})
export class AppModule { } 

