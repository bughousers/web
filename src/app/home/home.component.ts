import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Session } from '../session';
import { SessionService } from '../session.service';

interface Created {
  sessionId: string;
  userId: number;
  authToken: string;
}

interface Joined {
  userId: number;
  userName: string;
  authToken: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ownerName = '';
  sessionId = '';
  userName = '';
  waiting = false;

  constructor(private http: HttpClient, private router: Router, private session: SessionService) { }

  ngOnInit(): void { }

  onSubmit(action: 'create' | 'join') {
    this.waiting = true;
    switch (action) {
      case 'create':
        this.http.post<Created>(`${environment.apiUrl}/v1/sessions`, JSON.stringify({
          ownerName: this.ownerName
        })).subscribe(
          resp => {
            this.waiting = false;
            this.session.load(
              new Session(resp.sessionId, resp.userId, this.ownerName, resp.authToken)
            );
            this.router.navigate(['/sessions', resp.sessionId]);
          },
          () => {
            this.waiting = false;
          });
        break;
      case 'join':
        this.http.post<Joined>(
          `${environment.apiUrl}/v1/sessions/${this.sessionId}`,
          JSON.stringify({ userName: this.userName })
        ).subscribe(
          resp => {
            this.waiting = false;
            this.session.load(
              new Session(this.sessionId, resp.userId, resp.userName, resp.authToken)
            );
            this.router.navigate(['/sessions', this.sessionId]);
          },
          () => {
            this.waiting = false;
          });
        break;
    }
  }

}
