// file: server-socket.service.ts
import {Injectable} from '@angular/core';
import {QueueingSubject} from 'queueing-subject';
import {Observable} from 'rxjs/Observable';
import websocketConnect from 'rxjs-websockets';
import 'rxjs/add/operator/share';
import {Observer} from 'rxjs/Observer';

@Injectable()
export class WebsocketClient {
  connection: any = new WebSocket('ws://localhost:8080');
  onOpen$: Observable<any>;
  onError$: Observable<any>;
  onMessage$: Observable<any>;

  constructor() {

    this.onOpen$ = new Observable((observer: Observer<any>) => {
      this.connection.onopen = () => {
        observer.next(null);
      };
    });

    this.onError$ = new Observable((observer: Observer<any>) => {
      this.connection.onerror = () => {
        observer.next(null);
      };
    });

    this.onMessage$ = new Observable((observer: Observer<any>) => {
      this.connection.onmessage = (e: any) => {
        observer.next(e);
      };
    });
  }
  send$() {
    return this.connection.send.bind(this);
  }
}
