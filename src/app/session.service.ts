import { Injectable } from '@angular/core';

import { environment } from '../environments/environment';
import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session?: Session;
  eventSource?: EventSource;

  constructor() { }

  load(session: Session) {
    this.session = session;
    this.eventSource = new EventSource(`${environment.apiUrl}/v1/sessions/${this.session.id}/sse`);
  }

  unload() {
    this.session = undefined;
    this.eventSource?.close();
    this.eventSource = undefined;
  }
}
