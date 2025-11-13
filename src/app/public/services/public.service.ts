import { inject, Injectable } from '@angular/core';
import { Song } from '../../interface/karaoke.interface';
import { PrivateService } from '../../private/services/private.service';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  private canAccessToConfirmationForm = false;

  private privateService = inject(PrivateService);

  public accessToConfirmationForm(value: boolean): void {
    this.canAccessToConfirmationForm = value;
  }

  public haveAccessToConfirmation(): boolean {
    return this.canAccessToConfirmationForm;
  }

  public addSongToPlayList(song: Song): void {
    this.privateService.addSong(song);
  }

  // public getSongList(): Song[] {
  //   return this.privateService.getSongList();
  // }

  public getNumberOfSong(): number{
    const songList = this.privateService.getSongList();
    return songList.at(-1)?.id ?? 0;
  }

}
