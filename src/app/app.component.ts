import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'real-estate-front-end';
  isAdmin = false;

  constructor(
    private router: Router
  ){    
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {        
        this.isAdmin = this.router.url.indexOf('admin') !== -1 ? true : false
      }
    });
  }
}
