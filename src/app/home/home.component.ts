import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {setCookie} from '../cookies';

export class Ready {
  constructor(public sessionId: string, public authToken: string) {
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  onCreate(ev: Ready) {
    this.connect(ev.sessionId, ev.authToken);
  }

  onJoin(ev: Ready) {
    this.connect(ev.sessionId, ev.authToken);
  }

  connect(sessionId: string, authToken: string) {
    setCookie('sessionId', sessionId);
    setCookie('authToken', authToken);
    this.router.navigate(['/sessions', sessionId]);
  }

}
