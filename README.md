## NGX Datatable with Websocket and RxJs

Update ngx datatable with rxjs stream data. Data is delivered by json-server with Websocket implementation 

```
npm start
```
will ng serve with nodemon json-server

Server will update json data with 1500ms interval

Angular Client App will listen to Websocket Event Type USER_ADDED

```typescript

this.getMostRecentUsers$.subscribe((data) => {
  this.rows = data;
});

this.ws.onMessage$
.map((x) => JSON.parse(x.data))
.filter((x: any) => x.type === 'USER_ADDED')
.switchMap(() => this.getMostRecentUsers$)
.subscribe((users: any) => {
  this.rows = [...users];
});

```

<img src="https://raw.githubusercontent.com/tlimpanont/ngx-datable-ws-rxjs/master/demo.gif" alt="demo animation">
