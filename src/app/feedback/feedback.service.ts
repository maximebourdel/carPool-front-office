import { Injectable }   from '@angular/core';
import { Response }     from '@angular/http';
import { AuthHttp }     from 'angular2-jwt';

import { Feedback }     from './feedback';
import { Observable }   from 'rxjs/Observable';

import { environment }  from '../../environments/environment';

//pour le décryptage du token
import { JwtHelper }    from 'angular2-jwt';


@Injectable()
export class FeedbackService {
 
    baseUrl: string = 'http://' + environment.API_PATH;
       
    constructor (
        private jwtHelper: JwtHelper
        , private authHttp: AuthHttp
    ) {}
            
    

    createFeedback(feedback: Feedback): Observable<Feedback> {
        
        let url = this.baseUrl + 'auth/feedbacks';
        
        console.log(feedback);
        
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
