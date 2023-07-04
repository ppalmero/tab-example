import { Injectable } from '@angular/core';
import { Clientes } from '../model/clientes';

@Injectable({
  providedIn: 'root'
})
export class FiltroPersonalizadoService {

  constructor() { }

  customFilter (item: any, searchTerm: string): boolean {
    // Verifica si el elemento es un objeto
    console.log(searchTerm);
      if (typeof item === 'object') {
        // Recorre las propiedades del objeto
        for (const prop in item) {
          // Verifica si alguna propiedad coincide con el término de búsqueda
          if (prop == 'cliente') {
            const clienteBuscar: Clientes = item[prop];
            if (clienteBuscar.nombreCliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
              clienteBuscar.apellidoCliente.toLowerCase().includes(searchTerm.toLowerCase())) {
              return true;
            }
          } else {
            if (item[prop].toString().toLowerCase().includes(searchTerm.toLowerCase())) {
              console.log(prop + item[prop]);
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
