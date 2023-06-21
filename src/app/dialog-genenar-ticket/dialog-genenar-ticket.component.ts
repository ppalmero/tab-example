import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../model/ticket';
import { EstadosCompras } from '../model/enums';

@Component({
  selector: 'app-dialog-genenar-ticket',
  templateUrl: './dialog-genenar-ticket.component.html',
  styleUrls: ['./dialog-genenar-ticket.component.css']
})
export class DialogGenenarTicketComponent {

  resultOK = EstadosCompras.NOPAGADA;
  constructor(
    public dialogRef: MatDialogRef<DialogGenenarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
