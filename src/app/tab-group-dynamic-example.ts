import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

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
}


/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */