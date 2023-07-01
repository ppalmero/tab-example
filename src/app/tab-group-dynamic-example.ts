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
    const dialogRefConsultar = this.dialog.open(DialogConsultaTicketComponent, {
      height: '90%',
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
    elemento!.children[2].firstChild!.textContent="Ticket de: " + tabCliente[1];
  }
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */