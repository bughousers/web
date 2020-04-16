import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

import {getCookie} from '../cookies';
import {
  Connected,
  Message,
  NetworkingService,
  Session,
  User
} from '../networking.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnDestroy, OnInit {
  settings = {sessionId: '', authToken: ''};
  userId = '';

  session$ = new BehaviorSubject<Session>(
    {users: {}, participants: [], game: {state: 'starting'}}
  );

  private subscription?: Subscription;

  constructor(private net: NetworkingService) {
  }

  ngOnInit(): void {
    const sessionId = getCookie('sessionId') ?? '';
    const authToken = getCookie('authToken') ?? '';
    console.log(sessionId);
    console.log(authToken);
    this.settings = {sessionId, authToken};
    this.net.connectSession(this.settings).then(res => this.onConnect(res));
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  isOwner() {
    return this.userId === '0';
  }

  onConnect(res: Connected) {
    this.userId = res.userId;
    this.update(res.session);
    this.subscription = this.net.subscribe(this.settings).subscribe({
      next: msg => this.onMessage(msg)
    });
  }

  onMessage(msg: Message) {
    console.log(msg);
    switch (msg.type) {
      default:
        console.log(msg);
        this.update(msg.session);
        break;
    }
  }

  update(session: Session) {
    this.session$.next(session);
  }

  onParticipantsChange(participants: number[]) {
    this.net.changeParticipants(this.settings, participants).then(() => {
    });
  }

}
