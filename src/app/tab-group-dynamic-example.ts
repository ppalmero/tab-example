import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConsultaTicketComponent } from './dialogos/dialog-consulta-ticket/dialog-consulta-ticket.component';
import { MatTabGroup } from '@angular/material/tabs';
import { Subscription } from 'rxjs';
import { AutenticacionService } from './comunicacion/autenticacion.service';
import { DialogDatosPersonalesComponent } from './dialogos/dialog-datos-personales/dialog-datos-personales.component';
import { Clientes } from './model/clientes';

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

  clientes!: Clientes[];

  private subscription!: Subscription;
  private subscriptionCliente!: Subscription;

  cargaCompleta: boolean = true;

  constructor(public dialog: MatDialog, private authService: AutenticacionService) { }

  ngOnInit(): void {

    if (!this.clientes) {
      this.cargaCompleta = false;
    }
    if (this.authService.isAuthenticated()) {
      this.isLoggedIn = true;
      this.usuario = this.authService.getCurrentUser().usuarioEmpleado;
      console.log("usuario logueado");
    }

    this.subscription = this.authService.currentUser$.subscribe((isLoggedIn) => {
      console.log("tab- " + isLoggedIn);
      this.clientes = this.authService.getClientes();
      console.log("clientes tab-");
      console.log(this.clientes);
      if (isLoggedIn.idEmpleado != 0) {
        this.usuario = this.authService.getCurrentUser().usuarioEmpleado;
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    
    this.subscriptionCliente = this.authService.currentClientes$.subscribe((clientes) => {
      console.log("clientes recibidos....")
      this.clientes = clientes;
      this.cargaCompleta = true;
    });
  }

  addTab(selectAfterAdding: boolean) {
    //consultar número de ticket siguiente
    if (this.authService.isAuthenticated()) {
      this.tabs.push('Ticket de: ' + this.nroTicket);
      this.nroTicket++;

      //if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    } else {
      this.isLoggedIn = false;
    }
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

  datosPersonales() {
    const dialogRefConsultar = this.dialog.open(DialogDatosPersonalesComponent);

    dialogRefConsultar.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  cerrarSesion() {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}