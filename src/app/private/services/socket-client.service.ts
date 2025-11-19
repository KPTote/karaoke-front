import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocketClientService {

  public connectToWebSockets() {

    const socket = new WebSocket('ws://localhost:3000/ws');

    socket.onmessage = (event) => {
      console.log(event.data); //onSongAdd
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
