import {Component, OnInit} from '@angular/core';

import {getCookie} from '../cookies';
import {SessionService} from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
  providers: [SessionService]
})
export class SessionComponent implements OnInit {

  constructor(private session: SessionService) {
  }

  ngOnInit(): void {
    const sessionId = getCookie('sessionId') ?? '';
    const authToken = getCookie('authToken') ?? '';
    console.log(sessionId);
    console.log(authToken);
    this.session.connect(sessionId, authToken);
  }

  isOwner() {
    return this.session.userId === '0';
  }
}
