import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Materiales } from '../model/materiales';
import { Clientes } from '../model/clientes';
import { Compras } from '../model/compras';
import { TicketCompra } from '../model/ticket-compra';

@Injectable({
  providedIn: 'root'
})
export class ComunicacionService {

  private apiUrlClientes = 'https://my.api.mockaroo.com/clientes.json?key=1d95ea90';
  private apiUrlListaMateriales = 'https://my.api.mockaroo.com/materiales.json?key=1d95ea90';
  private apiServer = 'back/';
  private postURLCompra = 'back/';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private http: HttpClient) { }

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
    return this.http.get<Compras[]>("http://localhost:8080/compra");//this.apiServer + 'compra');
  }

  getListaMaterialesDeUnTickets(idTicket:number): Observable<TicketCompra[]> {
    // Hacer una llamada inicial al servidor y luego hacer llamadas recurrentes cada 5 segundos
    return this.http.get<TicketCompra[]>(this.apiServer + 'item/compra/' + idTicket);
  }

  //Está realizada de manera diferente al post de cliente por no conocer bien el json de retorno, lo que deja sin funcionamiento a la función
  postCompra(compra: Compras): Observable<Object> {
    console.log("comienza envío material");
    /*return this.http.post<Compras>(this.postURLCompra + 'compra/compra', compra).pipe(
      tap((compraNueva: Compras) => console.log(`added compra w/ id=${compraNueva.idCompra}`)),
      catchError(this.handleError<Compras>('addCompra'))
    );*/
    return this.http.post(this.postURLCompra + 'compra/compra', compra);/*.subscribe(
      (response) => {
        // Maneja la respuesta del servidor
        console.log(response);
      },
      (error) => {
        // Maneja el error
        console.error(error);
      }
    );*/
  }

  postCliente(cliente: Clientes) {
    console.log("comienza envío cliente");
    return this.http.post<Clientes>(this.apiServer + 'cliente', cliente).pipe(
      tap((newHero: Clientes) => console.log(`added hero w/ id=${newHero.idCliente}`)),
      catchError(this.handleError<Clientes>('addHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    console.log("handler error");
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error("un error" + error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
