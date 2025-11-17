import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';
import { autoTable } from 'jspdf-autotable';
import { HistoryItem } from '../../interface/karaoke.interface';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  generatePDF(headers: string[], dataBody: HistoryItem[]) {
    const doc = new jsPDF();

    this.createTitle(doc);
    autoTable(doc, {
      head: [headers],
      body: this.generateBody(dataBody),
      headStyles: {
        fillColor: [33, 37, 41],
        textColor: [255, 255, 255],
      },
      startY: 30
    })

    doc.save('reporte.pdf')
  }

  private generateBody(dataBody: HistoryItem[]): string[][] {

    return dataBody.map(element => {
      let dataArr: string[] = [];
      for (const key in element) {
        const value = element[key as keyof HistoryItem];
        dataArr.push(value.toString())
      }
      return dataArr
    });


  };

  private createTitle(doc: jsPDF): void {
    doc.setFontSize(20);
    doc.setTextColor(40, 40, 40);
    doc.text('Historial de Canciones', 14, 15);
  }

}
