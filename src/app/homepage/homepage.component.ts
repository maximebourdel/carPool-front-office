import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html'
})
export class HomepageComponent implements OnInit, OnDestroy {

    ngOnInit(): void {
        document.getElementById('nav-home').setAttribute('class','active');
    }
       
    ngOnDestroy(): void {
        document.getElementById('nav-home').removeAttribute('class');
    }
    
    hasAuthToken() {
        return localStorage.getItem('token') !== null;
    }
    
}
