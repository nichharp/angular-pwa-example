import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {QuotesComponent} from './quotes/quotes.component';
import {CounterComponent} from './counter/counter.component';
import {BackgroundSyncComponent} from './background-sync/background-sync.component';

const routes: Routes = [
  {
    path: 'quote',
    component: QuotesComponent
  },
  {
    path: 'counter',
    component: CounterComponent
  },
  {
    path: 'background',
    component: BackgroundSyncComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
