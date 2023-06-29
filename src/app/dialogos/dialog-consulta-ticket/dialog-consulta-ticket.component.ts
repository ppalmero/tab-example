import { Component, OnInit, ViewChild } from '@angular/core';
import { ComunicacionService } from 'src/app/comunicacion/comunicacion.service';
import { Compras } from 'src/app/model/compras';
import { DialogConsultaTicketDetailComponent } from '../dialog-consulta-ticket-detail/dialog-consulta-ticket-detail.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-consulta-ticket',
  templateUrl: './dialog-consulta-ticket.component.html',
  styleUrls: ['./dialog-consulta-ticket.component.css']
})
export class DialogConsultaTicketComponent implements OnInit{
  @ViewChild(DialogConsultaTicketDetailComponent) hijo: DialogConsultaTicketDetailComponent;
  @ViewChild(MatTable) table: MatTable<Compras>;

  masterData: Compras[] = []; // Arreglo para almacenar los datos maestros seleccionados
  selectedMaster: Compras; // Arreglo para almacenar los datos maestros seleccionados
  // Objeto para almacenar el maestro seleccionado

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<Compras>(this.masterData);

  constructor(private dataService: ComunicacionService) { }

  ngOnInit() {
    this.dataService.getListaTickets().subscribe(
      (tickets) => {
        // Maneja la respuesta del servidor
        this.masterData = tickets;
        this.dataSource.data.push(...this.masterData);
        this.table.renderRows();
      }
    ); // Obtén los datos maestros del servicio
  }

  onSelect(master: any) {
    this.selectedMaster = master; // Almacena el maestro seleccionado
    console.log(this.selectedMaster);
    this.hijo.mostrarListaMateriales(this.selectedMaster.idCompra);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
