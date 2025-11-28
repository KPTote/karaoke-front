import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HistoryItem } from '../../../interface/karaoke.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { historyTableHeaders } from '../../data/history-headers';
import { PdfService } from '../../services/pdf.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CapitalizePipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {


  public tableHeaders = historyTableHeaders;
  public playlist: HistoryItem[] = [];

  private readonly pdfService = inject(PdfService);
  private readonly activatedRoute = inject(ActivatedRoute);


  public printPDF(): void{
    this.pdfService.generatePDF(this.tableHeaders, this.playlist);
  }

  ngOnInit(): void {
    this.playlist = this.activatedRoute.snapshot.data['playlist'];
    this.playlist.sort((a,b) => a.numberOnList - b.numberOnList);


  }

}
