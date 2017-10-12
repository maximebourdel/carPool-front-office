import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Feedback }     from './feedback';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';

@Injectable()
export class FeedbackService {
 
    baseUrl: string = 'http://' + environment.API_PATH;
       
    constructor (
        private authHttp: AuthHttp
    ) {}

    createFeedback(feedback: Feedback): Observable<Feedback> {
        
        let url = this.baseUrl + 'auth/feedback/create';
        
        return this.authHttp
            .post(url, JSON.stringify( feedback ) )
            .map( res => this.extractData(res) )
        ;
    } 

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }    
}
