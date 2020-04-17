import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CreateFormComponent} from './create-form/create-form.component';
import {HomeComponent} from './home/home.component';
import {JoinFormComponent} from './join-form/join-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    JoinFormComponent,
    CreateFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
