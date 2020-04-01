import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';

interface Joined {
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private sessionId?: string;
  private userId?: string;
  private authToken?: string;
  private evSrc?: EventSource;

  constructor(private http: HttpClient) { }

  init(sessionId: string, authToken: string) {
    this.deinit();
    this.sessionId = sessionId;
    this.authToken = authToken;
    const service = this;
    this.http
      .post<Joined>(`${environment.apiUrl}/v1/sessions/${sessionId}`, JSON.stringify({ authToken }))
      .subscribe({
        next(resp) {
          service.userId = String(resp.userId);
        }
      });
    this.evSrc = new EventSource(`${environment.apiUrl}/v1/sessions/${sessionId}/sse`);
  }

  deinit() {
    this.sessionId = undefined;
    this.authToken = undefined;
    this.evSrc?.close();
    this.evSrc = undefined;
  }

}
