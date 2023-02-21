import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Ticket } from '../model/ticket';

@Component({
  selector: 'app-dialog-genenar-ticket',
  templateUrl: './dialog-genenar-ticket.component.html',
  styleUrls: ['./dialog-genenar-ticket.component.css']
})
export class DialogGenenarTicketComponent {
  constructor(
    public dialogRef: MatDialogRef<DialogGenenarTicketComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Ticket,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
