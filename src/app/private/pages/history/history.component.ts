import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';
import { AlertComponent } from "../../../components/alert/alert.component";
import { LoaderComponent } from "../../../components/loader/loader.component";
import { HistoryItem } from '../../../interface/karaoke.interface';
import { CapitalizePipe } from '../../../pipes/capitalize.pipe';
import { historyTableHeaders } from '../../data/history-headers';
import { PdfService } from '../../services/pdf.service';
import { PrivateApiService } from '../../services/private-api.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CapitalizePipe, AlertComponent, LoaderComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {



  public tableHeaders = historyTableHeaders;
  public playlist: HistoryItem[] = [];
  public showAlert = false;
  public messageAlert = '';
  public typeAlert = '';
  public loading = true;

  private readonly pdfService = inject(PdfService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly privateApi = inject(PrivateApiService);


  public printPDF(): void {
    this.pdfService.generatePDF(this.tableHeaders, this.playlist);
  }

  ngOnInit(): void {
    this.getData();
  }

  public getData(): void {
    this.playlist = this.activatedRoute.snapshot.data['playlist'];


    if (this.playlist.length <= 0) {
      this.showAlert = true;
      this.messageAlert = 'No hay canciones agregadas a la lista.';
      this.typeAlert = 'warning';
      this.loading = false;
      return;
    }


    this.playlist.sort((a, b) => a.numberOnList - b.numberOnList);

    this.loading = false;
  }

  clearHistory() {

    this.loading = true;

    this.privateApi.clearPlaylist()
      .subscribe({
        next: res => {
          this.checkHistory();
        },
        error: error => {
          console.log(error);
          this.showAlert = true;
          this.loading = false;
          this.messageAlert = `Error al eliminar el historial.`;
          this.typeAlert = 'error';
        }
      })

  }

  checkHistory() {

    this.privateApi.getPlaylist()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe({
        next: res => {
          console.log(res)

          if (res.length <= 0) {
            this.playlist = [];
            this.showAlert = true;
            this.messageAlert = 'Historial eliminado correctamente.';
            this.typeAlert = 'success';
          }


        },
        error: error => {
          console.log(error);
          this.showAlert = true;
          this.messageAlert = `Error al eliminar el historial.`;
          this.typeAlert = 'error';
        }
      })

  }


}
