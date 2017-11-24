import { Injectable, Injector } from '@angular/core';
import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AuthVerificator } from '../auth-verificator';

@Injectable()
export class HttpResponsesHandler implements HttpInterceptor {

    // Para evitar realizar demasiadas peticiones vamos a cachear las peticiones fallidas
    cachedRequests: Array<HttpRequest<any>> = [];

    constructor(private router: Router, private auth: AuthVerificator) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).do((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                // En caso de que tengamos que capturar un token que nos pasa el servidor
                // O cualquier otro dato de las respuestas, podremos hacerlo con el objeto event
                // En este vendrán todos los datos, cabeceras, etc de la respuesta
            }
        }, (err: any) => {
            if (err instanceof HttpErrorResponse) {
                if (err.status === 401) {
                    // Cacheamos la petición mientras el usuario no se logea para lanzarlas todas juntas cuando se encuentre logeado
                    this.collectFailedRequest(request);
                    // El servidor nos ha devuelto un error por intentar acceder a un recurso para el que no estabamos autorizados
                    // Las siguientes situaciones son posibles:
                    // - No estabamos logeados. Redirigimos al usuario a la página de login
                    // - Estábamos logeados. Cacheamos la peticion e iniciamos el proceso de renovación del access_token
                    //   cuando termine relanzaremos todas las peticiones
                    // - Hemos tratado de acceder a un recurso que tiene niveles de acceso susperiores a los que tiene
                    //   nuestro usuario. Mostramos en pantalla al usuario que no puede hacer eso con una modal u otro aviso cualquiera.
                    if (localStorage.getItem('access_token') !== '') {
                        // No estábamos logeados, redirigimos a la pantalla de login
                        this.router.navigate(['login']);
                    }

                    // Verificamos que el token no haya expirado para renovarlo y relanzar las peticiones cacheadas
                    this.auth.isTokenExpired((result) => {
                        // Result habrá devuelto true o false según el resultado del refresco
                        if (result) {
                            // Relanzamos las peticiones cacheadas
                        }
                    });

                    // Como aún no está implementada la funcionalidad de roles de usuario dejamos pendiente el tercer caso
                } else if (err.status === 500) {
                    // Enviamos a la página de error 500 para avisar al usuario de que hubo un error
                    // En este punto se puede hacer casi cualquier cosa:
                    // - Enviar un mail al desarrollador
                    // - Mostrar el error por pantalla en la página
                    // - Y un largo etcétera
                    // En nuestro caso dado que esto solo es un ejemplo vamos a redirigir al usuario a la página de aviso
                    this.router.navigate(['/server-error']);
                } else if (err.status === 404) {
                    this.router.navigate(['/the-void']);
                }
            }
        });
    }

    // Dado que el token tiene una validez temporal esta función cachea las peticiones erróneas
    // que se producirán mientras el token está renovándose
    public collectFailedRequest(request): void {
        this.cachedRequests.push(request);
    }
    // Cuando el token termine de renovarse tratamos de renovar las peticiones que fallaron en el proceso
    public retryFailedRequests(): void {
        // Lanzamiento
    }
}
