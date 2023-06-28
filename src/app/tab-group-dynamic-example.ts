import {Component, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConsultaTicketComponent } from './dialogos/dialog-consulta-ticket/dialog-consulta-ticket.component';
import { MatTabGroup } from '@angular/material/tabs';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
  selector: 'tab-group-dynamic-example',
  templateUrl: 'tab-group-dynamic-example.html',
  styleUrls: ['tab-group-dynamic-example.css'],
})
export class TabGroupDynamicExample {
  @ViewChild('tabGroup') tabGroup: MatTabGroup;

  tabs:string[] = [];
  selected = new FormControl(0);
  nroTicket: number = 0;
  clienteLabel: String = "";

  constructor(public dialog: MatDialog) {}

  addTab(selectAfterAdding: boolean) { 
    //consultar número de ticket siguiente
    this.tabs.push('Ticket de: ');
    this.nroTicket++;

    //if (selectAfterAdding) {
      this.selected.setValue(this.tabs.length - 1);
    //}
  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
  }

  consultarTicket(){
    const dialogRefConsultar = this.dialog.open(DialogConsultaTicketComponent);

    dialogRefConsultar.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  capturarCliente(cliente: string) {
    console.log("CLIENTE TAB: " + cliente);
    const tabCliente = cliente.split("#");
    //this.tabs[parseInt(tabCliente[0])] = tabCliente[1];
    let pestana = this.tabGroup._getTabLabelId(parseInt(tabCliente[0]));
    pestana = 'Nuevo Label';
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */