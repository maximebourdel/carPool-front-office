import { Component, OnInit }        from '@angular/core';

import { ActivatedRoute, Params }   from '@angular/router';
 
import { Vehicule }                 from './vehicule';
import { VehiculeService }          from './vehicule.service';

@Component({
    selector: 'vehicule-detail',
    templateUrl: 'vehicule-detail.component.html',
    providers: [ VehiculeService ]
})
export class VehiculeDetailComponent implements OnInit {
    
    errorMessage: string;
    vehicule: Vehicule; 
    shortName: string;

    constructor (
        private vehiculeService: VehiculeService,
        private route: ActivatedRoute,
    ) {}

    ngOnInit() {
        this.route.params
            .switchMap((params: Params) => this.vehiculeService.getVehicule(params['id']))
            .subscribe(vehicule => this.vehicule = vehicule);
    }

}
