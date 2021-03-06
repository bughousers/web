import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ignoreElements} from 'rxjs/operators';

import {environment} from '../../environments/environment';
import {Connected, Created, Event, Joined} from './networking';

interface Settings {
  sessionId: string;
  authToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  constructor(private http: HttpClient) {
  }

  create(ownerName: string): Observable<Created> {
    return this.http.post<Created>(`${environment.apiUrl}/v1/sessions`, JSON.stringify({
      ownerName
    }));
  }

  join(sessionId: string, userName: string): Observable<Joined> {
    return this.http.post<Joined>(`${environment.apiUrl}/v1/sessions/${sessionId}`, JSON.stringify({
      userName
    }));
  }

  connect(settings: Settings): Observable<Connected> {
    return this.http.post<Connected>(`${environment.apiUrl}/v1/sessions/${settings.sessionId}`,
      JSON.stringify({authToken: settings.authToken})
    );
  }

  sse(settings: Settings): Observable<Event> {
    const observable = new Observable<Event>(subscriber => {
      const eventSource =
        new EventSource(`${environment.apiUrl}/v1/sessions/${settings.sessionId}/sse`);
      eventSource.addEventListener('message', ev => subscriber.next(JSON.parse(ev.data)));
      eventSource.addEventListener('error', ev => subscriber.error(ev));

      return () => {
        eventSource.close();
      };
    });
    return observable;
  }

  changeParticipants(settings: Settings, participants: string[]): Observable<never> {
    return this.http.post(`${environment.apiUrl}/v1/sessions/${settings.sessionId}/participants`,
      JSON.stringify({
        authToken: settings.authToken,
        participants
      }),
      {responseType: 'text'}
    ).pipe(ignoreElements());
  }

  deployPiece(settings: Settings, piece: string, pos: string): Observable<never> {
    return this.http.post(`${environment.apiUrl}/v1/sessions/${settings.sessionId}/games/_/board`,
      JSON.stringify({
        type: 'deploy',
        authToken: settings.authToken,
        piece, pos
      }),
      {responseType: 'text'}
    ).pipe(ignoreElements());
  }

  movePiece(settings: Settings, move: string): Observable<never> {
    return this.http.post(`${environment.apiUrl}/v1/sessions/${settings.sessionId}/games/_/board`,
      JSON.stringify({
        type: 'move',
        authToken: settings.authToken,
        change: move
      }),
      {responseType: 'text'}
    ).pipe(ignoreElements());
  }

  promotePiece(settings: Settings, move: string, upgradeTo: string): Observable<never> {
    return this.http.post(`${environment.apiUrl}/v1/sessions/${settings.sessionId}/games/_/board`,
      JSON.stringify({
        type: 'promote',
        authToken: settings.authToken,
        change: move,
        upgradeTo
      }),
      {responseType: 'text'}
    ).pipe(ignoreElements());
  }

}
