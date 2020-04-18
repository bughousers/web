import {OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';

import {Connected, Event} from '../networking/networking';
import {NetworkingService} from '../networking/networking.service';
import {Session, User} from '../networking/session';

function freeze(session: Session): Readonly<Session> {
  Object.freeze(session.participants);
  Object.freeze(session.users);
  Object.keys(session.users).forEach(id => Object.freeze(session.users[id]));
  Object.freeze(session.game);
  return Object.freeze(session);
}

export type Users = Readonly<Record<string, Readonly<User>>>;

export class SessionService implements OnDestroy {

  private settings = {sessionId: '', authToken: ''};
  private _userId = '';
  private users = new BehaviorSubject<Users>({});
  private participants = new BehaviorSubject<readonly string[]>([]);

  private subscription?: Subscription;

  get sessionId(): string {
    return this.settings.sessionId;
  }

  get userId(): string {
    return this._userId;
  }

  get users$(): Observable<Readonly<Record<string, User>>> {
    return this.users.asObservable();
  }

  get participants$(): Observable<readonly string[]> {
    return this.participants.asObservable();
  }

  connect(sessionId: string, authToken: string) {
    this.settings = {sessionId, authToken};
    this.net.connect(this.settings).subscribe(this.onConnect.bind(this));
  }

  onConnect(res: Connected) {
    this._userId = res.userId;
    this.update(freeze(res.session));
    this.subscription = this.net.sse(this.settings).subscribe(this.onEvent.bind(this));
  }

  onEvent(ev: Event) {
    this.update(freeze(ev.session));
  }

  update(session: Session) {
    this.users.next(session.users);
    this.participants.next(session.participants);
  }

  changeParticipants(participants: string[]) {
    this.net.changeParticipants(this.settings, participants).subscribe();
  }

  constructor(private net: NetworkingService) {
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
