import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../environments/environment';
import { Game, Lobby, Session } from './session';

class Event {
  game?: Game;
  board?: string[];
  constructor(public lobby: Lobby) { }
}

function parse(data: any): Event | undefined {
  try {
    const userNames = new Map(Object.entries(data.lobby.userNames));
    const score = new Map(Object.entries(data.lobby.score));
    const participants = data.lobby.participants;
    const gameId = data.lobby.gameId;
    const lobby = new Lobby(userNames, score, participants, gameId);
    const ev = new Event(lobby);
    if (data.hasOwnProperty('game') && data.hasOwnProperty('board')) {
      const activeParticipants = data.game.activeParticipants;
      const game = new Game(activeParticipants);
      ev.game = game;
      ev.board = data.game.board;
    }
    return ev;
  } catch (e) {
    return undefined;
  }
}

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

  public get board(): BehaviorSubject<string[]> | undefined {
    return this.session?.board;
  }

  private eventSource?: EventSource;

  constructor() { }

  load(session: Session) {
    this.session = session;
    this.eventSource = new EventSource(`${environment.apiUrl}/v1/sessions/${this.session.id}/sse`);
    this.eventSource.addEventListener('message', ev => {
      const data = JSON.parse(ev.data);
      const event = parse(data);
      if (event) {
        this.session?.lobby?.next(event.lobby);
        if (event.game && event.board) {
          this.session?.game?.next(event.game);
          this.session?.board?.next(event.board);
        }
      }
    });
  }

  unload() {
    this.session?.lobby?.complete();
    this.session?.game?.complete();
    this.session?.board?.complete();
    this.session = undefined;
    this.eventSource?.close();
    this.eventSource = undefined;
  }

}
