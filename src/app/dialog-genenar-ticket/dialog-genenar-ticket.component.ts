import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../model/ticket';
import { EstadosCompras } from '../model/enums';
import { FormatoFechaService } from '../comunicacion/formato-fecha.service';
import { ComunicacionService } from '../comunicacion/comunicacion.service';

@Component({
  selector: 'app-dialog-genenar-ticket',
  templateUrl: './dialog-genenar-ticket.component.html',
  styleUrls: ['./dialog-genenar-ticket.component.css']
})
export class DialogGenenarTicketComponent {

  resultOK = EstadosCompras.NOPAGADA;
  fechaActual: string = "";
  constructor(private dataService: ComunicacionService, public formatoFecha: FormatoFechaService, 
    public dialogRef: MatDialogRef<DialogGenenarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket,
  ) {
    this.dataService.getFechaServidor().subscribe(
      (fecha) => {
        // Maneja la respuesta del servidor
        this.fechaActual = this.formatoFecha.formatearFecha(new Date(fecha));
      }
    );
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getFechaActual(): string {
    
    return this.fechaActual;
  }
}
