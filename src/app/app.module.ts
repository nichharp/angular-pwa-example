import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { QuotesComponent } from './quotes/quotes.component';
import {DataService} from './data.service';
import {HttpClientModule} from '@angular/common/http';
import { CounterComponent } from './counter/counter.component';
import { BackgroundSyncComponent } from './background-sync/background-sync.component';
import {FormsModule} from '@angular/forms';
import {DexieHandlerService, DexieService} from './dexie-handler.service';

@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    CounterComponent,
    BackgroundSyncComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('sw-master.js', { enabled: environment.production }),

    // runs in serve mode \|/
    // ServiceWorkerModule.register('sw-sync.js')
  ],
  providers: [
    DataService,
    DexieHandlerService,
    DexieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
