import { Component, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogGenenarTicketComponent } from '../dialog-genenar-ticket/dialog-genenar-ticket.component';
import { Material } from '../model/material';
import { Ticket } from '../model/ticket';
import { ComunicacionService } from '../comunicacion/comunicacion.service';
import { Clientes } from '../model/clientes';
import { Materiales } from '../model/materiales';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}



@Component({
  selector: 'app-content-tab',
  templateUrl: './content-tab.component.html',
  styleUrls: ['./content-tab.component.css']
})
export class ContentTabComponent {
  ELEMENT_DATA: Material[] = [];
  @Input() ticket : number;
  miTicket : number = -1;
  clienteNombreFormControl = new FormControl('', [Validators.required]);
  clienteDNIFormControl = new FormControl({value:'', disabled: true});
  clienteTelefonoFormControl = new FormControl({value:'', disabled: true});
  //clienteObservacionesFormControl = new FormControl('');
  materialesFormControl = new FormControl({value:'', disabled: true});
  pesoFormControl = new FormControl({value:'', disabled: true});

  optionsCliente: Clientes[] = [];
  optionsMaterial: Materiales[] = [];
  //filteredOptionsCliente: Observable<string[]>;
  //filteredOptionsMaterial: Observable<string[]>;
  displayedColumns: string[] = ['select', 'Material', 'Peso'];
  dataSource = new MatTableDataSource<Material>(this.ELEMENT_DATA);
  selection = new SelectionModel<Material>(true, []);

  @ViewChild(MatTable) table: MatTable<Material>;

  isDisabledCliente : boolean = true;
  isDisabled : boolean = true;

  classPie:String = "pie-cliente";

  matcher = new MyErrorStateMatcher();

  clientes!: Clientes[];
  materiales!: Materiales[];

  searchTerm: string = "";
  ingresaCliente: string = "";
  ingresaMaterial: string = "";

  constructor(public dialog: MatDialog, private comunicacionService: ComunicacionService) {}
  
  ngOnInit() {
    this.miTicket = this.ticket;

    this.comunicacionService.getListaClientes().subscribe(data => {
      this.clientes = data;
      this.optionsCliente = data;
      console.log(this.optionsCliente);
    });

    this.clienteNombreFormControl.valueChanges.subscribe(valor => {
      this.ingresaCliente = valor!;
      const clientesFiltro:Clientes[] = this.optionsCliente.filter(
        (elemento) => (elemento.id_cliente + " - " + elemento.nombre_cliente + " " + elemento.apellido_cliente).includes(valor!));
      if (clientesFiltro.length > 0){
        this.clienteDNIFormControl.setValue(clientesFiltro[0].dni_cliente.toString());
        this.clienteTelefonoFormControl.setValue(clientesFiltro[0].telefono_cliente);
      }
    });

    this.materialesFormControl.valueChanges.subscribe(valor => {
      this.ingresaMaterial = valor!;
    });
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
    if (!this.materialesFormControl.value){
      alert("Ingrese material");
      return;
    }
    if (!this.pesoFormControl.value){
      alert("Ingrese peso");
      return;
    }
    const nombreCodigoMaterial: string[] = this.materialesFormControl.value!.split(" - "); 
    const materialSumaPeso = this.dataSource.data.find(obj => obj.codigo === Number.parseInt(nombreCodigoMaterial[0]));
    if (materialSumaPeso) {
      console.log("material " + nombreCodigoMaterial[1] + " encontrado");
      materialSumaPeso.weight += Number.parseFloat(this.pesoFormControl.value!);
    } else {
      this.dataSource.data.push({position: this.dataSource.data.length, 
                                codigo: Number.parseInt(nombreCodigoMaterial[0]),
                                name: nombreCodigoMaterial[1], 
                                weight: Number.parseFloat(this.pesoFormControl.value!)});
    }
    this.table.renderRows();
    //console.log(this.dataSource.data);
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
    if (!this.isDisabledCliente){
      return;
    }
    console.log(this.clienteNombreFormControl.value!);
    if (this.optionsCliente.map((elemento) => elemento.id_cliente + " - " + elemento.nombre_cliente + " " + elemento.apellido_cliente)
                                              .includes(this.clienteNombreFormControl.value!)){
      this.classPie = "pie-cliente pie-cliente-clicked";
      this.materialesFormControl.enable({onlySelf:true});
      this.pesoFormControl.enable({onlySelf:true});
      this.clienteNombreFormControl.disable({onlySelf:true});
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
    let ticket = new Ticket(this.ticket,
                            this.clienteNombreFormControl.value!, 
                            this.clienteDNIFormControl.value!,
                            this.clienteTelefonoFormControl.value!,
                            this.dataSource.data);
    console.log(ticket);
    const dialogRef = this.dialog.open(DialogGenenarTicketComponent, {
      data: ticket,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  agregarCliente(){
    
  }
}
