import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { environment } from '../../environments/environment';

interface Created {
  sessionId: string;
  userId: number;
  authToken: string;
}

export class CreateEvent {
  constructor(public sessionId: string, public authToken: string) { }
}

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  @Output() create = new EventEmitter<CreateEvent>();

  name = '';
  waiting = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void { }

  onSubmit() {
    this.waiting = true;
    const component = this;
    this.http.post<Created>(`${environment.apiUrl}/v1/sessions`, JSON.stringify({
      ownerName: this.name
    })).subscribe({
      next(resp) {
        component.create.emit(new CreateEvent(resp.sessionId, resp.authToken));
        component.waiting = false;
      },
      error(err) { component.waiting = false; }
    });
  }

}
