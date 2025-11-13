import { Injectable } from '@angular/core';
import { Song } from '../../interface/karaoke.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateService {

  private songsList: Song[] = [];

  constructor() { }


  public addSong(song: Song): void{
    this.songsList = this.getSongList();
    this.songsList.push(song);
    localStorage.setItem('songList', JSON.stringify(this.songsList))
  }

  public getSongList(): Song[]{
    const localSongList = JSON.parse(localStorage.getItem('songList') ?? '[]');
    return localSongList;
  }

}
