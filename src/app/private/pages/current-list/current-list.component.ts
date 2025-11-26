import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { AlertComponent } from "../../../components/alert/alert.component";
import { FilterComponent } from "../../../components/filter/filter.component";
import { Song } from '../../../interface/karaoke.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { currentListTableHeaders } from '../../data/current-list-headers';
import { PrivateService } from '../../services/private.service';
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
  private messageSubscription!: Subscription;

  private privateService = inject(PrivateService);
  private elementRef = inject(ElementRef);
  private socketClientService = inject(SocketClientService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);


  public songList$: Song[] = [];

  ngOnInit(): void {
    console.log(this.songList$.length);
    this.getPlaylistFromResolver();
    this.getMessage();
  }

  private getPlaylistFromResolver(){
    this.songList$ = this.activatedRoute.snapshot.data['playlist'];
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
    console.log(filterValue);
  }



  public updateSong(songId: Song){
    this.router.navigate(['/private/dashboard/edit-song'], {
      queryParams: songId
    })
  }

}
