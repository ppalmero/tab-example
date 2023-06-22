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
import { EstadosCompras } from '../model/enums';
import { Compras } from '../model/compras';
import { Items } from '../model/items';
import { DialogAgregarClienteComponent } from '../dialogos/dialog-agregar-cliente/dialog-agregar-cliente.component';

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
  clienteElegido: Clientes;
  listaItems: Items[]=[];

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
        (elemento) => (elemento.idCliente + " - " + elemento.nombreCliente + " " + elemento.apellidoCliente).includes(valor!));
      if (clientesFiltro.length > 0){
        this.clienteElegido = clientesFiltro[0];
        this.clienteDNIFormControl.setValue(clientesFiltro[0].dniCliente.toString());
        this.clienteTelefonoFormControl.setValue(clientesFiltro[0].telefonoCliente);
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
    if (this.optionsCliente.map((elemento) => elemento.idCliente + " - " + elemento.nombreCliente + " " + elemento.apellidoCliente)
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
      console.log("---DATASOURCE---");
        console.log(this.dataSource.data);

      if (result == EstadosCompras.NOPAGADA) {
        for (let i = 0; i < this.dataSource.data.length; i++){
          this.listaItems.push({cantidadItemCompra: this.dataSource.data[i].weight, incrementoPrecioItemCompra: -1, precioEspecialItemCompra: -1, material: this.materiales.find(m => m.idMaterial == this.dataSource.data[i].codigo)!});
        }
        let compra: Compras={idCompra: -1, precioTotalCompra:-1,estado:EstadosCompras.NOPAGADA,cliente:this.clienteElegido,items:this.listaItems};
        console.log("---COMPRA---");
        console.log(compra);
        /*** ENVIAR AL SERVIDOR */
        this.comunicacionService.postCompra(compra).subscribe(compraAgregado => {
          console.log("---COMPRA AGREGADA---");
          console.log(compraAgregado);
        });
      }
    });
  }

  agregarCliente() {

    const dialogRefAgregar = this.dialog.open(DialogAgregarClienteComponent);

    dialogRefAgregar.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        const cliente: Clientes = result;
        console.log(cliente);
        this.comunicacionService.postCliente(cliente).subscribe(clienteAgregado => {
          this.clientes.push(clienteAgregado);
          //this.dataSource.data = this.clientes
        });
      }
    });
  }
}
