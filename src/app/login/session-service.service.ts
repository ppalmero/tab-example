import { Injectable } from '@angular/core';
import { Empleados } from '../model/empleados';

@Injectable({
  providedIn: 'root'
})
export class SessionServiceService {

  constructor() { }

  setToken(token: Empleados): void {
    sessionStorage.setItem('authToken', token.contraseniaEmpleado);
    sessionStorage.setItem('idEmpleado', token.idEmpleado.toString());
    sessionStorage.setItem('usuarioEmpleado', token.usuarioEmpleado);
    sessionStorage.setItem('sucursalEmpleado', token.sucursal?token.sucursal!.idSucursal.toString():"");
    sessionStorage.setItem('tiempoConexion', (new Date()).getTime().toString());
  }

  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  getIDEmpleado(): number | null {
    if (sessionStorage.getItem('idEmpleado')){
      return +sessionStorage.getItem('idEmpleado')!;
    } else {
      return null;
    }
  }

  getTUsuarioEmpleado(): string | null {
    if (sessionStorage.getItem('usuarioEmpleado')){
      return sessionStorage.getItem('usuarioEmpleado');
    } else {
      return null;
    }  
  }

  getTiempoConexion(): number | null {
    if (sessionStorage.getItem('tiempoConexion')){
      return +sessionStorage.getItem('tiempoConexion')!;
    } else {
      return null;
    }
  }

  getIDSucursal(): number | null {
    if (sessionStorage.getItem('sucursalEmpleado')){
      return +sessionStorage.getItem('sucursalEmpleado')!;
    } else {
      return null;
    }    
  }

  clearToken(): void {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('idEmpleado');
    sessionStorage.removeItem('usuarioEmpleado');
    sessionStorage.removeItem('sucursalEmpleado');
    sessionStorage.removeItem('tiempoConexion');
  }

  isAuthenticated(): boolean {
    if (this.getToken() !== null) {
      return true;
    } else {
      return false;
    }
  }

  renovarSesion() {
    sessionStorage.setItem('tiempoConexion', (new Date()).getTime().toString());
  }
}
