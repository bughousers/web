import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home.component';

// TODO: Handle incorrect paths too
const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {
    path: 'sessions/:sid',
    loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
