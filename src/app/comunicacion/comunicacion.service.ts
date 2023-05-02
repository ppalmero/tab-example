import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, timer } from 'rxjs';
import { Materiales } from '../objetos/materiales';
import { Clientes } from '../objetos/clientes';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private apiUrlClientes = 'https://my.api.mockaroo.com/clientes.json?key=1d95ea90';
  private apiUrlListaMateriales = 'https://my.api.mockaroo.com/materiales.json?key=1d95ea90';

  constructor(private http: HttpClient) { }

  getStockPrices(): Observable<Clientes[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Clientes[]>(this.apiUrlClientes);
  }

  getListaMateriales(): Observable<Materiales[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Materiales[]>(this.apiUrlListaMateriales);
  }
}
