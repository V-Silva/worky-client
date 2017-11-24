import { Injectable } from '@angular/core';
import { ApiConnectorService } from './api-connector.service';
import { AuthVerificator } from '../auth-verificator';

@Injectable()
export class AuthHandlerService {

  base = 'http://localhost:8000';
  logged = false;
  authData = null;
  apiHandler = null;
  client_id = 3;
  client_secret = 'QOd1kyE5kDX0NM94zLiWxjWxKTa5wmz0uhji9sQD';

  constructor(api: ApiConnectorService, private authVerificator: AuthVerificator) {
    this.apiHandler = api;
   }

  login (login, password, callback) {
    const credentials = {
      username: login,
      password: password,
      grant_type: 'password',
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: ''
    };
    this.apiHandler.postUrl('/oauth/token', credentials, (data) => {
      this.authData = data;
      // Hemos accedido correctamente, almacenamos los datos para su persistencia y utilización
      this.authVerificator.login(data);
      // Devolvemos el flujo
      callback(true);
    }, (err) => {
      this.authVerificator.logout();
      callback(false);
    });
  }

  logout() {
    this.authVerificator.logout();
  }

  public refreshAccessToken(callback) {
    // Envía una petición al servidor para solicitar un nuevo token de acceso
    // Es un post
    const token_data = {
      refresh_token: localStorage.getItem('refresh_token'),
      grant_type: 'refresh_token',
      client_id: this.client_id,
      client_secret: this.client_secret,
      scope: ''
    };
    this.apiHandler.postUrl('/oauth/token/refresh', token_data, (data) => {
      this.authData = data;
      // Hemos accedido correctamente, almacenamos los datos para su persistencia y utilización
      console.log(data);
      this.authVerificator.refreshTokenData(data);
      // Una vez refrescado el token devolvemos el control con una respuesta booleana
      callback(true); // Se ha refrescado, devolvemos flujo de ejecución avisando del refresco
    }, (err) => {
      this.authVerificator.logout();
      callback(false);  // No se ha podido refrescar y se ha perdido la autenticación
    });
  }
}

/*
{
  token_type: "Bearer",
  expires_in: 1296000,
  access_token: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjIxZj…mMhaJ6FyD1y9No0yfql8bsGU6tI8H4mSBJkueOo-HFLAY6u9M",
  refresh_token: "def50200097bfd91562619d18dbf7d27297e7e634925b0a151…6fd1c64656d4d5c08a2a87224cdb61e720d659bf10499062b"
}
*/
