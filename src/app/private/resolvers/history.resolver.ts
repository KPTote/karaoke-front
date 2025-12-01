import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { PrivateApiService } from '../services/private-api.service';

export const historyResolver: ResolveFn<any> = (route, state) => {
  const privateApi = inject(PrivateApiService);

    return privateApi.getPlaylist().pipe(
      map(song => {
        return song.map(e => {
          const {date, time} = parseDate(e.date);
          return {
            userName: e.userName ?? '',
            songName: e.songName ?? '',
            artistName: e.artistName ?? '',
            numberOnList: e.numberOnList ?? '',
            date: date ?? '',
            time: time ?? ''
          }
        })
      }),
      catchError(error => {
        return of([])
      })
    )
};

const parseDate = (date: string) => {
    const parse = new Date(date).toLocaleString() ?? '';

    const splitDate = parse.split(',');

    return {
      date: splitDate[0] ?? '',
      time: splitDate[1] ?? ''
    }

}
