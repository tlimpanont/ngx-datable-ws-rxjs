import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebsocketClient} from './websocket-client';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

  title = 'app';
  rows: any;
  columns = [
    {name: 'Name'},
    {name: 'About'},
    {name: 'Company'},
    {name: 'Phone'},
    {name: 'CreatedAt'},
  ];
  getMostRecentUsers$: Observable<any> = this.http.get('/users?_sort=createdAt&_order=desc');

  constructor(private http: HttpClient, private ws: WebsocketClient) {

  }

  ngOnInit(): void {
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
  }

  getRowHeight(row) {
    if (!row) {
      return 200
    }
    if (row.height === undefined) {
      return 200
    } return row.height;
  }

}
