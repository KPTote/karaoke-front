import { AfterViewInit, Component, ElementRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { AlertComponent } from "../../../components/alert/alert.component";
import { FilterComponent } from "../../../components/filter/filter.component";
import { LoaderComponent } from '../../../components/loader/loader.component';
import { Song } from '../../../interface/karaoke.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { currentListTableHeaders } from '../../data/current-list-headers';
import { SocketClientService } from '../../services/socket-client.service';

@Component({
  selector: 'app-current-list',
  standalone: true,
  imports: [CapitalizePipe, FilterComponent, AlertComponent, LoaderComponent],
  templateUrl: './current-list.component.html',
  styleUrl: './current-list.component.css'
})
export class CurrentListComponent implements OnInit, AfterViewInit {


  public tableHeaders = currentListTableHeaders;
  public activeClassCompleted = false;
  public songId = 0;
  public songList$: Song[] = [];
  public cloneSongList$: Song[] = [];
  public loading = true;
  public lastMessage: any;
  public messageAlert = 'No hay canciones agregadas a la lista.';


  private readonly markAsCompletedClassName = 'markAsCompleted';
  private readonly markAsDeletedClassName = 'markAsDeleted';
  private completedArr: number[] = [];
  private deletedArr: number[] = [];



  private elementRef = inject(ElementRef);
  private socketClientService = inject(SocketClientService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);




  ngOnInit(): void {
    this.getPlaylistFromResolver();
    this.getMessage();
    this.clonePlaylist();
    this.loading = false;
  }

  ngAfterViewInit(): void {
    this.getFromStorage();
  }

  private getPlaylistFromResolver() {
    this.songList$ = this.activatedRoute.snapshot.data['playlist'];
    this.songList$.sort((a, b) => a.numberOnList - b.numberOnList)
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
        }),
      )
      .subscribe({
        next: message => {

          const songExists = this.songList$.some(song => song.numberOnList === message.numberOnList);

          if (!songExists) {

            this.songList$.push(message);
            this.clonePlaylist();
          }


        },
        error: error => {
          console.log(error);
        }
      })

  };

  public markAsComplete(songId: number): void {
    this.accessToElement(songId, 'add', this.markAsCompletedClassName);
    this.addToStorage(songId, 'completed');
  };

  public markAsDelete(songId: number): void {
    this.accessToElement(songId, 'add', this.markAsDeletedClassName);
    this.addToStorage(songId, 'deleted');
  };

  public resetElement(songId: number): void {
    this.accessToElement(songId, 'remove');
    this.deleteFromStorage(songId);
  };


  private addToStorage(songId: number, action: string): void {

    if (action === 'completed') {
      if (this.completedArr.includes(songId)) return;
      const deletedIndex = this.deletedArr.indexOf(songId);
      if (deletedIndex !== -1) this.deletedArr.splice(deletedIndex, 1);
      this.completedArr.push(songId);
    }

    if (action === 'deleted') {
      if (this.deletedArr.includes(songId)) return;
      const completedIndex = this.completedArr.indexOf(songId);
      if (completedIndex !== -1) this.completedArr.splice(completedIndex, 1);
      this.deletedArr.push(songId);
    }

    localStorage.setItem('completed', JSON.stringify(this.completedArr));
    localStorage.setItem('deleted', JSON.stringify(this.deletedArr));



  };

  private deleteFromStorage(songId: number): void {

    const completedIndex = this.completedArr.indexOf(songId);
    const deletedIndex = this.deletedArr.indexOf(songId);

    if (completedIndex !== -1) {
      this.completedArr.splice(completedIndex, 1);
    }

    if (deletedIndex !== -1) {
      this.deletedArr.splice(deletedIndex, 1);
    }

    localStorage.setItem('completed', JSON.stringify(this.completedArr));
    localStorage.setItem('deleted', JSON.stringify(this.deletedArr));


  }


  private accessToElement(songId: number, action: string, className?: string,): void {

    for (let index = 1; index <= 3; index++) {
      const element = this.elementRef.nativeElement.querySelector(`#id-element-${songId}-column-${index}`);

      element.classList?.remove(this.markAsDeletedClassName, this.markAsCompletedClassName);
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

    if (filter.length <= 0) {
      this.messageAlert = 'No se encontraron coincidencias.'
    }

    this.songList$ = filter;


  }



  public updateSong(songId: Song) {
    this.router.navigate(['/private/dashboard/edit-song'], {
      queryParams: songId
    })
  }

  private getFromStorage(): void {

    if (this.songList$.length <= 0) return;

    const completed: number[] = JSON.parse(localStorage.getItem('completed') ?? '[]');
    const deleted: number[] = JSON.parse(localStorage.getItem('deleted') ?? '[]');

    if (completed && completed.length > 0) this.addMarksOnSongs('completed', completed);
    if (deleted && deleted.length > 0) this.addMarksOnSongs('deleted', deleted);

  }

  private addMarksOnSongs(action: string, arr: number[]): void {

    for (const element of arr) {
      const existOnSongList = this.songList$.some(song => song.numberOnList === element);

      if (existOnSongList) {

        if (action === 'completed') this.markAsComplete(element);
        if (action === 'deleted') this.markAsDelete(element);

      }

    }

  }

}
