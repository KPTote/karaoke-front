import { AsyncPipe } from '@angular/common';
import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { AlertComponent } from "../../../components/alert/alert.component";
import { FilterComponent } from "../../../components/filter/filter.component";
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { currentListTableHeaders } from '../../data/current-list-headers';
import { PrivateService } from '../../services/private.service';
import { SocketClientService } from '../../services/socket-client.service';

@Component({
  selector: 'app-current-list',
  standalone: true,
  imports: [CapitalizePipe, AsyncPipe, FilterComponent, AlertComponent],
  templateUrl: './current-list.component.html',
  styleUrl: './current-list.component.css'
})
export class CurrentListComponent implements OnInit {

  public tableHeaders = currentListTableHeaders;
  public activeClassCompleted = false;
  public songId = 0;
  private readonly markAsCompletedClassName = 'markAsCompleted';
  private readonly markAsDeletedClassName = 'markAsDeleted';

  private privateService = inject(PrivateService);
  private elementRef = inject(ElementRef);
  private socketClientService = inject(SocketClientService);

  public songList$ = this.privateService.watchChangesOnSongList();

  ngOnInit(): void {
    this.socketClientService.connectToWebSockets()
  }

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

}
