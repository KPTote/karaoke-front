import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { Song } from '../../../interface/karaoke.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { currentListTableHeaders } from '../../data/current-list-headers';
import { PrivateService } from '../../services/private.service';

@Component({
  selector: 'app-current-list',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './current-list.component.html',
  styleUrl: './current-list.component.css'
})
export class CurrentListComponent implements OnInit {

  public tableHeaders = currentListTableHeaders;
  public songList: Song[] = [];
  public activeClassCompleted = false;
  public songId = 0;
  private readonly markAsCompletedClassName = 'markAsCompleted';
  private readonly markAsDeletedClassName = 'markAsDeleted';

  private privateService = inject(PrivateService);
  private elementRef = inject(ElementRef);


  ngOnInit(): void {
    this.getSongList();
  }

  private getSongList(): void {
    this.songList = this.privateService.getSongList();
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

}
