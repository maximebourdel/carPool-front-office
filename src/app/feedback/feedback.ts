import { Reservation } from '../reservation/reservation';

export class Feedback {
    constructor(
        public id?: number,
        public reservation?: Reservation,
        public kilometres?: number,
        public commentaires?: string,
    ) { }
}
