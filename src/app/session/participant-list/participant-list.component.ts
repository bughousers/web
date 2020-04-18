import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../networking/session';

import {SessionService, Users} from '../session.service';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnDestroy, OnInit {

  @Input() owner = false;

  users$: Observable<Users>;
  participants: readonly string[] = [];
  private subscription?: Subscription;

  onClick(userId: string) {
    if (this.participants.includes(userId)) {
      this.session.changeParticipants(this.participants.filter(id => id !== userId));
    } else {
      this.session.changeParticipants([userId, ...this.participants]);
    }
  }

  entries(users: Readonly<Record<string, User>> | null): [string, User][] {
    if (users) {
      return Object.entries(users);
    } else {
      return [];
    }
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
