import { Component, inject } from '@angular/core';
import { HistoryItem } from '../../../interface/karaoke.interface';
import fakeHistory from '../../data/fake-history.json';
import { historyTableHeaders } from '../../data/history-headers';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  public tableHeaders = historyTableHeaders;
  public fakeData: HistoryItem[] = fakeHistory;
  private readonly pdfService = inject(PdfService);

  public printPDF(): void{
    this.pdfService.generatePDF(this.tableHeaders, this.fakeData);
  }

}
