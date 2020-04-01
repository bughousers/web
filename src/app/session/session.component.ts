import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { getCookie } from '../cookies';
import { Session } from './session';

interface Connected {
  userId: number;
  session: any;
}

interface Message {
  causedBy: number;
  type: MessageType;
  session: any;
}

type MessageType =
  'gameEnded'
  | 'gameStarted'
  | 'joined'
  | 'participantsChanged'
  | 'periodic'
  | 'pieceDeployed'
  | 'pieceMoved'
  | 'piecePromoted';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnDestroy, OnInit {
  sessionId = '';
  userId = -1;
  authToken = '';
  session = new Session();
  src?: EventSource;
  sub?: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const sessionId = getCookie('sessionId');
    const authToken = getCookie('authToken');
    console.log(sessionId);
    console.log(authToken);
    this.sessionId = sessionId ?? '';
    this.authToken = authToken ?? '';
    this.http.post<Connected>(
      `${environment.apiUrl}/v1/sessions/${sessionId}`, JSON.stringify({ authToken })
    ).subscribe({
      next: this.onConnect.bind(this),
      error(err) { }
    });
  }

  ngOnDestroy() {
    this.src?.close();
    this.sub?.unsubscribe();
  }

  onConnect(resp: Connected) {
    this.userId = resp.userId;
    this.session = Session.parse(resp.session);
    this.src = new EventSource(`${environment.apiUrl}/v1/sessions/${this.sessionId}/sse`);
    this.sub = fromEvent<MessageEvent>(this.src, 'message')
      .pipe(map(ev => JSON.parse(ev.data)))
      .subscribe({
        next: this.onMessage.bind(this)
      });
  }

  onMessage(msg: Message) {
    console.log(msg);
    switch (msg.type) {
      default:
        this.session = Session.parse(msg.session);
        console.log(this.session);
        break;
    }
  }

}
