import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  snackBarRef = inject(MatSnackBarRef);
  //s = this.snackBarRef.containerInstance.snackBarConfig.announcementMessage;
}
