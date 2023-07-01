import { Component, inject, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { ParametrosMensajes } from 'src/app/model/parametros-mensajes';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css']
})
export class MensajesComponent {
  snackBarRef = inject(MatSnackBarRef);
  //s = this.snackBarRef.containerInstance.snackBarConfig.announcementMessage;
}
