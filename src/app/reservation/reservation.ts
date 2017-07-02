import { Vehicule }                         from '../vehicule/vehicule';

export class Reservation {
    constructor(
        public id?: number,
        public vehicule?: Vehicule,
        public nom?: string,
        public prenom?: string,
        public date_debut?: string,
        public date_fin?: string,
     
    ) { }
}
