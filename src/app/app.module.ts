import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {TabGroupDynamicExample} from './tab-group-dynamic-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { ContentTabComponent } from './content-tab/content-tab.component';
import { DialogGenenarTicketComponent } from './dialog-genenar-ticket/dialog-genenar-ticket.component';
import { FilterClientePipe } from './content-tab/filtros/filter-cliente.pipe';
import { FilterMaterialPipe } from './content-tab/filtros/filter-material.pipe';
import { DialogAgregarClienteComponent } from './dialogos/dialog-agregar-cliente/dialog-agregar-cliente.component';
import { DialogConsultaTicketComponent } from './dialogos/dialog-consulta-ticket/dialog-consulta-ticket.component';
import { DialogConsultaTicketDetailComponent } from './dialogos/dialog-consulta-ticket-detail/dialog-consulta-ticket-detail.component';
import { MensajesComponent } from './dialogos/mensajes/mensajes.component';
import { LoginComponent } from './login/login.component';
import { DialogDatosPersonalesComponent } from './dialogos/dialog-datos-personales/dialog-datos-personales.component';
import { DialogCambiarContraseniaComponent } from './dialogos/dialog-datos-personales/dialog-cambiar-contrasenia/dialog-cambiar-contrasenia.component';

@NgModule({
  declarations: [TabGroupDynamicExample, ContentTabComponent, DialogGenenarTicketComponent, FilterClientePipe, FilterMaterialPipe, DialogAgregarClienteComponent, DialogConsultaTicketComponent, DialogConsultaTicketDetailComponent, MensajesComponent, LoginComponent, DialogDatosPersonalesComponent, DialogCambiarContraseniaComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [TabGroupDynamicExample],
})
export class AppModule {}
