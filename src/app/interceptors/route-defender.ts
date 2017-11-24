import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { routeCollection } from '../app.module';
// import { AuthHandlerService } from '../services/auth-handler.service';

@Injectable()
export class RouteDefender implements HttpInterceptor {


    constructor(private router: Router, /*private auth: AuthHandlerService*/) { }

    // El interceptor revisa cada petición HTTP para agregarle los datos requeridos por el backend
    // Tokens y autorizaciones, con el motivo de que el backend no devuelva un 401 (Unauthorized)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let headers = req.headers.set('Accept', 'application/json');
        // Agregamos a los headers la proteccion CSFR para el backend, que evita ataques
        // Actualmente la aplicación utiliza tan solo las peticiones HTTP a la API
        // En caso de hacer peticiones web normales podemos utilizar estas cabeceras
        // Para la protección contra CSRF:
        /*
        headers = req.headers.set('X-Requested-With', 'XMLHttpRequest');
        headers = req.headers.set('X-CSRF-TOKEN', 'CCCCCCCCCCCCCCCCCCCCCCC');
        */

        // Autenticación:
        const access_token = localStorage.getItem('access_token');
        const token_type = localStorage.getItem('token_type');
        if (access_token !== '' && token_type !== '') {
            // Verificamos si tenemos un token de acceso, en caso de tenerlo lo enviamos en las cabeceras
            // Para la autenticación
            headers = req.headers.set('Authorization', token_type + ' ' + access_token);
        }

        const authReq = req.clone({
            headers: headers
        });
        return next.handle(authReq);
    }
}
