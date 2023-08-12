import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Sucursales } from '../model/sucursales';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private estaLogueado = false;
  private currentUser: Usuario; // Aquí podrías almacenar los datos del usuario si es necesario

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  //setUserLoggedIn(isLoggedIn: boolean): void {
  //

  sucursal: Sucursales = { idSucursal: 1, nombreSucursal: 'Sucursal 1', direccionSucursal: 'Santa Fe 354', telefonoSucursal: '2664206611' };

  constructor(/*private userStatusService: UserStatusService*/) { }

  login(username: string, password: string): boolean {
    // Lógica de autenticación, por ejemplo, realizar una solicitud al servidor
    // y verificar las credenciales del usuario. Si el usuario es autenticado correctamente:
    if (username == 'user' && password == 'user') {
      this.estaLogueado = true;
      this.currentUser = { nombreUsuario: username, contrasenaUsuario: password /* otros datos del usuario */ };
      //this.userStatusService.setUserLoggedIn(true);
      this.isLoggedInSubject.next(this.estaLogueado);
      return this.estaLogueado;
    } else {
      return false;
    }
  }

  logout(): void {
    // Lógica para cerrar sesión
    this.estaLogueado = false;
    this.currentUser = { nombreUsuario: "", contrasenaUsuario: "" /* otros datos del usuario */ };;
    //this.userStatusService.setUserLoggedIn(false);
  }

  isAuthenticated(): boolean {
    return this.estaLogueado;
  }

  getCurrentUser(): Usuario {
    return this.currentUser;
  }

  getCurrentSucursal(): Sucursales {
    return this.sucursal;
  }
}
