import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sessionId = '';
  userName = '';

  constructor() { }

  ngOnInit(): void { }

  onSubmit(action: 'create' | 'join') {
    switch (action) {
      case 'create':
      case 'join':
    }
  }

}
