import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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

  @ViewChild('imprimible', { static: false }) imprimible!: ElementRef;

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

  imprimir() {
    //CÓDIGO PARA ABRIR VENTANA EMERGENTE
    let contenido = this.imprimible.nativeElement.innerHTML;
    let ventana = window.open('', '', 'height=600,width=800');
    if (ventana) {
      let requiereFlete: string = "";
      if (this.data.checkPedido){
        requiereFlete = "<p>Requiere flete</p>";
      }
      let imprimirMateriales: string = "";

      for (var m of this.data.listaMateriales){
        imprimirMateriales += "<li>" + m.idMaterial + " - " + m.nombreMaterial + ": " + m.weight + m.tipoMedidaMaterial + "</li>";
      }
      ventana.document.write(`<html><head><title>Impresión</title>
      <style>
        @font-face {
          font-family: 'Confortaa';
          src: url('assets/fonts/Comfortaa-VariableFont_wght.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
        body {font-family: Confortaa, "Helvetica Neue", sans-serif}
        h2, h3, p {margin:0}
        table {border-collapse: collapse;width: 100%; text-align: center;}
        th,td{border: 1px solid black}
        img {width: 7%;}
        .logo {text-align: center;}
        .p-derecha {text-align: right;}
        .h2-monto-total {fong-weight: bold;}
        footer{text-align: center;}
      </style></head><body>
      <h3>Cliente: ` + this.data.nombreCliente + ` </h3>
      <p>Documento: ` + this.data.dniCliente + ` </p>
      <p>Teléfono: ` + this.data.telefonoCliente + ` </p>
      <p>Fecha de ticket: ` + this.getFechaActual() + ` </p>
      <p style="text-align: left;">A partir de la fecha de generado el ticket, tendrá 7 días corridos para cobrarlo.</p>
      ` + requiereFlete + `
      <br/><h3>Materiales:</h3>
      <ul>` +
      imprimirMateriales + `
      </ul>
      <footer>
                <div class="company-info">
                    <h3>Tasemar Reciclados</h3>
                    <p>Santa Fe 354, San Luis, Argentina</p>
                    <p>0266 420-6611</p>
                </div>
            </footer>
      </body></html>`);

     /* 
      <ol>
        <mat-list-item *ngFor="let material of data.listaMateriales">
          {{material.idMaterial}} - {{material.nombreMaterial}}: {{material.weight + material.tipoMedidaMaterial}}*/
      ventana.document.close();
      ventana.focus();
      if (ventana) {
        setTimeout(() => ventana!.print(), 500);
      }
      //ventana.close();
    } else {
      alert("no están permitidas las ventanas emergentes");
    }
  }
}
