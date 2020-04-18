import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Ready} from '../home/home.component';
import {NetworkingService} from '../networking/networking.service';

@Component({
  selector: 'app-join-form',
  templateUrl: './join-form.component.html',
  styleUrls: ['./join-form.component.css']
})
export class JoinFormComponent implements OnInit {

  @Output() join = new EventEmitter<Ready>();

  sessionId = '';
  name = '';
  waiting = false;

  constructor(private net: NetworkingService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.waiting = true;
    this.net.join(this.sessionId, this.name)
      .subscribe({
        next: res => {
          this.join.emit(new Ready(this.sessionId, res.authToken));
          this.waiting = false;
        },
        error: err => this.waiting = false
      });
  }

}
