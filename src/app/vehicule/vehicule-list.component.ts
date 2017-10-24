import { Component, OnInit, OnDestroy } from '@angular/core';

import { Router }                       from '@angular/router';
 
import { Vehicule }                     from './vehicule';
import { VehiculeService }              from './vehicule.service';

/**
 * Ce composant représente la page listant tous les véhicules.
 */
@Component({
    selector: 'vehicule-list',
    templateUrl: 'vehicule-list.component.html',
    providers: [ VehiculeService ]
})
export class VehiculeListComponent implements OnInit, OnDestroy {
    
    /**
     * Représente le message d'erreur
     */
    errorMessage: string;
    /**
     * Représente la liste des véhicules
     */
    listVehicule: Vehicule[];

    /**
     * Constructeur initialisant un VehiculeList component 
     */
    constructor (
        private vehiculeService: VehiculeService,
        private router: Router,
    ) {}

    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit() { 
        //Met la navbar nav-vehicule en active
        document.getElementById('nav-reservation-admin').setAttribute('class','active');
        this.getListVehicule(); 
    }

    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy() { 
        //Met la navbar nav-vehicule en inactive
        document.getElementById('nav-reservation-admin').removeAttribute('class');
    }

    /**
     * Initialise la variable listVehicule via le service
     */
    getListVehicule(): void {
        this.vehiculeService.getListVehicule()
            .subscribe(
                listVehicule => this.listVehicule = listVehicule,
                error =>  this.errorMessage = <any>error,
            );
    }

    /**
     * Redirection vers la page de détail du véhicule (via son id)
     * @param vehicule Représente le véhicule sélectionné
     */
    goToDetail(vehicule: Vehicule): void {
        this.router.navigate(['vehicule/'+ vehicule.id]);
    }

}
