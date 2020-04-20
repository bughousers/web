import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {GameComponent} from './game/game.component';
import {ParticipantListComponent} from './participant-list/participant-list.component';
import {SessionComponent} from './session.component';

const routes: Routes = [
  {
    path: '',
    component: SessionComponent,
    children: [
      {path: '', component: ParticipantListComponent},
      {path: 'games/:gid', component: GameComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule {
}
