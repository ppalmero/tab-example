import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AutenticacionService } from 'src/app/comunicacion/autenticacion.service';
import { MensajesComponent } from '../mensajes/mensajes.component';
import { ComunicacionService } from 'src/app/comunicacion/comunicacion.service';
import { Empleados } from 'src/app/model/empleados';
import { DialogCambiarContraseniaComponent } from './dialog-cambiar-contrasenia/dialog-cambiar-contrasenia.component';

@Component({
  selector: 'app-dialog-datos-personales',
  templateUrl: './dialog-datos-personales.component.html',
  styleUrls: ['./dialog-datos-personales.component.css']
})
export class DialogDatosPersonalesComponent {
  empleadoLogueado: Empleados = {
    idEmpleado: 0,
    nombreEmpleado: "",
    apellidoEmpleado: "",
    contraseniaEmpleado: "",
    dniEmpleado: 0,
    permisoEmpleado: "",
    telefonoEmpleado: "",
    usuarioEmpleado: "",
  }

  constructor(private authService: AutenticacionService, private usuarioService: ComunicacionService,
     private _snackBar: MatSnackBar, public dialog: MatDialog,) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      console.log(this.authService.getCurrentUser());
      this.usuarioService.getEmpleadosxID(this.authService.getCurrentUser().idEmpleado).subscribe(data => {
        this.empleadoLogueado = data;
      });
    }
  }

  actualizar() {
    console.log("--EMPLEADO LOGUEADO --");
    console.log(this.empleadoLogueado);
    console.log("--EMPLEADO CURRRENT --");
    console.log(this.authService.getCurrentUser());
    if (this.empleadoLogueado.contraseniaEmpleado == "") {
      this.empleadoLogueado.contraseniaEmpleado = "-1";
    }
    this.usuarioService.postEmpleado(this.empleadoLogueado).subscribe(empleadoAgregado => {
      if (empleadoAgregado) {
        this._snackBar.openFromComponent(MensajesComponent, {
          duration: 5 * 1000, announcementMessage: "Datos actualizados.",
          data: { icono: "task", color: "mensaje-ok" }, verticalPosition: 'bottom'
        });
        this.dialog.closeAll();
      }
    });
  }

  cancelar() {
    this.usuarioService.getEmpleadosxID(this.authService.getCurrentUser().idEmpleado).subscribe(data => {
      this.empleadoLogueado = data;
      this._snackBar.openFromComponent(MensajesComponent, {
        duration: 5 * 1000, announcementMessage: "Se deshicieron los cambios.",
        data: { icono: "info", color: "mensaje-info" }, verticalPosition: 'bottom'
      });
      this.dialog.closeAll();
    });
  }

  cambiarContrasenia() {
    const dialogRefAgregar = this.dialog.open(DialogCambiarContraseniaComponent, { data: this.empleadoLogueado });
    dialogRefAgregar.afterClosed().subscribe(result => {
      if (result) {
        this.empleadoLogueado = result;
      }
    });
  }

}
