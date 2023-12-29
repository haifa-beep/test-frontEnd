import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventData } from 'ngx-event-calendar/lib/interface/event-data';


@Component({
  selector: 'app-technical-admin',
  templateUrl: './technical-admin.component.html',
  styleUrls: ['./technical-admin.component.scss']
})
export class TechnicalAdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  selectDay(event: any) {
    console.log(event);
  }
  
  logout() {
    localStorage.removeItem('userId')
    localStorage.removeItem('accessToken')
    this.router.navigate([''])
  }
}
