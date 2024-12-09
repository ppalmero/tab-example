import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComunicacionService } from 'src/app/comunicacion/comunicacion.service';
import { Empleados } from 'src/app/model/empleados';
import { MensajesComponent } from '../../mensajes/mensajes.component';

@Component({
  selector: 'app-dialog-cambiar-contrasenia',
  templateUrl: './dialog-cambiar-contrasenia.component.html',
  styleUrls: ['./dialog-cambiar-contrasenia.component.css']
})
export class DialogCambiarContraseniaComponent {
  contraseniaActual: string = "";
  contraseniaNueva: string = "";
  contraseniaRepite: string = "";

  hide = true;
  hide1 = true;
  hide2 = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Empleados, private postService: ComunicacionService,
    private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<DialogCambiarContraseniaComponent>,) {
    console.log(data);
  }

  ngOnInit(): void {
  }

  cambiarContrasenia() {
    if (this.contraseniaNueva != this.contraseniaRepite) {
      this._snackBar.openFromComponent(MensajesComponent, {
        duration: 5 * 1000, announcementMessage: "Debe repetir la contraseña nueva.",
        data: { icono: "cancel", color: "mensaje-nook" }, verticalPosition: 'bottom'
      });
    } else {
      this.data.contraseniaEmpleado = this.contraseniaActual;
      this.postService.iniciarSesion(this.data).subscribe(empleado => {
        console.log("Empleado recibido");
        console.log(empleado);
        if (empleado.idEmpleado == 0) {
          this._snackBar.openFromComponent(MensajesComponent, {
            duration: 5 * 1000, announcementMessage: "La contraseña actual es incorrecta.",
            data: { icono: "cancel", color: "mensaje-nook" }, verticalPosition: 'bottom'
          });
        } else {
          this._snackBar.openFromComponent(MensajesComponent, {
            duration: 5 * 1000, announcementMessage: "Se cambió la contraseña. Actualice sus datos.",
            data: { icono: "task", color: "mensaje-ok" }, verticalPosition: 'bottom'
          });
          empleado.contraseniaEmpleado = this.contraseniaNueva;
          this.dialogRef.close(empleado);
        }
      });
    }
  }
}
