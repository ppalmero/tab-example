import { Component, OnInit, ViewChild } from '@angular/core';
import { ComunicacionService } from 'src/app/comunicacion/comunicacion.service';
import { Compras } from 'src/app/model/compras';
import { DialogConsultaTicketDetailComponent } from '../dialog-consulta-ticket-detail/dialog-consulta-ticket-detail.component';

@Component({
  selector: 'app-dialog-consulta-ticket',
  templateUrl: './dialog-consulta-ticket.component.html',
  styleUrls: ['./dialog-consulta-ticket.component.css']
})
export class DialogConsultaTicketComponent implements OnInit{
  @ViewChild(DialogConsultaTicketDetailComponent) hijo: DialogConsultaTicketDetailComponent;
  masterData: Compras[]; // Arreglo para almacenar los datos maestros seleccionados
  selectedMaster: Compras; // Arreglo para almacenar los datos maestros seleccionados
  // Objeto para almacenar el maestro seleccionado

  constructor(private dataService: ComunicacionService) { }

  ngOnInit() {
    this.dataService.getListaTickets().subscribe(
      (clientes) => {
        // Maneja la respuesta del servidor
        this.masterData = clientes;
      }
    ); // Obtén los datos maestros del servicio
  }

  onSelect(master: any) {
    this.selectedMaster = master; // Almacena el maestro seleccionado
    console.log(this.selectedMaster);
    this.hijo.mostrarListaMateriales(this.selectedMaster.idCompra);
  }
}
