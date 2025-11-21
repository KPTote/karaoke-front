import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PlaylistRes } from '../interfaces/private.interface';

@Injectable({
  providedIn: 'root'
})
export class PrivateApiService {

  private readonly http = inject(HttpClient);

  public getPlaylist(): Observable<PlaylistRes[]> {
    return this.http.get<PlaylistRes[]>('http://localhost:3000/api/playlist');
  }
}
