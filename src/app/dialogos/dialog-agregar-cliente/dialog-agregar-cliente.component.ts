import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Clientes } from 'src/app/model/clientes';

@Component({
  selector: 'app-dialog-agregar-cliente',
  templateUrl: './dialog-agregar-cliente.component.html',
  styleUrls: ['./dialog-agregar-cliente.component.css']
})
export class DialogAgregarClienteComponent {
  cliente: Clientes = { idCliente: 0, apellidoCliente: "", nombreCliente: "", dniCliente: 0, telefonoCliente: "", nombreEmpresa: "", cuitEmpresa: 0 };
  formulario: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogAgregarClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public clientes: Clientes[]
  ) {
    this.formulario = this.fb.group({
      inputNombre: ['', Validators.required],
      inputApellido: ['', Validators.required],
      inputDNI: ['', Validators.required],
      inputTelefono: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  cargarCliente(): void {
    if (this.clientes.find(obj => obj.dniCliente == this.cliente.dniCliente)) {
      alert('Ya exite un cliente con dni ' + this.cliente.dniCliente);
      return;
    }
    if (this.clientes.find(obj => obj.apellidoCliente == this.cliente.apellidoCliente && obj.nombreCliente == this.cliente.nombreCliente)) {
      if (confirm('Ya existe un cliente con ese nombre y apellido ¿Desea generarlo igualmente? DNI: ' + this.cliente.dniCliente)) {
        if (this.formulario.valid) {
          this.cliente.idCliente = 0;
          this.dialogRef.close(this.cliente);
        } else {
          // El formulario no es válido, maneja el caso en consecuencia
          alert('Por favor, completa todos los campos requeridos.');
        }
      }
    } else {
      if (this.formulario.valid) {
        this.cliente.idCliente = 0;
        this.dialogRef.close(this.cliente);
      } else {
        // El formulario no es válido, maneja el caso en consecuencia
        alert('Por favor, completa todos los campos requeridos.');
      }
    }
  }

}
