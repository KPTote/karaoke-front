import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddSongRequest, LoginResponse, PlaylistRes } from '../interfaces/private.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateApiService {

  private readonly http = inject(HttpClient);


  public getPlaylist(): Observable<PlaylistRes[]> {
    return this.http.get<PlaylistRes[]>('http://localhost:3000/api/playlist', {
      headers: this.token()
    });
  }

  public updateSong(song: AddSongRequest): Observable<any> {
    return this.http.put<any>('http://localhost:3000/api/edit-song', song, {
      headers: this.token()
    })
  }

  public clearPlaylist(): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/api/clear-playlist', {
      headers: this.token()
    })
  };

  public auth(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('http://localhost:3000/api/auth/login', { email, password }, {
      headers: this.token()
    });
  }

  private token(): { [key: string]: string } {
    const token = sessionStorage.getItem('token') ?? '';
    return {
      'Authorization': `Bearer ${token}`
    }
  };
}
