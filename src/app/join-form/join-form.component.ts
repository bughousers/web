import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { environment } from '../../environments/environment';

interface Joined {
  authToken: string;
}

export class JoinEvent {
  constructor(public sessionId: string, public authToken: string) { }
}

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.css']
})
export class JoinFormComponent implements OnInit {

  @Output() join = new EventEmitter<JoinEvent>();

  sessionId = '';
  name = '';
  waiting = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit() {
    this.waiting = true;
    const component = this;
    this.http.post<Joined>(`${environment.apiUrl}/v1/sessions/${this.sessionId}`, JSON.stringify({
      userName: this.name
    })).subscribe({
      next(resp) {
        component.join.emit(new JoinEvent(component.sessionId, resp.authToken));
        component.waiting = false;
      },
      error(err) { component.waiting = false; }
    });
  }

}
