import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../environments/environment';

export interface Settings {
  sessionId: string;
  authToken: string;
}

export interface Created {
  sessionId: string;
  authToken: string;
}

export interface Joined {
  authToken: string;
}

interface Connected {
  userId: number;
  session: Session;
}

export interface Session {
  users: Record<string, User>;
  participants: number[];
  game: GameState;
}

export interface User {
  name: string;
  score: number;
}

export type GameState = GameStateStarting | GameStateStarted | GameStateEnded;

export interface GameStateStarting {
  state: 'starting';
}

export interface GameStateStarted {
  state: 'started';
  data: {
    id: number;
    game: Game;
  };
}

export interface GameStateEnded {
  state: 'ended';
  data: {
    id: number;
  };
}

export interface Game {
  activeParticipants: [[number, number], [number, number]];
  remainingTime: [[Duration, Duration], [Duration, Duration]];
  board: [string, string];
  pool: number[][];
}

export interface Duration {
  secs: number;
  nanos: number;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  constructor(private http: HttpClient) {
  }

  createSession(ownerName: string): Promise<Created> {
    return this.http.post<Created>(`${environment.apiUrl}/v1/sessions`, JSON.stringify({
      ownerName
    })).toPromise();
  }

  joinSession(sessionId: string, userName: string): Promise<Joined> {
    return this.http.post<Joined>(
      `${environment.apiUrl}/v1/sessions/${sessionId}`,
      JSON.stringify({userName})
    ).toPromise();
  }

  connectSession(settings: Settings): Promise<Connected> {
    return this.http.post<Connected>(
      `${environment.apiUrl}/v1/sessions/${settings.sessionId}`,
      JSON.stringify({authToken: settings.authToken})
    ).toPromise();
  }

  async deployPiece(settings: Settings, piece: string, pos: string): Promise<void> {
    await this.http.post(
      `${environment.apiUrl}/v1/sessions/${settings.sessionId}/games/_/board`,
      JSON.stringify({
        type: 'deploy',
        authToken: settings.authToken,
        piece, pos
      }),
      {responseType: 'text'}
    ).toPromise();
  }

  async movePiece(settings: Settings, move: string): Promise<void> {
    await this.http.post(
      `${environment.apiUrl}/v1/sessions/${settings.sessionId}/games/_/board`,
      JSON.stringify({
        type: 'move',
        authToken: settings.authToken,
        change: move
      }),
      {responseType: 'text'}
    ).toPromise();
  }

  async promotePiece(settings: Settings, move: string, upgradeTo: string): Promise<void> {
    await this.http.post(
      `${environment.apiUrl}/v1/sessions/${settings.sessionId}/games/_/board`,
      JSON.stringify({
        type: 'promote',
        authToken: settings.authToken,
        change: move,
        upgradeTo
      }),
      {responseType: 'text'}
    ).toPromise();
  }

}
