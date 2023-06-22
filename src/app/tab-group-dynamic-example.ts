import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogConsultaTicketComponent } from './dialogos/dialog-consulta-ticket/dialog-consulta-ticket.component';

/**
 * @title Tab group with dynamically changing tabs
 */
@Component({
  selector: 'tab-group-dynamic-example',
  templateUrl: 'tab-group-dynamic-example.html',
  styleUrls: ['tab-group-dynamic-example.css'],
})
export class TabGroupDynamicExample {
  tabs:string[] = [];
  selected = new FormControl(0);
  nroTicket: number = 1;

  constructor(public dialog: MatDialog) {}

  addTab(selectAfterAdding: boolean) { 
    //consultar número de ticket siguiente
    this.nroTicket;
    this.tabs.push('Ticket N°' + this.nroTicket++);

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
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */