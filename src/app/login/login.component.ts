import { Component } from '@angular/core';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';
import { AutenticacionService } from '../comunicacion/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  usuario: Usuario = {nombreUsuario: "user", contrasenaUsuario: "user"};
  loggedIn: boolean = false;
  
  constructor(private router: Router, private authService: AutenticacionService) { }

  ngOnInit(): void {
  }

  
  onNoClick(){
    this.router.navigate(['.']);
  }

  ingresar(): void {
    const success = this.authService.login(this.usuario.nombreUsuario, this.usuario.contrasenaUsuario);
    if (success) {
      this.loggedIn = true;
      this.router.navigate(['.']);
      //this.setUser();
    } else {
      alert('Nombre de usuario o contraseña incorrectos.');
    }
  }
}
