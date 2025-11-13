import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from '../../interface/karaoke.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  private songsList: Song[] = [];

  constructor() { }


  public addSong(song: Song): void {
    this.songsList = this.getSongList();
    this.songsList.push(song);
    localStorage.setItem('songList', JSON.stringify(this.songsList))
  }

  public getSongList(): Song[] {
    const localSongList = JSON.parse(localStorage.getItem('songList') ?? '[]');
    return localSongList;
  }
//TODO ESTO DEBERIA DE CAMBIAR CUANDO YA SE AGREGUE EL WEBSOCKET PARA ESTAR ESCUCHANDO
  public watchChangesOnSongList(): Observable<Song[]> {
    return new Observable<Song[]>((observer) => {
      // Emitir valor inicial
      observer.next(JSON.parse(localStorage.getItem('songList') ?? '[]'));

      // Escuchar cambios en localStorage
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'songList') {
          observer.next(JSON.parse(event.newValue ?? '[]'));
        }
      };

      window.addEventListener('storage', handleStorageChange);

      // Cleanup
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    });
  }

}
