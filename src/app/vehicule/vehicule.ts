export class Vehicule {
    constructor(
        public id: number,
        public immatriculation: string,
        public date_premiere_immatriculation: string,
        public date_arrivee_vehicule_bd: string,
        public type_acquisition: string,
        public nom_responsable: string,
        public marque: string,
        public derniere_revision: number,
     
    ) { }
}
