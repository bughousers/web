import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

import { Session } from '../session/session';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnDestroy, OnInit {

  @Input() session?: BehaviorSubject<Session>;

  userNames: Map<number, string> = new Map();
  participants: number[] = [];
  score: Map<number, number> = new Map();
  private sub?: Subscription;

  constructor() { }

  ngOnInit() { this.sub = this.session?.subscribe({ next: this.next.bind(this) }); }

  ngOnDestroy() { this.sub?.unsubscribe(); }

  next(session: Session) {
    this.userNames = session.userNames;
    this.score = session.score;
    this.participants = session.participants
      .sort((a, b) => this.getScore(a) < this.getScore(b) ? -1 : 1);
  }

  getScore(userId: number): number { return this.score.get(userId) ?? 0; }

}
