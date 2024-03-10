import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { AutenticacionService } from '../comunicacion/autenticacion.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  usuario: Usuario = {nombreUsuario: "", contrasenaUsuario: ""};
  loggedIn: boolean = false;
  logResult: string = "";
  subscriptionUsuario!: Subscription;
  
  constructor(private router: Router, private authService: AutenticacionService) { }

  ngOnInit(): void {
    this.subscriptionUsuario = this.authService.currentUser$.subscribe((empleado) => {
      //const authToken = 'your_auth_token';
      console.log("subscripcion usuario");
      console.log(empleado);
      if (empleado && empleado.idEmpleado != 0) {
        this.loggedIn = true;
        this.usuario.contrasenaUsuario = "";
        this.logResult = "ok";
        this.router.navigate(['.']);
        /*this.getService.getCajaAbierta(empleado.sucursal?.idSucursal!).subscribe(cajaAbierta => {
          //console.log("lista clientes"  + dataClientes);
          this.authService.setCaja(cajaAbierta);
        });*/
        //this.setUser();
      } else {
        this.loggedIn = false;
        this.logResult = "nook";
      }
      console.log("Log result: " + this.logResult);
    });
  }

  
  onNoClick(){
    //this.router.navigate(['.']);
  }

  ngAfterViewInit(): void {
    this.logResult = "";
  }

  ingresar(): void {
    this.authService.login(this.usuario.nombreUsuario, this.usuario.contrasenaUsuario);
    /*if (success) {
      this.loggedIn = true;
      this.router.navigate(['.']);
      //this.setUser();
    } else {
      alert('Nombre de usuario o contraseña incorrectos.');
    }*/
  }
}
