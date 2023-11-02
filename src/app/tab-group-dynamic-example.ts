import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConsultaTicketComponent } from './dialogos/dialog-consulta-ticket/dialog-consulta-ticket.component';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { AutenticacionService } from './comunicacion/autenticacion.service';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
  selector: 'tab-group-dynamic-example',
  templateUrl: 'tab-group-dynamic-example.html',
  styleUrls: ['tab-group-dynamic-example.css'],
})
export class TabGroupDynamicExample implements OnInit {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  tabs: string[] = [];
  selected = new FormControl(0);
  nroTicket: number = 0;
  clienteLabel: String = "";

  isLoggedIn: boolean = false;

  usuario: string = "";

  private subscription!: Subscription;

  constructor(public dialog: MatDialog, private authService: AutenticacionService) { }

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe((isLoggedIn) => {
      console.log("tab- " + isLoggedIn);
      if (isLoggedIn.idEmpleado != 0) {
        this.usuario = this.authService.getCurrentUser().usuarioEmpleado;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  addTab(selectAfterAdding: boolean) {
    //consultar número de ticket siguiente
    this.tabs.push('Ticket de: ' + this.nroTicket);
    this.nroTicket++;

    //if (selectAfterAdding) {
    this.selected.setValue(this.tabs.length - 1);
    //}
  }

  removeTab(index: number) {
    console.log("TAB a remover: " + index)
    console.log("TABS");
    console.log(this.tabs);
    this.tabs.splice(index, 1);
  }

  consultarTicket() {
    const dialogRefConsultar = this.dialog.open(DialogConsultaTicketComponent, {
      height: '100%',
      width: '70%',
    });

    dialogRefConsultar.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  capturarCliente(cliente: string) {
    console.log("CLIENTE TAB: " + cliente);
    const tabCliente = cliente.split("#");
    let pestana = this.tabGroup._getTabLabelId(parseInt(tabCliente[0]));
    console.log("TITULO TAB");
    console.log(pestana);

    const elemento = document.getElementById(pestana);
    console.log(elemento?.children[2].firstChild);
    elemento!.children[2].firstChild!.textContent = "Ticket de: " + tabCliente[1];
  }

  cerrarSesion(){
    this.authService.logout();
    this.isLoggedIn = false;
  }
}