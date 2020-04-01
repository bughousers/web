import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Session } from '../session/session';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css']
})
export class ParticipantListComponent implements OnDestroy, OnInit {

  @Input() session?: BehaviorSubject<Session>;
  @Input() owner = false;
  @Output() participants = new EventEmitter<number[]>();

  userIds: number[] = [];
  userNames: Map<number, string> = new Map();
  participating: Map<number, boolean> = new Map();
  dirty = false;
  private sub?: Subscription;

  constructor() { }

  ngOnInit() {
    this.sub = this.session?.subscribe({ next: this.next.bind(this) });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  next(session: Session) {
    this.userIds = Array.from(session.userNames.keys());
    this.userNames = session.userNames;
    this.participating = new Map(session.participants.map(n => [n, true]));
    this.dirty = false;
  }

  onClick(userId: number) {
    this.dirty = true;
    const old = this.participating.get(userId) ?? false;
    this.participating.set(userId, !old);
    this.participants.emit(
      Array.from(this.participating.entries()).filter(([_, b]) => b).map(([n, _]) => n)
    );
  }

}
