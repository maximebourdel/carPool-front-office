import { Component, OnInit, OnDestroy }     from '@angular/core';
//Pour gérer les redirections
import { Router, ActivatedRoute, Params }   from '@angular/router';
 //Import des Classes Véhicule
import { Vehicule }                         from './vehicule';
import { VehiculeService }                  from './vehicule.service';
//Classe utilisée pour la redirection
import { Redirect }                         from '../tools/redirect';

/**
 * Initialise la vue pour le détail d'un véhicule
 */
@Component({
    selector: 'vehicule-detail',
    templateUrl: 'vehicule-detail.component.html',
    providers: [ VehiculeService ]
})
export class VehiculeDetailComponent implements OnInit, OnDestroy {
    
    /**
     * Message d'erreur
     */
    errorMessage: string;
    /**
     * Véhicule retourné par le service
     */
    vehicule: Vehicule;
    /**
     * Variable pour les redirections sur une autre page
     */
    redirect: Redirect;
    
    /**
     * Constructeur initialisant le VehiculeDetail
     */
    constructor (
        private vehiculeService: VehiculeService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        //Attribution du routeur à la classe de redirection
        this.redirect = new Redirect(this.router);
    }

    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit() {
        document.getElementById('nav-reservation-admin').setAttribute('class','active');
        this.getVehicule();
    }
    
    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy() {
        document.getElementById('nav-reservation-admin').removeAttribute('class');
        this.getVehicule();
    }
    
    /**
     * Initialise la variable de véhicule via le service
     */
    getVehicule() : void {
        this.route.params
            .switchMap((params: Params) => this.vehiculeService.getVehicule(params['id']))
            .subscribe(vehicule => this.vehicule = vehicule);
    }
}
