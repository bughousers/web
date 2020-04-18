import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../networking/session';

import {SessionService, UserMap} from '../session.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnDestroy, OnInit {

  @Input() owner = false;

  users$: Observable<UserMap>;
  participants: readonly string[] = [];
  private subscription?: Subscription;

  onClick(userId: string) {
    if (this.participants.includes(userId)) {
      this.session.changeParticipants(this.participants.filter(id => id !== userId));
    } else {
      this.session.changeParticipants([userId, ...this.participants]);
    }
  }

  entries<K, V>(map: ReadonlyMap<K, V> | null): [K, V][] {
    return Array.from(map?.entries() ?? []);
  }

  constructor(private session: SessionService) {
    this.users$ = session.users$;
  }

  ngOnInit() {
    this.subscription = this.session.participants$.subscribe(p => this.participants = p);
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
