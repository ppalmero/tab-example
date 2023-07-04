import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatoFechaService {

  opcionesFormato = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  };

  formatearFecha(fecha: Date): string{
    return fecha.toLocaleDateString('es-ES', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: 'numeric'
    }) + "h";
  }
}
