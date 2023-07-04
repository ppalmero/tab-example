import { Component, OnInit, ViewChild } from '@angular/core';
import { ComunicacionService } from 'src/app/comunicacion/comunicacion.service';
import { Compras } from 'src/app/model/compras';
import { DialogConsultaTicketDetailComponent } from '../dialog-consulta-ticket-detail/dialog-consulta-ticket-detail.component';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FiltroPersonalizadoService } from 'src/app/comunicacion/filtro-personalizado.service';
import { Clientes } from 'src/app/model/clientes';
import { FormatoFechaService } from 'src/app/comunicacion/formato-fecha.service';

@Component({
  selector: 'app-dialog-consulta-ticket',
  templateUrl: './dialog-consulta-ticket.component.html',
  styleUrls: ['./dialog-consulta-ticket.component.css']
})
export class DialogConsultaTicketComponent implements OnInit {
  @ViewChild(DialogConsultaTicketDetailComponent) hijo: DialogConsultaTicketDetailComponent;
  @ViewChild(MatTable) table: MatTable<Compras>;

  masterData: Compras[] = []; // Arreglo para almacenar los datos maestros seleccionados
  selectedMaster: Compras; // Arreglo para almacenar los datos maestros seleccionados
  // Objeto para almacenar el maestro seleccionado

  displayedColumns: string[] = ['id', 'cliente', 'total', 'estado', 'fecha'];
  dataSource: MatTableDataSource<Compras>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private dataService: ComunicacionService, public filtro: FiltroPersonalizadoService,
              public formatoFecha: FormatoFechaService) {

    this.dataSource = new MatTableDataSource<Compras>(this.masterData);
    this.dataService.getListaTickets().subscribe(
      (tickets) => {
        // Maneja la respuesta del servidor
        this.masterData = tickets;
        this.dataSource.data.push(...this.masterData);
        //this.dataSource = new MatTableDataSource<Compras>(this.masterData);
        this.table.renderRows();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    ); // Obtén los datos maestros del servicio
    //this.dataSource = new MatTableDataSource<Compras>(this.masterData);
  }

  ngOnInit() {
  }

  ngAfterViewInit() {

  }

  onSelect(master: any) {
    this.selectedMaster = master; // Almacena el maestro seleccionado
    console.log(this.selectedMaster);
    this.hijo.mostrarListaMateriales(this.selectedMaster.idCompra);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    //this.dataSource.filter = filterValue.trim().toLowerCase();//NO FILTRA POR NOMBRE DE CLIENTE

    //this.dataSource.filter = filterValue.trim().toLowerCase();
    /*this.dataSource.filterPredicate = function (data: any, filter: string) {
      //return data.filter((item: any) => this.filtro.customFilter(item, filter)).length > 0;
      return false;
    };*/

    this.dataSource.filter = filterValue.trim().toLowerCase();//NO FILTRA POR NOMBRE DE CLIENTE
    this.dataSource.filterPredicate = this.filtro.customFilter;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getFecha(fecha: number){
    return this.formatoFecha.formatearFecha(new Date(fecha));
  }
}
