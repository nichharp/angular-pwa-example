import { Component } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {fromEvent, of, merge, Observable} from 'rxjs';
import {mapTo} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa-playground';

  isConnected$ = new Observable<boolean>();

  // availableUpdate: boolean = false;

  constructor(workerUpdates: SwUpdate) {
    workerUpdates.available.subscribe(event => {
      console.log(event);
      if (confirm('New version available. Load New Version? \nVersion: ' + event.current.hash + ' \n\n=> \n\n' +
        'Version: ' + event.available.hash)) {
        workerUpdates.activateUpdate().then(() => {
          console.log('getting new update');
          setTimeout(() => {
            document.location.reload();
          } , 1000);
        });
      }
    });
    this.isConnected$ = merge(
      of(navigator.onLine),
      fromEvent(window, 'online').pipe(mapTo(true)),
      fromEvent(window, 'offline').pipe(mapTo(false))
    );
    navigator.serviceWorker.ready.then(function (swRegistration) {
      return swRegistration.sync.register('startUpSync');
    });
  }

}
