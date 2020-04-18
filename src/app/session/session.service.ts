import {OnDestroy} from '@angular/core';
import {Observable, Subject, Subscription} from 'rxjs';

import {Connected, Event} from '../networking/networking';
import {NetworkingService} from '../networking/networking.service';
import {Session, User} from '../networking/session';

function freeze<T>(t: T): Readonly<T> {
  const frozen = Object.freeze(t);
  Object.keys(frozen).forEach(key => freeze((frozen as any)[key]));
  return frozen;
}

export class SessionService implements OnDestroy {

  private settings = {sessionId: '', authToken: ''};
  private _userId = '';
  private users = new Subject<Readonly<Record<string, User>>>();
  private participants = new Subject<readonly string[]>();

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
    this.update(res.session);
    this.subscription = this.net.sse(this.settings).subscribe(this.onEvent.bind(this));
  }

  onEvent(ev: Event) {
    this.update(ev.session);
  }

  update(session: Session) {
    this.users.next(freeze(session.users));
    this.participants.next(freeze(session.participants));
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
