import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Materiales } from '../model/materiales';
import { Clientes } from '../model/clientes';
import { Compras } from '../model/compras';
import { TicketCompra } from '../model/ticket-compra';
import { Empleados } from '../model/empleados';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private apiServer = 'back/';//'http://45.90.220.197:8080/';//

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

  getEmpleadosxID(id: number): Observable<Empleados> {
    return this.http.get<Empleados>(this.apiServer + 'empleado/' + id);
  }

  getListaClientes(): Observable<Clientes[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Clientes[]>(this.apiServer + 'cliente', this.httpOptions);
  }

  getListaMateriales(): Observable<Materiales[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Materiales[]>(this.apiServer + 'material');
  }

  getListaTickets(): Observable<Compras[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<Compras[]>(this.apiServer + 'compra');
  }

  getListaMaterialesDeUnTickets(idTicket:number): Observable<TicketCompra[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<TicketCompra[]>(this.apiServer + 'item/compra/' + idTicket);
  }

  //Está realizada de manera diferente al post de cliente por no conocer bien el json de retorno, lo que deja sin funcionamiento a la función
  postCompra(compra: Compras): Observable<Object> {
    console.log("comienza envío material");
    return this.http.post(this.apiServer + 'compra/compra', compra);
  }

  postCliente(cliente: Clientes) {
    console.log("comienza envío cliente");
    return this.http.post<Clientes>(this.apiServer + 'cliente', cliente).pipe(
      tap((newHero: Clientes) => console.log(`added hero w/ id=${newHero.idCliente}`)),
      catchError(this.handleError<Clientes>('addHero'))
    );
  }

  postEmpleado(empleado: Empleados) {
    console.log("comienza envío empleado");
    return this.http.post<Empleados>(this.apiServer + 'empleado', empleado).pipe(
      tap((newHero: Empleados) => console.log(`added hero w/ id=${newHero.idEmpleado}`)),
      catchError(this.handleError<Empleados>('addHero'))
    );
  }

  iniciarSesion(usuario: Empleados) {
    return this.http.post<Empleados>(this.apiServer + 'empleado/sesion', usuario).pipe(
      tap((newHero: Empleados) => console.log(`added hero w/ id=${newHero.idEmpleado}`)),
      catchError(this.handleError<Empleados>('addHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    console.log("handler error");
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error("un error");
      console.log(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
