import { Component, Input } from '@angular/core';
import { ComunicacionService } from 'src/app/comunicacion/comunicacion.service';
import { TicketCompra } from 'src/app/model/ticket-compra';

@Component({
  selector: 'app-dialog-consulta-ticket-detail',
  templateUrl: './dialog-consulta-ticket-detail.component.html',
  styleUrls: ['./dialog-consulta-ticket-detail.component.css']
})
export class DialogConsultaTicketDetailComponent {
  masterData: TicketCompra[]=[];
  displayedColumns: string[] = ['position', 'name', 'weight'];
  //dataSource = this.masterData;
  //@Input() detailData: Items[] = []; // Arreglo para almacenar los datos de detalle

  constructor(private dataService: ComunicacionService) { }

  mostrarListaMateriales(idTicket: number){
    this.dataService.getListaMaterialesDeUnTickets(idTicket).subscribe(
      (items) => {
        // Maneja la respuesta del servidor
        this.masterData = items;
      }
    ); // Obtén los datos maestros del servicio

  }
}
