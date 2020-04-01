import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CreateEvent } from '../create-form/create-form.component';
import { JoinEvent } from '../join-form/join-form.component';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private session: SessionService) { }

  ngOnInit(): void { }

  onCreate(ev: CreateEvent) {
    this.rejoin(ev.sessionId, ev.authToken);
  }

  onJoin(ev: JoinEvent) {
    this.rejoin(ev.sessionId, ev.authToken);
  }

  rejoin(sessionId: string, authToken: string) {
    this.session.init(sessionId, authToken);
    this.router.navigate(['/sessions', sessionId]);
  }

}
