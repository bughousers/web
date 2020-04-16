import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

export interface Created {
  sessionId: string;
  authToken: string;
}

export interface Joined {
  authToken: string;
}

@Injectable({
  providedIn: 'root'
})
export class NetworkingService {

  constructor(private http: HttpClient) { }

  createSession(ownerName: string): Observable<Created> {
    return this.http.post<Created>(`${environment.apiUrl}/v1/sessions`, JSON.stringify({
      ownerName
    }));
  }

  joinSession(sessionId: string, userName: string): Observable<Joined> {
    return this.http.post<Joined>(
      `${environment.apiUrl}/v1/sessions/${sessionId}`,
      JSON.stringify({ userName })
    );
  }

}
