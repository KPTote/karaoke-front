import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddSongRequest } from '../../private/interfaces/private.interface';
import { AddSongResponse } from '../interfaces/public.interface';

@Injectable({
  providedIn: 'root'
})
export class PublicApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  public addNewSong(song: AddSongRequest): Observable<AddSongResponse>{
      return this.http.post<AddSongResponse>(`${this.baseUrl}/add-song`, song);
  }

    public getSongCount(): Observable<number>{
      return this.http.get<number>(`${this.baseUrl}/get-song-count`);
  }

}
