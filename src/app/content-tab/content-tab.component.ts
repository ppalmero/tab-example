import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenenarTicketComponent } from '../dialog-genenar-ticket/dialog-genenar-ticket.component';
import { Material } from '../model/material';
import { Ticket } from '../model/ticket';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/*export interface PeriodicElement {
  
  //symbol: string;
}*/

const ELEMENT_DATA: Material[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079},
  /*{position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},*/
];

@Component({
  selector: 'app-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.css']
})
export class ContentTabComponent {
  clienteNombreFormControl = new FormControl('', [Validators.required]);
  clienteCiudadFormControl = new FormControl('', [Validators.required]);
  clienteObservacionesFormControl = new FormControl('');
  materialesFormControl = new FormControl({value:'', disabled: true});
  pesoFormControl = new FormControl({value:'', disabled: true});

  optionsCliente: string[] = ['One', 'Two', 'Three'];
  optionsCiudad: string[] = ['One', 'Two', 'Three'];
  optionsMaterial: string[] = ['One', 'Two', 'Three'];
  filteredOptionsCliente: Observable<string[]>;
  filteredOptionsCiudad: Observable<string[]>;
  filteredOptionsMaterial: Observable<string[]>;
  displayedColumns: string[] = ['select', 'Material', 'Peso'];
  dataSource = new MatTableDataSource<Material>(ELEMENT_DATA);
  selection = new SelectionModel<Material>(true, []);

  @ViewChild(MatTable) table: MatTable<Material>;

  isDisabledCliente : boolean = true;
  isDisabled : boolean = true;

  classPie:String = "pie-cliente";

  matcher = new MyErrorStateMatcher();

  constructor(public dialog: MatDialog) {}
  
  ngOnInit() {
    this.filteredOptionsCliente = this.clienteNombreFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterClient(value || '')),
    );
    this.filteredOptionsCiudad = this.clienteCiudadFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCiudad(value || '')),
    );
    this.filteredOptionsMaterial = this.materialesFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMaterial(value || '')),
    );
  }

  private _filterClient(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsCliente.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  private _filterCiudad(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsCiudad.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  private _filterMaterial(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsMaterial.filter(option => option.toLowerCase().includes(filterValue));
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    if (numSelected > 0){
      this.isDisabled = false;
    } else {
      this.isDisabled = true;
    }
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    
    console.log("Toggle");
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Material): string {
    var s : String;
    if (!row) {
      if (this.isAllSelected()){
        s = "deselect";
      } else {
        s = "select";
      }
      return `${s} all`;
    } else {
      if (this.selection.isSelected(row)){
        s = 'deselect';
      } else {
        s = 'select';
      }
      return `${s} row ${row.position + 1}`;
    }
  }

  agregarMaterial(){
    this.dataSource.data.push({position: this.dataSource.data.length, 
                                name: this.materialesFormControl.value!, 
                                weight: Number.parseFloat(this.pesoFormControl.value!)});
    this.table.renderRows();
    console.log(this.dataSource.data);
    this.materialesFormControl.setValue("");
    this.pesoFormControl.setValue("");
  }

  eliminarMaterial(){
    for (let i = 0; i < this.selection.selected.length; i++){
      let j = this.dataSource.data.indexOf (this.selection.selected[i]);
      this.dataSource.data.splice(j, 1);
      console.log(this.selection.selected);
    }
    this.dataSource._updateChangeSubscription(); 
    this.table.renderRows();
    this.selection.clear();
    this.isDisabled = true;
  }

  clienteSiguiente(){
    if (this.optionsCliente.includes(this.clienteNombreFormControl.value!) &&
        this.optionsCiudad.includes(this.clienteCiudadFormControl.value!)){
      this.classPie = "pie-cliente pie-cliente-clicked";
      this.materialesFormControl.enable({onlySelf:true});
      this.pesoFormControl.enable({onlySelf:true});
      this.isDisabledCliente = false;
    } else {
      alert("Debe elegir clientes y ciudades de la lista desplegable.")
    }
  }

  generarTicket(){
    let ticket = new Ticket(1,
                            this.clienteNombreFormControl.value!, 
                            this.clienteCiudadFormControl.value!,
                            this.clienteObservacionesFormControl.value!,
                            this.dataSource.data);
    console.log(ticket);
    const dialogRef = this.dialog.open(DialogGenenarTicketComponent, {
      data: ticket,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }
}
