import { Injectable } from '@angular/core';

import { Session } from './session';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  session?: Session;

  constructor() { }
}
