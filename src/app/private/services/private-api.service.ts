import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddSongRequest, ClearPlaylistRes, EditSongRes, LoginResponse, PlaylistRes } from '../interfaces/private.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateApiService {

  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;



  public getPlaylist(): Observable<PlaylistRes[]> {
    return this.http.get<PlaylistRes[]>(`${this.baseUrl}/playlist`, {
      headers: this.token()
    });
  }

  public updateSong(song: AddSongRequest): Observable<EditSongRes> {
    return this.http.put<EditSongRes>(`${this.baseUrl}/edit-song`, song, {
      headers: this.token()
    })
  }

  public clearPlaylist(): Observable<ClearPlaylistRes> {
    return this.http.delete<ClearPlaylistRes>(`${this.baseUrl}/clear-playlist`, {
      headers: this.token()
    })
  };

  public auth(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, { email, password }, {
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
