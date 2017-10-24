import {Component, OnInit, OnDestroy }  from '@angular/core';
import { FormBuilder, FormGroup }       from '@angular/forms';
//Pour gérer les redirections
import { Router }                       from '@angular/router'; 
//Import des Classes Reservation
import { Reservation }                  from '../reservation';
import { ReservationService }           from '../reservation.service';

import { Subscription }                 from 'rxjs';

/**
 * Cette page représente la liste des créneaux pour les véhicules 
 * sur une période donnée
 */
@Component({
    selector: 'reservation-creneaux',
    templateUrl: 'reservation-creneaux.component.html',
    providers: [ ReservationService ]
})
export class ReservationCreneauxComponent implements OnInit, OnDestroy {
    
    /**
     * Représente la liste des réservations associées au créneau
     */
    listReservation: Reservation[];
    /**
     * Représente la date du jour
     */
    dateToday= new Date();
    /**
     * Représente le mois en cours
     */
    mm = this.dateToday.getUTCMonth()+1; //Janvier = 0 !
    /**
     * Représente l'année en cours
     */
    yyyy = this.dateToday.getFullYear();
    /**
     * Pour le busy (attente)
     */
    busy: Subscription;
    /**
     * Représente le formulaire de les dates (mois et années)
     */
    datesForm: FormGroup;
    /**
     * Tableau représentant la liste des créneaux par années et mois
     */
    listCreneauxByAnneeMois: any;
    /**
     * Tableau représentant les jours de la semaine
     */
    listJours: any;
    
    /**
     * Constructeur initialisant le ReservationCreneaux component
     */
    constructor (
        private reservationService: ReservationService,
        private formBuilder: FormBuilder,
        private router: Router,
    ) { 
        this.createForm();
    }
    
    /**
     * Initialise le formulaire et active son suivi interractif
     */
    createForm() {
        this.datesForm = this.formBuilder.group({
          annee: this.yyyy,
          mois: this.mm
        });
        //Active la mise à jour auto du formulaire
        let nameControl = this.datesForm.valueChanges;
        nameControl.forEach(
            () => this.getCreneauxByAnneeMois()
        ); 
    }
    
    /**
     * Définit la couleur d'une cellule en fonction de sa valeur
     * @param value Valeur de la cellule
     * @return {string} Couleur pour la cellule
     */
    color(value: number){
        if (value == 0) {
            return "lightgreen";
        } else if (value >= 1) {
            return "salmon";
        }
    }
    
    /**
     * Actions appelées après le constructeur à l'initialisation du Component
     */
    ngOnInit() {
        //Met la navbar nav-creneaux en active
        document.getElementById('nav-creneaux').setAttribute('class','active');
        //Initialise le formulaire
        this.createForm();
        //Affiche les créneaux
        this.getCreneauxByAnneeMois();
    }
    
    /**
     * Action appelée à la destruction (fin du cycle de vie) du Component
     */
    ngOnDestroy() {
        //Met la navbar nav-creneaux en inactive
        document.getElementById('nav-creneaux').removeAttribute('class');
    }
    
    /**
     * Initialise la variable listCreneauxByAnneeMois 
     * (il y a autant de Array[33] dans Array [] que de véhicules)
     * Array[33] représente un mois sur 31 jours
     * @example
     *  Array [ Array[33], Array[33], Array[33], Array[33], Array[33]
     *  , Array[33], Array[33], Array[33], Array[33], Array[33] ]
     * Exemple de Array[33] :
     * [
     *      0:[EK 666 EY]
     *      1:[Nantes]
     *      2:(2) [0, Disponible]
     *      3:(2) [0, Disponible]
     *      ...
     *      32:(2) [0, Disponible]
     *	]
     **/
    getCreneauxByAnneeMois(): void {   
        this.datesForm.value;      
        if (!this.datesForm.value) { return; }
        this.busy =  this.reservationService
            .getCreneauxByAnneeMois(this.datesForm.value)
            .subscribe(
                (apiListCreneauxByAnneeMois) => {
                    //initialisations
                    this.listCreneauxByAnneeMois = new Array();
                    this.listJours = new Array();
                    
                    let cpt: number = 0;
                    let list: any[] = new Array();
                    
                    //récupération des immatriculations dans deux variables
                    // sert pour le cpt et detecter la derniere ligne
                    let apiListCreneauxByAnneeMoisLenght = apiListCreneauxByAnneeMois.length
                    //sert a detecter le changement d'immatriculation
                    let firstImmatriculation = apiListCreneauxByAnneeMois[0]['immatriculation'];
                    
                    //Stocke l'immatriculation précédente
                    let immatriculationPrec = firstImmatriculation;
                    //On stocke le premier elément de la liste
                    list.push([immatriculationPrec]);
                    list.push([apiListCreneauxByAnneeMois[0]['ville']]);
                    
                    for (let data of apiListCreneauxByAnneeMois ){
                        //On incrémente le compteur 
                        cpt++;
                        //changement de vehicule
                        if(immatriculationPrec != data.immatriculation ) {
                            immatriculationPrec = data.immatriculation;
                            this.listCreneauxByAnneeMois.push(list);
                            list = new Array();
                            list.push([data.immatriculation]);
                            list.push([data.ville]);
                            
                        //dernier element de la liste
                        }
                        //On insère le tooltip en elément 2 du tableau
                        let tooltip = data.nom == '' 
                            ? 'Disponible'  //pas de réservation pour ce créneau
                            : 'Réservé par ' + data.nom + ' ' + data.prenom;
                        //dans tous les cas on insere le boolean
                        list.push([data.is_reserve, tooltip ]);
                        
                        //Cas ou on arrive à la fin de la ligne
                        if (apiListCreneauxByAnneeMoisLenght == cpt) {
                            this.listCreneauxByAnneeMois.push(list);
                        }
                        //Si c'est la premiere immatriculation
                        if(data.immatriculation == firstImmatriculation ){
                            this.listJours.push(data.jour);
                        }
                        
                        console.log(this.listCreneauxByAnneeMois);
                    }
                }
            );
        ;
    }
    
    /**
     * Redirection vers la page de création d'une réservation
     */
    gotoCreate(): void {
        this.router.navigate(['reservation/new']);
    }
}
