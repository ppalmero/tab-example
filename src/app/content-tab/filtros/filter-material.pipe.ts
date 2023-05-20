import { Pipe, PipeTransform } from '@angular/core';
import { Materiales } from 'src/app/model/materiales';

@Pipe({
  name: 'filterMaterial'
})
export class FilterMaterialPipe implements PipeTransform {

  transform(items: Materiales[], searchTerm: string): any[] {
    if (!items) return [];
    if (!searchTerm) return items;
    searchTerm = searchTerm.toString().toLowerCase();
    return items.filter((item) => item.idMaterial.toString().includes(searchTerm) ||
                                  item.nombreMaterial.toLowerCase().includes(searchTerm));
  }

}
