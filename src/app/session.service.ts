import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';
import { Game, Lobby, Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private session?: Session;

  public get lobby(): BehaviorSubject<Lobby> | undefined {
    return this.session?.lobby;
  }

  public get game(): BehaviorSubject<Game> | undefined {
    return this.session?.game;
  }

  private eventSource?: EventSource;

  constructor() { }

  load(session: Session) {
    this.session = session;
    this.eventSource = new EventSource(`${environment.apiUrl}/v1/sessions/${this.session.id}/sse`);
    this.eventSource.addEventListener('message', ev => {
      try {
        const data = JSON.parse(ev.data);
        const userNames = new Map(Object.entries(data.userNames));
        const score = new Map(Object.entries(data.score));
        this.session?.lobby?.next(
          new Lobby(
            userNames,
            score,
            data.participants.map((n: number) => n.toString()),
            data.gameId.toString()
          )
        );
        this.session?.game?.next(
          new Game(
            data.activeParticipants.map((p: number[]) => p.map(n => n.toString())),
            data.board
          )
        );
      } finally { }
    });
  }

  unload() {
    this.session = undefined;
    this.eventSource?.close();
    this.eventSource = undefined;
  }

}
