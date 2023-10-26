import { Component, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTable, MatTableDataSource } from '@angular/material/table';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajesComponent } from '../dialogos/mensajes/mensajes.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es-AR';
import { AutenticacionService } from '../comunicacion/autenticacion.service';
import { Empleados } from '../model/empleados';
registerLocaleData(localeEs, 'es');

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

  @ViewChild('spanSufijo') email: ElementRef<HTMLInputElement>;

  @Output() miEvento = new EventEmitter<string>();
  @Output() eventoCerrar = new EventEmitter<number>();

  ELEMENT_DATA: Material[] = [];
  @Input() ticket: number;
  miTicket: number = -1;
  clienteNombreFormControl = new FormControl('', [Validators.required]);
  clienteDNIFormControl = new FormControl({ value: '', disabled: true });
  clienteTelefonoFormControl = new FormControl({ value: '', disabled: true });
  //clienteObservacionesFormControl = new FormControl('');
  materialesFormControl = new FormControl({ value: '', disabled: true });
  pesoFormControl = new FormControl({ value: '', disabled: true });

  optionsCliente: Clientes[] = [];
  optionsMaterial: Materiales[] = [];
  displayedColumns: string[] = ['select', 'Material', 'Peso'];
  dataSource = new MatTableDataSource<Material>(this.ELEMENT_DATA);
  selection = new SelectionModel<Material>(true, []);

  @ViewChild(MatTable) table: MatTable<Material>;

  isDisabledCliente: boolean = true;
  isDisabled: boolean = true;

  classPie: String = "pie-cliente";

  matcher = new MyErrorStateMatcher();

  clientes!: Clientes[];
  materiales!: Materiales[];

  searchTerm: string = "";
  ingresaCliente: string = "";
  ingresaMaterial: string = "";
  clienteElegido: Clientes;
  listaItems: Items[] = [];

  checkPedido: boolean = false;
  seleccion: boolean;

  constructor(public dialog: MatDialog, private comunicacionService: ComunicacionService, private authService: AutenticacionService,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.miTicket = this.ticket;

    this.comunicacionService.getListaClientes().subscribe(data => {
      this.clientes = data;
      this.optionsCliente = data;
      console.log(this.optionsCliente);
    });

    this.clienteNombreFormControl.valueChanges.subscribe(valor => {
      this.ingresaCliente = valor!;
      const clientesFiltro: Clientes[] = this.optionsCliente.filter(
        (elemento) => (elemento.idCliente + " - " + elemento.nombreCliente + " " + elemento.apellidoCliente).includes(valor!));
      if (clientesFiltro.length > 0) {
        this.clienteElegido = clientesFiltro[0];
        this.clienteDNIFormControl.setValue(clientesFiltro[0].dniCliente.toString());
        this.clienteTelefonoFormControl.setValue(clientesFiltro[0].telefonoCliente);
      }
    });

    this.materialesFormControl.valueChanges.subscribe(valor => {
      this.ingresaMaterial = valor!;
      console.log("--MATERIAL SELECCIONADO--");
      console.log(valor);
      if (valor) {
        const materialesFiltro: Materiales[] = this.optionsMaterial.filter(
          (elemento) => (elemento.idMaterial + " - " + elemento.nombreMaterial).includes(valor!));
        if (materialesFiltro.length > 0) {
      //this.moveToNextInput();
          this.email.nativeElement.innerText = materialesFiltro[0].tipoMedidaMaterial;
        }
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    if (numSelected > 0) {
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
    var s: String;
    if (!row) {
      if (this.isAllSelected()) {
        s = "deselect";
      } else {
        s = "select";
      }
      return `${s} all`;
    } else {
      if (this.selection.isSelected(row)) {
        s = 'deselect';
      } else {
        s = 'select';
      }
      return `${s} row ${row.position + 1}`;
    }
  }

  agregarMaterial() {
    if (!this.materialesFormControl.value || 
      this.optionsMaterial.filter((elemento) => (elemento.idMaterial + " - " + 
        elemento.nombreMaterial).includes(this.materialesFormControl.value!)).length == 0) {
      this._snackBar.openFromComponent(MensajesComponent, {
        duration: 5 * 1000, announcementMessage: "Ingrese material", data: { icono: "info", color: "mensaje-info" }
      });
      return;
    }
    if (!this.pesoFormControl.value) {
      this._snackBar.openFromComponent(MensajesComponent, {
        duration: 5 * 1000, announcementMessage: "Ingrese cantidad", data: { icono: "info", color: "mensaje-info" }
      });
      return;
    }
    const nombreCodigoMaterial: string[] = this.materialesFormControl.value!.split(" - ");
    const materialSumaPeso = this.dataSource.data.find(obj => obj.idMaterial === Number.parseInt(nombreCodigoMaterial[0]));
    if (materialSumaPeso) {
      console.log("material " + nombreCodigoMaterial[1] + " encontrado");
      materialSumaPeso.weight += Number.parseFloat(this.pesoFormControl.value!);
    } else {
      this.dataSource.data.push({
        position: this.dataSource.data.length,
        idMaterial: Number.parseInt(nombreCodigoMaterial[0]),
        nombreMaterial: nombreCodigoMaterial[1],
        weight: Number.parseFloat(this.pesoFormControl.value!),
        tipoMedidaMaterial: this.email.nativeElement.innerText,
        precioMaterial: -1
      });
    }
    this.table.renderRows();
    //console.log(this.dataSource.data);
    this.materialesFormControl.setValue("");
    this.pesoFormControl.setValue("");
    const nextInput = document.getElementById("nombrematerialinputid");
    if (nextInput) {
      nextInput.focus();
    }
  }

  eliminarMaterial() {
    for (let i = 0; i < this.selection.selected.length; i++) {
      let j = this.dataSource.data.indexOf(this.selection.selected[i]);
      this.dataSource.data.splice(j, 1);
      console.log(this.selection.selected);
    }
    this.dataSource._updateChangeSubscription();
    this.table.renderRows();
    this.selection.clear();
    this.isDisabled = true;
  }

  clienteSiguiente() {
    if (!this.isDisabledCliente) {
      return;
    }
    console.log(this.clienteNombreFormControl.value!);
    if (this.optionsCliente.map((elemento) => elemento.idCliente + " - " + elemento.nombreCliente + " " + elemento.apellidoCliente)
      .includes(this.clienteNombreFormControl.value!)) {
      this.miEvento.emit(this.ticket + "#" + this.clienteNombreFormControl.value!);
      this.classPie = "pie-cliente pie-cliente-clicked";
      this.materialesFormControl.enable({ onlySelf: true });
      this.pesoFormControl.enable({ onlySelf: true });
      this.clienteNombreFormControl.disable({ onlySelf: true });
      this.isDisabledCliente = false;
      this.comunicacionService.getListaMateriales().subscribe(data => {
        this.materiales = data;
        this.optionsMaterial = data;
        console.log(this.materiales);
      });
    } else {
      this._snackBar.openFromComponent(MensajesComponent, {
        duration: 5 * 1000, announcementMessage: "Debe elegir clientes de la lista desplegable.", data: { icono: "info", color: "mensaje-info" }
      });
    }
  }

  generarTicket() {
    if (this.dataSource.data.length > 0) {
      let ticket = new Ticket(this.ticket,
        this.clienteNombreFormControl.value!,
        this.clienteDNIFormControl.value!,
        this.clienteTelefonoFormControl.value!,
        this.dataSource.data,
        this.checkPedido);
      console.log(ticket);

      const dialogRef = this.dialog.open(DialogGenenarTicketComponent, {
        data: ticket, height: '90%'
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log("---DATASOURCE---");
        console.log(this.dataSource.data);

        if (result == EstadosCompras.NOPAGADA) {
          for (let i = 0; i < this.dataSource.data.length; i++) {
            this.listaItems.push({ cantidadItemCompra: this.dataSource.data[i].weight, incrementoPrecioItemCompra: -1, precioItemCompra: -1, material: this.materiales.find(m => m.idMaterial == this.dataSource.data[i].idMaterial)! });
          }
          let e: Empleados = {
            idEmpleado: 1, nombreEmpleado: "Juan", apellidoEmpleado: "del Valle", dniEmpleado: 234222,
            telefonoEmpleado: "231233", usuarioEmpleado: "user", contraseniaEmpleado: "user", permisoEmpleado: ""
          };
          let compra: Compras = {
            idCompra: -1, precioTotalCompra: -1, estado: EstadosCompras.NOPAGADA, fechaCompra: 0,
            fleteCompra: this.checkPedido ? 1 : 0, fleteValorCompra: 0, incrementoCompra: 0, cliente: this.clienteElegido,
            items: this.listaItems, empleado: e, sucursal: this.authService.getCurrentSucursal()
          };
          console.log("---COMPRA---");
          console.log(compra);
          /*** ENVIAR AL SERVIDOR - FORMA CORRECTA DE USAR SUBSCRIBE CON ERROR*/
          this.comunicacionService.postCompra(compra).subscribe({
            next: (compraAgregado) => {
              console.log("---COMPRA AGREGADA---");
              console.log(compraAgregado);
              this._snackBar.openFromComponent(MensajesComponent, {
                duration: 5 * 1000, announcementMessage: "ticket generado", data: { icono: "task", color: "mensaje-ok" }
              });
              this.eventoCerrar.emit(this.ticket);
            }, error: (err) => {
              this._snackBar.openFromComponent(MensajesComponent, {
                duration: 5 * 1000, announcementMessage: "error al generar ticket", data: { icono: "error", color: "mensaje-nook" }
              });
              console.log(err);
            }
          });
        }
      });
    } else {
      this._snackBar.openFromComponent(MensajesComponent, {
        duration: 5 * 1000, announcementMessage: "No ha ingresado materiales", data: { icono: "info", color: "mensaje-info" }
      });
    }
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

  onInput(event: any) {
    console.log("--GANO EL FOCO ");
    
    if (this.seleccion) {
      this.moveToNextInput();
      this.seleccion = false; 
    }
  }

  moveToNextInput() {
    console.log("--ENTER: MOVETONEXT ");
    const nextInput = document.getElementById("materialinputid");
    console.log(nextInput);
    if (nextInput) {
      console.log("--ENTER: nextinput ");
      nextInput.focus();
    }
  }

  seleccionaOpcion() {
    this.seleccion = true;
    this.moveToNextInput();
    console.log("--SE SELECCIONÓ OPCIÓN ");
  }
  selectAllText(event: any) {
    event.target.select();
  }

  mostrarCambio(event: any){
    console.log("--Valor input materiales" + event.target.value);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.moveToNextInput();
    }
    
  }
}
