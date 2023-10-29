import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Sucursales } from '../model/sucursales';
import { Usuario } from '../model/usuario';
import { Empleados } from '../model/empleados';
import { ComunicacionService } from './comunicacion.service';
import { SessionServiceService } from '../login/session-service.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private estaLogueado = false;
  //private currentUser: Usuario; // Aquí podrías almacenar los datos del usuario si es necesario

  private usuarioNoLogueado: Empleados = {
    idEmpleado: 0,
    apellidoEmpleado: "",
    dniEmpleado: 0,
    nombreEmpleado: "",
    telefonoEmpleado: "",
    contraseniaEmpleado: "",
    permisoEmpleado: "",
    usuarioEmpleado: "NO LOGUEADO",
  }

  private currentUserSubject$ = new Subject<Empleados>();
  currentUser$ = this.currentUserSubject$.asObservable();
  private currentUser: Empleados = { ...this.usuarioNoLogueado }; // Aquí podrías almacenar los datos del usuario si es necesario

  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();
  isLoggedIn: boolean = false;
  //setUserLoggedIn(isLoggedIn: boolean): void {
  //

  sucursal: Sucursales = { idSucursal: 0, nombreSucursal: '', direccionSucursal: '', telefonoSucursal: '' };

  constructor(private sessionService: SessionServiceService, private comunicacionService: ComunicacionService,/*private userStatusService: UserStatusService*/) { }

  login(username: string, password: string) {
    // Lógica de autenticación, por ejemplo, realizar una solicitud al servidor
    // y verificar las credenciales del usuario. Si el usuario es autenticado correctamente:
    /*if (username == 'user' && password == 'user') {
      this.estaLogueado = true;
      this.currentUser = { nombreUsuario: username, contrasenaUsuario: password };
      //this.userStatusService.setUserLoggedIn(true);
      this.isLoggedInSubject.next(this.estaLogueado);
      return this.estaLogueado;
    } else {
      return false;
    }*/
    let usuario: Empleados = {
      idEmpleado: 1, apellidoEmpleado: "", nombreEmpleado: "", dniEmpleado: 0, telefonoEmpleado: "",
      permisoEmpleado: "", usuarioEmpleado: username, contraseniaEmpleado: password,
      sucursal: { idSucursal: 1, nombreSucursal: "", direccionSucursal: "", telefonoSucursal: "" }
    }

    console.log("Empleado enviado");
    console.log(usuario);
    this.comunicacionService.iniciarSesion(usuario).subscribe(empleado => {
      //getEmpleadosxID(this.sucursal).subscribe(empleado => {
      console.log("Empleado recibido");
      console.log(empleado);
      if (empleado.idEmpleado != 0) {
        this.setUserLoggedIn(empleado);
      } else {
        this.logout();
      }
      // } else {
      //this.isLoggedIn = true;
      //this.currentUser = { username: username, /* otros datos del usuario */ };
      //this.userStatusService.setUserLoggedIn(true);
      // }
    });
  }

  setUserLoggedIn(empleado: Empleados): void {
    this.isLoggedIn = empleado.idEmpleado != 0;
    this.isLoggedInSubject.next(this.isLoggedIn);
    this.currentUser =  { ...empleado };
    this.currentUserSubject$.next(this.currentUser);
    this.sessionService.setToken(empleado);//VER si viene vacía
  }

  logout(): void {
    // Lógica para cerrar sesión
    this.isLoggedInSubject.next(false);
    this.sessionService.clearToken();
    this.currentUser = { ...this.usuarioNoLogueado };
    this.currentUserSubject$.next(this.currentUser);
  }

  isAuthenticated(): boolean {
    let tiempoConexion = this.sessionService.getTiempoConexion();
    if (this.sessionService.getToken() && tiempoConexion && ((new Date()).getTime() - tiempoConexion) < 3000000){
      //crear usuario
      let usuario: Empleados = {
        idEmpleado: this.sessionService.getIDEmpleado()!, apellidoEmpleado: "", nombreEmpleado: "", dniEmpleado: 0, telefonoEmpleado: "",
        permisoEmpleado: "", usuarioEmpleado: this.sessionService.getTUsuarioEmpleado()!, contraseniaEmpleado: this.sessionService.getToken()!, 
        sucursal: { idSucursal: this.sessionService.getIDSucursal()!, nombreSucursal: "", direccionSucursal: "", telefonoSucursal: "" }
      }
      this.isLoggedInSubject.next(true);
      this.currentUser = { ...usuario };
      this.currentUserSubject$.next(this.currentUser);
      this.sessionService.renovarSesion();
      return true;
    } else {
      console.log("Tiempo de conexion: " + tiempoConexion);
      console.log("Tiempo actual: " + (new Date()).getTime());
      return false;
    }
  }

  getCurrentUser(): Empleados {
    return this.currentUser;
  }

  getCurrentSucursal(): Sucursales {
    if (this.isAuthenticated()){
      return this.currentUser.sucursal!;
    } else {
      return this.sucursal;
    }
    
  }
}
