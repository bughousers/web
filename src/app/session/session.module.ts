import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {SessionRoutingModule} from './session-routing.module';
import {SessionComponent} from './session.component';

@NgModule({
  declarations: [SessionComponent],
  imports: [
    CommonModule,
    SessionRoutingModule
  ]
})
export class SessionModule {
}
