import {Component, OnInit} from '@angular/core';
import {DataService} from '../data.service';
import {Sendto} from '../sendto';
import {DexieHandlerService} from '../dexie-handler.service';


@Component({
  selector: 'app-background-sync',
  templateUrl: './background-sync.component.html',
  styleUrls: ['./background-sync.component.scss']
})
export class BackgroundSyncComponent implements OnInit {

  index: number;

  error = false;

  errorData;

  model = new Sendto(null);

  submitted = false;

  constructor(
    private dataService: DataService,
    private dexieHandlerService: DexieHandlerService
  ) {
  }

  ngOnInit() {
  }

  sendOff() {

    this.dataService.postTo(this.model.msg).subscribe(
      res => {
        this.submitted = true;
        this.error = false;
        console.log('post was successful', res);
      },
      error1 => {
        this.submitted = true;
        this.error = true;
        console.log('there has been an error sending your msg', error1, JSON.stringify(error1));
        this.errorData = JSON.stringify(error1);


        this.dexieHandlerService
          .add(this.model.msg)
          .then(res => {

            console.log('added to DB. Res: ' + res);
            this.index = res;
            console.log('index', this.index);

            // get the db contents
            this.dexieHandlerService.getAll().then(res => {
              console.log('1) After adding array: ', res);
            });

            navigator.serviceWorker.ready.then(function (swRegistration) {
              return swRegistration.sync.register('POSTErrorSync');
            });

          });

      });

  }

  attemptToDelete() {
    if (typeof this.index === 'number') {
      this.dexieHandlerService.delete(this.index).then(() => {
        console.log('deleted from DB', this.index);
      });
    } else {
      console.log('index does not exist');
    }
  }

}
