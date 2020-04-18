import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';

import {SessionService, Users} from '../session.service';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.css']
})
export class ScoreboardComponent implements OnInit {

  users$: Observable<Users>;
  participants$: Observable<readonly string[]>;

  constructor(private session: SessionService) {
    this.users$ = session.users$;
    this.participants$ = session.participants$;
  }

  ngOnInit() {
  }
}
