import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {take} from 'rxjs/operators';

import {environment} from '../environments/environment';

export interface Created {
  sessionId: string;
  authToken: string;
}

export interface Joined {
  authToken: string;
}

export class SessionSettings {
  constructor(public sessionId: string, public authToken: string) {
  }
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

  async deployPiece(settings: SessionSettings, piece: string, pos: string): Promise<void> {
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

  async movePiece(settings: SessionSettings, move: string): Promise<void> {
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

  async promotePiece(settings: SessionSettings, move: string, upgradeTo: string): Promise<void> {
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
