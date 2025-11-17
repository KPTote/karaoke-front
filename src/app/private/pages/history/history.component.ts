import { Component } from '@angular/core';
import { FilterComponent } from "../../../components/filter/filter.component";
import { HistoryItem } from '../../../interface/karaoke.interface';
import fakeHistory from '../../data/fake-history.json';
import { historyTableHeaders } from '../../data/history-headers';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [FilterComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  public tableHeaders = historyTableHeaders;
  public fakeData: HistoryItem[] = fakeHistory;

}
