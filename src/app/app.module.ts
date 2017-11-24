// Módulos a importar de Angular
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

// Componentes de la aplicacion
// Páginas
import { AppComponent } from './app.component';
import { LoginComponent } from './components/pages/login/login.component';
import { IndexComponent } from './components/pages/index/index.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { ServerErrorComponent } from './components/pages/server-error/server-error.component';
import { Error404Component } from './components/pages/error404/error404.component';

// Servicios de datos y manejadores de la aplicacion
import { ApiConnectorService } from './services/api-connector.service';
import { AuthHandlerService } from './services/auth-handler.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthVerificator } from './auth-verificator';

// Proveedores de servicios
import { RouteDefender } from './interceptors/route-defender';
import { HttpResponsesHandler } from './interceptors/http-responses-handler';

export const routeCollection: Routes = [
  { path: '', component: IndexComponent },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuardService] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  // Http Error Routes
  { path: 'the-void', component: Error404Component },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: Error404Component }    // Para cualquier otra ruta será mostrada la página de error 404
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    CompaniesComponent,
    ProfileComponent,
    ServerErrorComponent,
    Error404Component,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(
      routeCollection,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [
    ApiConnectorService,
    AuthHandlerService,
    AuthGuardService,
    AuthVerificator,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpResponsesHandler,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouteDefender,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
