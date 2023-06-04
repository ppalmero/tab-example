import { Pipe, PipeTransform } from '@angular/core';
import { Clientes } from 'src/app/model/clientes';

@Pipe({
  name: 'filterCliente'
})
export class FilterClientePipe implements PipeTransform {

  transform(items: Clientes[], searchTerm: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    searchTerm = searchTerm.toString().toLowerCase();
    return items.filter((item) => item.id_cliente.toString().includes(searchTerm) ||
                                  item.dni_cliente.toString().includes(searchTerm) ||
                                  item.nombre_cliente.toLowerCase().includes(searchTerm) || 
                                  item.apellido_cliente.toLowerCase().includes(searchTerm));
  }

}
