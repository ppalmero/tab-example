import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Clientes } from 'src/app/model/clientes';

@Component({
  selector: 'app-dialog-agregar-cliente',
  templateUrl: './dialog-agregar-cliente.component.html',
  styleUrls: ['./dialog-agregar-cliente.component.css']
})
export class DialogAgregarClienteComponent {
  cliente: Clientes={idCliente:-1,apellidoCliente:"",nombreCliente:"",dniCliente:-1, telefonoCliente:"", nombreEmpresa: "", cuitEmpresa: -1};

  constructor(
    public dialogRef: MatDialogRef<DialogAgregarClienteComponent>,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
