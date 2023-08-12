import { Injectable } from '@angular/core';
import { Clientes } from '../model/clientes';
import { FormatoFechaService } from './formato-fecha.service';

@Injectable({
  providedIn: 'root'
})
export class FiltroPersonalizadoService {

  constructor() { }

  customFilter(item: any, searchTerm: string): boolean {
    // Verifica si el elemento es un objeto
    console.log(searchTerm);
    if (typeof item === 'object') {
      // Recorre las propiedades del objeto
      for (const prop in item) {
        console.log(prop);
        // Verifica si alguna propiedad coincide con el término de búsqueda
        if (prop == 'cliente') {
          const clienteBuscar: Clientes = item[prop];
          if (clienteBuscar.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
            clienteBuscar.apellidoCliente.toLowerCase().includes(searchTerm.toLowerCase())) {
            return true;
          }
        } else if (prop == 'idCompra' || prop == 'precioTotalCompra' || prop == 'estado') {
          if (item[prop].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
            console.log(prop + item[prop]);
            return true;
          }
        } else if (prop == 'fechaCompra') {

          let f = (new Date(+item[prop])).toLocaleDateString('es-ES', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric'
          }) + "h";

          if (f.toLowerCase().includes(searchTerm.toLowerCase())) {
            console.log(prop + f);
            return true;
          }
        }
      }
      return false;
    } else {
      // El elemento no es un objeto, realiza la comparación normalmente
      return item.toString().toLowerCase().includes(searchTerm.toLowerCase());
    }
  }
}

