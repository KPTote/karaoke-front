import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSongRequest } from '../../private/interfaces/private.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  private readonly http = inject(HttpClient);

  public addNewSong(song: AddSongRequest): Observable<any>{
      return this.http.post<any>('http://localhost:3000/api/add-song', song);
  }

    public getSongCount(): Observable<any>{
      return this.http.get<any>('http://localhost:3000/api/get-song-count');
  }

}
