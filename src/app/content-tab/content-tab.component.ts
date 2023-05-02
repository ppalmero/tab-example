import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenenarTicketComponent } from '../dialog-genenar-ticket/dialog-genenar-ticket.component';
import { Material } from '../model/material';
import { Ticket } from '../model/ticket';
import { ComunicacionService } from '../comunicacion/comunicacion.service';
import { Clientes } from '../objetos/clientes';
import { Materiales } from '../objetos/materiales';

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
  /*{position: 1, name: 'Hydrogen', weight: 1.0079},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
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
  @Input() ticket : number;
  miTicket : number = -1;
  clienteNombreFormControl = new FormControl('', [Validators.required]);
  clienteTelefonoFormControl = new FormControl('', [Validators.required]);
  clienteObservacionesFormControl = new FormControl('');
  materialesFormControl = new FormControl({value:'', disabled: true});
  pesoFormControl = new FormControl({value:'', disabled: true});

  optionsCliente: Clientes[] = [];
  //optionsCiudad: string[] = ['One', 'Two', 'Three'];
  optionsMaterial: Materiales[] = [];
  filteredOptionsCliente: Observable<string[]>;
  //filteredOptionsCiudad: Observable<string[]>;
  filteredOptionsMaterial: Observable<string[]>;
  displayedColumns: string[] = ['select', 'Material', 'Peso'];
  dataSource = new MatTableDataSource<Material>(ELEMENT_DATA);
  selection = new SelectionModel<Material>(true, []);

  @ViewChild(MatTable) table: MatTable<Material>;

  isDisabledCliente : boolean = true;
  isDisabled : boolean = true;

  classPie:String = "pie-cliente";

  matcher = new MyErrorStateMatcher();

  clientes!: Clientes[];
  materiales!: Materiales[];

  constructor(public dialog: MatDialog, private comunicacionService: ComunicacionService) {}
  
  ngOnInit() {
    this.miTicket = this.ticket;
    this.filteredOptionsCliente = this.clienteNombreFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterClient(value || '')),
    );
    /*this.filteredOptionsCiudad = this.clienteTelefonoFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCiudad(value || '')),
    );*/
    this.filteredOptionsMaterial = this.materialesFormControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMaterial(value || '')),
    );

    this.comunicacionService.getStockPrices().subscribe(data => {
      this.clientes = data;
      this.optionsCliente = data;
      console.log(this.optionsCliente);
    });

    this.clienteNombreFormControl.valueChanges.subscribe(valor => {
      const clientesFiltro:Clientes[] = this.optionsCliente.filter(
        (elemento) => elemento.nombre.includes(valor!));
      if (clientesFiltro.length > 0){
        this.clienteTelefonoFormControl.setValue(clientesFiltro[0].telefono);
      }
    });
  }

  private _filterClient(value: string): string[] {
    const filterValue = value.toLowerCase();

    const clientesFiltro =  this.optionsCliente.map((elemento) => elemento.nombre);
    return clientesFiltro.filter(option => option.toLowerCase().includes(filterValue));
  }
  
  /*private _filterCiudad(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.optionsCiudad.filter(option => option.toLowerCase().includes(filterValue));
  }*/
  
  private _filterMaterial(value: string): string[] {
    const filterValue = value.toLowerCase();

    const materialesFiltro =  this.optionsMaterial.map((elemento) => elemento.codigo + " - " + elemento.descripcion);
    return materialesFiltro.filter(option => option.toLowerCase().includes(filterValue));
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
    const nombreCodigoMaterial: string[] = this.materialesFormControl.value!.split(" - "); 
    this.dataSource.data.push({position: this.dataSource.data.length, 
                                codigo: Number.parseInt(nombreCodigoMaterial[0]),
                                name: nombreCodigoMaterial[1], 
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
    if (this.optionsCliente.map((elemento) => elemento.nombre).includes(this.clienteNombreFormControl.value!)){
      this.classPie = "pie-cliente pie-cliente-clicked";
      this.materialesFormControl.enable({onlySelf:true});
      this.pesoFormControl.enable({onlySelf:true});
      this.isDisabledCliente = false;
      this.comunicacionService.getListaMateriales().subscribe(data => {
        this.materiales = data;
        this.optionsMaterial = data;
        console.log(this.materiales);
      });
    } else {
      alert("Debe elegir clientes de la lista desplegable.")
    }
  }

  generarTicket(){
    let ticket = new Ticket(1,
                            this.clienteNombreFormControl.value!, 
                            this.clienteTelefonoFormControl.value!,
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
