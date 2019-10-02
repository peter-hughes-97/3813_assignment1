import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import * as io from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket;
  constructor() { }

  initSocket(){
    this.socket = io(SERVER_URL);
  }

  updatelist() {
    this.socket.emit('updatelist','list please');
  }
  onNewlist(){
      let observable = new Observable(observer=>{
        this.socket.on('newlist', (data) => observer.next(data));
    });
    return observable;
  }

  prodcount(){
    this.socket.emit("prodcount","count please");
  }
  onProdcount(){
    let observable = new Observable(observer=>{
      this.socket.on('prodcount', (data) => observer.next(data));
    });
  return observable;
  }

  public send(message: string):void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<any> {
    let observable = new Observable(observer=>{
      this.socket.on('message', (data:string) => observer.next(data));
    });
    return observable;
  }
}
