import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AlertComponent } from "../../../components/alert/alert.component";
import { FilterComponent } from "../../../components/filter/filter.component";
import { Song } from '../../../interface/karaoke.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { currentListTableHeaders } from '../../data/current-list-headers';
import { SocketClientService } from '../../services/socket-client.service';

@Component({
  selector: 'app-current-list',
  standalone: true,
  imports: [CapitalizePipe, FilterComponent, AlertComponent],
  templateUrl: './current-list.component.html',
  styleUrl: './current-list.component.css'
})
export class CurrentListComponent implements OnInit {

  public tableHeaders = currentListTableHeaders;
  public activeClassCompleted = false;
  public songId = 0;
  private readonly markAsCompletedClassName = 'markAsCompleted';
  private readonly markAsDeletedClassName = 'markAsDeleted';
  public lastMessage: any;
  public messageAlert = 'No hay canciones agregadas a la lista.';

  private elementRef = inject(ElementRef);
  private socketClientService = inject(SocketClientService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


  public songList$: Song[] = [];
  public cloneSongList$: Song[] = [];

  ngOnInit(): void {
    this.getPlaylistFromResolver();
    this.getMessage();
    this.clonePlaylist();
  }

  private getPlaylistFromResolver() {
    this.songList$ = this.activatedRoute.snapshot.data['playlist'];
    this.songList$.sort((a,b) => a.numberOnList - b.numberOnList)
  }

  private clonePlaylist(): void {
    this.cloneSongList$ = [...this.songList$];
  }


  private getMessage(): void {

    this.socketClientService.connectToWebSockets();
    this.socketClientService.message$
      .pipe(
        map(e => {
          return {
            userName: e.payload?.userName ?? '',
            songName: e.payload?.songName ?? '',
            artistName: e.payload?.artistName ?? '',
            numberOnList: e.payload?.numberOnList ?? ''
          }
        })
      )
      .subscribe({
        next: message => {
          this.songList$.push(message)
          this.clonePlaylist();
          console.log(message);
        },
        error: error => {
          console.log(error);
        }
      })

  };

  public markAsComplete(songId: number): void {
    this.accessToElement(songId, 'add', this.markAsCompletedClassName);
  };

  public markAsDelete(songId: number): void {
    this.accessToElement(songId, 'add', this.markAsDeletedClassName);
  };

  public resetElement(songId: number): void {
    this.accessToElement(songId, 'remove')
  };

  private accessToElement(songId: number, action: string, className?: string,): void {

    for (let index = 1; index <= 3; index++) {
      const element = this.elementRef.nativeElement.querySelector(`#id-element-${songId}-column-${index}`);

      element.classList.remove(this.markAsDeletedClassName, this.markAsCompletedClassName);
      if (action === 'add') element.classList.add(className);


    };
  };

  public onFilterChanged(filterValue: string): void {


    if (!filterValue) {
      this.messageAlert = 'No hay canciones agregadas a la lista.';
      this.songList$ = this.cloneSongList$;
      return
    }
    const filter = this.cloneSongList$.filter(e => e.userName.toLowerCase().includes(filterValue.toLowerCase()))
    filter.sort((a, b) => a.numberOnList - b.numberOnList);

    if(filter.length <= 0){
      this.messageAlert = 'No se encontraron coincidencias.'
    }

    this.songList$ = filter;


  }



  public updateSong(songId: Song) {
    this.router.navigate(['/private/dashboard/edit-song'], {
      queryParams: songId
    })
  }

}
