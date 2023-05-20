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
    return items.filter((item) => item.dniCliente.toString().includes(searchTerm) ||
                                  item.nombreCliente.toLowerCase().includes(searchTerm) || 
                                  item.apellidoCliente.toLowerCase().includes(searchTerm));
  }

}
