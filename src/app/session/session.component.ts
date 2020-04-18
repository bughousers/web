import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';

import {getCookie} from '../cookies';
import {Connected, Event} from '../networking/networking';
import {NetworkingService} from '../networking/networking.service';
import {Session} from '../networking/session';
import {SessionService} from './session.service';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css'],
  providers: [SessionService]
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
    this.net.connect(this.settings).subscribe(res => this.onConnect(res));
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
    this.subscription = this.net.sse(this.settings).subscribe(ev => this.onEvent(ev));
  }

  onEvent(ev: Event) {
    console.log(ev);
    switch (ev.type) {
      default:
        console.log(ev);
        this.update(ev.session);
        break;
    }
  }

  update(session: Session) {
    this.session$.next(session);
  }

  onParticipantsChange(participants: number[]) {
    this.net.changeParticipants(this.settings, participants);
  }

}
