import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { Materiales } from '../model/materiales';
import { Clientes } from '../model/clientes';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private apiUrlClientes = 'https://my.api.mockaroo.com/clientes.json?key=1d95ea90';
  private apiUrlListaMateriales = 'https://my.api.mockaroo.com/materiales.json?key=1d95ea90';

  constructor(private http: HttpClient) { }

  getListaClientes(): Observable<Clientes[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Clientes[]>('assets/clientes.json');
  }

  getListaMateriales(): Observable<Materiales[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Materiales[]>('assets/materiales.json');
  }
}
