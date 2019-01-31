###To start:
```
npm i
ng build --prod
http-server -p 8080 -c-1 dist/pwa-playground/
```

###Create a json-server ( https://www.npmjs.com/package/json-server )and run:
```
json-server --host 0.0.0.0 --watch db.json
```
####If you want it to work remotely you will need to go into data.service.ts and enter your IP address in the ServerUrl variable
