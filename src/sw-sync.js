(function () {
  'use strict';
  importScripts('/dexie.min.js');


  self.addEventListener('install', function (event) {
    console.log('SW Installed', event);
  });

  self.addEventListener('activate', function (event) {
    console.log('SW Activated', event);
  });


  self.addEventListener('fetch', function (event) {
    console.log('i caught something', event);
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          if (response) {
            return response;
          }
          /* BUG: https://stackoverflow.com/questions/48463483/what-causes-a-failed-to-execute-fetch-on-serviceworkerglobalscope-only-if */
          if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') {
            return fetch(event.request);
          }

        })
    )
  });


  self.addEventListener('load', function (event) {
    console.log('loaded', event);
  });


  // sync is a call that triggers when the client (desktop/mobile) has connection to the internet
  self.addEventListener('sync', function (event) {
    console.log('I heard a sync event. Sending Posts to server', event);
    // document.getElementById('sync').innerHTML = 'sync';

    event.waitUntil(sendPostsToServer()
      .then(res => {
        console.log(res);
      })
      .catch(e => {
        console.log(e)
      })
    );
  });


  // function that get's the msgs stored in the indexedDB and sends them to the server
  async function sendPostsToServer() {
    console.log('started sendPosts');
    // start up DB
    const db = new Dexie("messages");
    db.version(1).stores({
      messages: '++id',
    });
    db.open();


    // get contents of DB
    let dbArray;
    db.table("messages").toArray().then(res => {
      console.log('dbArray', res);
      dbArray = res;

      console.log('length of array', dbArray.length);

      if (dbArray.length === 0) {
        console.log('indexedDB is empty');
        return;
      }


      // set up Request

      let payload = "";
      // console.log('payload', payload);
      let method = 'POST';
      let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
      };

      for (let i = 0; i < dbArray.length; i++) {
        console.log(i, 'array value', dbArray[i]);
        const tmp = {
          msg: dbArray[i].msg
        };
        if (i===dbArray.length-1) {
          payload += JSON.stringify(tmp);
        } else {
          payload += JSON.stringify(tmp) + ',\n';
        }
      }

      if (dbArray.length !==1 ){
        payload = '[\n' + payload + '\n]';
      }


      console.log(payload);
      // send request
      fetch('http://127.0.0.1:3000/messages',
        {
          headers: headers,
          method: method,
          body: payload
        })

      // when we have a response from the server
        .then(function (response) {
          console.log('server response', response);
          if (response.status < 400) {
            console.log('success');

            db.table("messages").clear()
              .then(res => console.log(res))
              .catch(error => console.log(error));

          }
        })

        // if error, give us a log
        .catch(function (error) {
          console.log('failed to send to server: ', error);
          throw error;
        });

    });
  }


  self.addEventListener('push', function (event) {
    console.log('caught a push event', event);
  });


  // Works on firefox (doesn't work on chrome)
  function updateOnlineStatus(event) {
    if (navigator.onLine) {
      // handle online status
      // re-try api calls
      console.log('device is now online');
      console.log('Sending Posts to Server');
      // alert('youre back online');
      event.waitUntil(sendPostsToServer()
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log(e)
        })
      );
    } else {
      // handle offline status
      console.log('device is now offline');
    }
  }


  self.addEventListener('online', function (event) {
    updateOnlineStatus(event)
  });
  self.addEventListener('offline', function (event) {
    updateOnlineStatus(event)
  });
  console.log(
    'self.addEventListener(\'online\', updateOnlineStatus);\n' +
    'self.addEventListener(\'offline\', updateOnlineStatus); added'
  );


}());
