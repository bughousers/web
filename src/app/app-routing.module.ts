import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SessionComponent } from './session/session.component';

// TODO: Handle incorrect paths too
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'sessions/:sid', component: SessionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
