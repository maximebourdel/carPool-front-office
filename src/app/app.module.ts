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
import { VehiculeService }                  from './vehicule/vehicule.service';

import { ReservationListComponent }         from './reservation/reservation-list.component';
import { ReservationCreateComponent }       from './reservation/reservation-create.component';
import { ReservationService }               from './reservation/reservation.service';

import { ChartModule }                      from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { CalendarHeatmap } from 'angular2-calendar-heatmap';
import { MomentModule } from 'angular2-moment';

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
            ReservationListComponent,
            ReservationCreateComponent,
            DatePicker,
            CalendarHeatmap
  	],
	imports: [
	    BrowserModule,
	    FormsModule,
	    HttpModule,
	    AppRoutingModule,
            ReactiveFormsModule,
            ChartModule,
            MomentModule
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
            provide: HighchartsStatic,
            useFactory: highchartsFactory
        }
    ],
  	bootstrap: [AppComponent]
})
export class AppModule { } 

