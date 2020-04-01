import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { setCookie } from '../cookies';
import { CreateEvent } from '../create-form/create-form.component';
import { JoinEvent } from '../join-form/join-form.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }

  onCreate(ev: CreateEvent) {
    this.connect(ev.sessionId, ev.authToken);
  }

  onJoin(ev: JoinEvent) {
    this.connect(ev.sessionId, ev.authToken);
  }

  connect(sessionId: string, authToken: string) {
    setCookie('sessionId', sessionId);
    setCookie('authToken', authToken);
    this.router.navigate(['/sessions', sessionId]);
  }

}
