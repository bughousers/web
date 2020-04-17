import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Ready} from '../home/home.component';
import {NetworkingService} from '../networking.service';

@Component({
  selector: 'app-create-form',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.css']
})
export class CreateFormComponent implements OnInit {

  @Output() create = new EventEmitter<Ready>();

  name = '';
  waiting = false;

  constructor(private net: NetworkingService) {
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.waiting = true;
    this.net.createSession(this.name)
      .then(res => this.create.emit(new Ready(res.sessionId, res.authToken)))
      .finally(() => this.waiting = false);
  }

}
