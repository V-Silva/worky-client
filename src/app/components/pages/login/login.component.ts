import { Component, OnInit } from '@angular/core';
import { AuthHandlerService } from '../../../services/auth-handler.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: '../../../templates/login.component.html',
  styleUrls: ['../../../assets/css/app.component.css', '../../../assets/css/login.component.css']
})
export class LoginComponent implements OnInit {

  authHandler = null;
  login = null;
  password = null;
  loginMessage = null;

  constructor(auth: AuthHandlerService, private router: Router) {
    this.authHandler = auth;
  }

  ngOnInit() {
  }

  handleLogin() {
    console.log('Login with: ' + this.login + ' AND ' + this.password);
    this.authHandler.login(this.login, this.password, (result) => {
      console.log(result);
      if (result) {
        this.router.navigate(['/profile']);
      } else {
        this.loginMessage = `Las credenciales no corresponden a ningún usuario almacenado en nuestra base de datos. 
          Comprueba los datos y vuelve a intentarlo.`;
      }
    });
  }

}
