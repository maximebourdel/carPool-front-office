import { Component, OnInit, OnDestroy }    from '@angular/core';

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
export class VehiculeListComponent implements OnInit, OnDestroy {
    
    errorMessage: string;
    listVehicule: Vehicule[];
    listSearchVehicule: Observable<Vehicule[]>; 
    shortName: string;

    constructor (
        private vehiculeService: VehiculeService,
        private router: Router,
    ) {}

    ngOnInit() { 
        //Met la navbar nav-vehicule en active
        document.getElementById('nav-vehicule').setAttribute('class','active');
        this.getListVehicule(); 
    }

    ngOnDestroy() { 
        //Met la navbar nav-vehicule en inactive
        document.getElementById('nav-vehicule').removeAttribute('class');
    }
    
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
