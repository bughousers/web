import {Component, EventEmitter, OnInit, Output} from '@angular/core';

import {Ready} from '../home/home.component';
import {NetworkingService} from '../networking/networking.service';

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
    this.net.create(this.name)
      .subscribe({
        next: res => {
          this.create.emit(new Ready(res.sessionId, res.authToken));
          this.waiting = false;
        },
        error: err => this.waiting = false
      });
  }

}
