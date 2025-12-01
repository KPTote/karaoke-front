import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WSocketRes } from '../interfaces/private.interface';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService {

  private messageSubject = new Subject<WSocketRes>();
  public message$: Observable<WSocketRes> = this.messageSubject.asObservable();

  public connectToWebSockets() {

    const baseUrl = environment.apiWs;

    const socket = new WebSocket(`wss://${baseUrl}/ws`);

    socket.onmessage = (event) => {
      this.messageSubject.next(JSON.parse(event.data));
    };

    socket.onclose = (event) => {
      console.log('Connection closed');
      setTimeout(() => {
        console.log('retrying to connect');
        this.connectToWebSockets();
      }, 1500);

    };

    socket.onopen = (event) => {
      console.log('Connected');
    };

  }

}
