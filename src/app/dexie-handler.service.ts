import { Injectable } from '@angular/core';
import Dexie from 'dexie';


export interface MessageWithID {
  msg: string;
}

export class DexieService extends Dexie {
  constructor() {
    super('messages');
    this.version(1).stores({
      messages: '++id',
    });
  }
}


@Injectable({
  providedIn: 'root'
})
export class DexieHandlerService {
  table: Dexie.Table<MessageWithID, number>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table('messages');
  }

  add(data) {
    // console.log(data);
    return this.table.add({msg: data});
  }

  delete(data) {
    console.log('deleting: ', data);
    return this.table.delete(data);
  }

  getAll() {
    return this.table.toArray();
  }







  // tmp(){
  //   window.addEventListener('sync', function (event) {
  //     console.log('added sync listener');
  //     event.waitUntil(sendPostToServer());
  //   });
  // }
  //
  //
  //
  // async function sendPostToServer() {
  //   console.log('back online. Begin Sync...');
  //
  //   const db = new Dexie("Messages");
  //   db.open();
  //   db.version(1).stores({
  //     messages: '++id',
  //   });
  //   let dbArray = db.table("Messages").toArray();
  //   console.log(dbArray);
  //   for (arrayVal of dbArray) {
  //     console.log(arrayVal);
  //     let payload = JSON.stringify(arrayVal);
  //     let method = 'POST';
  //     let headers = {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json; charset=utf-8'
  //     };
  //     fetch('http://127.0.0.1:3000/messages', {
  //       headers: headers,
  //       method: method,
  //       body: payload
  //     }).then(function (response) {
  //       console.log('server response', response);
  //       if (response.status < 400) {
  //         console.log('success');
  //         const db = new Dexie("Messages");
  //         db.open();
  //         db.version(1).stores({
  //           messages: '++id',
  //         });
  //         db.table("Messages").delete(payload.id).then(res =>{console.log(res)});
  //       }
  //     }).catch(function(error) {
  //       console.log('failed to send to server: ', error);
  //       throw error;
  //     })
  //   }
  //   // console.log(array);
  // }





}

