import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { PrivateApiService } from '../services/private-api.service';

export const currentListResolver: ResolveFn<any> = (route, state) => {

  const privateApi = inject(PrivateApiService);

  return privateApi.getPlaylist().pipe(
    map(song => {
      return song.map(e => {
        return {
          userName: e.userName ?? '',
          songName: e.songName ?? '',
          artistName: e.artistName ?? '',
          numberOnList: e.numberOnList ?? ''
        }
      })
    }),
    catchError(error => {
      return of({
        data: error
      })
    })
  )

};
