import { Component, OnInit }        from '@angular/core';
import { FormBuilder, FormGroup }   from '@angular/forms';
 
import { Reservation }              from '../reservation';
import { ReservationService }       from '../reservation.service';

@Component({
    selector: 'reservation-creneaux',
    templateUrl: 'reservation-creneaux.component.html',
    providers: [ ReservationService ]
})
export class ReservationCreneauxComponent implements OnInit {
    
    listReservation: Reservation[];
    dateToday= new Date();
    mm = this.dateToday.getUTCMonth()+1; //Janvier = 0!
    yyyy = this.dateToday.getFullYear();
    
    
    //variables pour listCreneauxByAnneeMois
    datesForm: FormGroup;
    listCreneauxByAnneeMois: any;
    listJours: any;
    

    constructor (
        private reservationService: ReservationService,
        private formBuilder: FormBuilder,
    ) { }

    createForm() {
        this.datesForm = this.formBuilder.group({
          annee: this.yyyy,
          mois: this.mm
        });
    }
    
    color($value:number){
        if ($value == 0){
            return "lightgreen";
        } else if ($value >= 1){
            return "salmon";
        }
    }
    
    ngOnInit() {
        //Met la navbar nav-liste-reservation en active
        this.createForm();
    }

    getCreneauxByAnneeMois(): void {   
        this.datesForm.value;      
        if (!this.datesForm.value) { return; }
        this.reservationService
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

                    let immatriculationPrec = firstImmatriculation;

                    list.push(immatriculationPrec);
                    for (let data of apiListCreneauxByAnneeMois ){
                        //on incrémente le compteur 
                        cpt++;
                        //changement de vehicule
                        if(immatriculationPrec != data.immatriculation ) {
                            immatriculationPrec = data.immatriculation;
                            this.listCreneauxByAnneeMois.push(list);
                            list = new Array();
                            list.push(data.immatriculation);
                            
                        //dernier element de la liste
                        } 
                        //dans tous les cas on insere le boolean
                        list.push(data.is_reserve);
                        
                        if (apiListCreneauxByAnneeMoisLenght == cpt) {
                            this.listCreneauxByAnneeMois.push(list);
                        }
                        if(data.immatriculation == firstImmatriculation ){
                            this.listJours.push(data.jour);
                        }
                        
                        
                        
                        
                    }
                }
            )
    }
}