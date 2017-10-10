import { Vehicule } from '../vehicule/vehicule';
import { Feedback } from '../feedback/feedback';

export class Reservation {
    constructor(
        public id?: number,
        public vehicule?: Vehicule,
        public feedback?: Feedback,
        public email?: string,
        public nom?: string,
        public prenom?: string,
        public date_debut?: string,
        public date_fin?: string,
        public statut?: string,
        public is_feedbackable?: boolean,
        public date_creation?: string,
        public date_der_maj?: string,
     
    ) { }
}
