import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {WebsocketClient} from './websocket-client';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    HttpClientModule,
    NgbModule.forRoot()
  ],
  providers: [
    WebsocketClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
