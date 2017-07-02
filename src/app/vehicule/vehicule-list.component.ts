import { Component, OnInit }    from '@angular/core';

import { Router }               from '@angular/router';
 
import { Vehicule }             from './vehicule';
import { VehiculeService }      from './vehicule.service';

import { Observable }           from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: 'vehicule-list',
    templateUrl: 'vehicule-list.component.html',
    providers: [ VehiculeService ],
    styles: ['.error {color:red;}']
})
export class VehiculeListComponent implements OnInit {
    
    errorMessage: string;
    listVehicule: Vehicule[];
    listSearchVehicule: Observable<Vehicule[]>; 
    shortName: string;

    constructor (
        private vehiculeService: VehiculeService,
        private router: Router,
    ) {}

    ngOnInit() { this.getListVehicule(); }

    search (term: string) {
        this.listSearchVehicule = this.vehiculeService.getSearchVehicule(term);
    }

    getListVehicule() {
        
        this.vehiculeService.getListVehicule()
            .subscribe(
                listVehicule => this.listVehicule = listVehicule,
                error =>  this.errorMessage = <any>error,
            );
    }
}
