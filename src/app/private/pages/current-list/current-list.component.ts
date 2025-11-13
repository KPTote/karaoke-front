import { Component, inject, OnInit } from '@angular/core';
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

  private privateService = inject(PrivateService);


  ngOnInit(): void {
    this.getSongList();
  }

  private getSongList(): void {
    this.songList = this.privateService.getSongList();

  }

}
