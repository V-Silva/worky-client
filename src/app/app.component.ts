import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { AuthVerificator } from './auth-verificator';
import { Router } from '@angular/router';
// Decorados
@Component({
  selector: 'app-root',   // tag html
  templateUrl: './templates/app.component.html',    // layout
  styleUrls: ['./assets/css/app.component.css', '../assets/css/font-awesome.min.css'],      // path a los CSS
  animations: [
    trigger('myAnimation', [
      state('small', style({
        transform: 'scale(1)',
      })),
      state('large', style({
        transform: 'scale(0.5)',
      })),

      transition('small => large', animate('300ms ease-in-out')),
      transition('large => small', animate('150ms ease-out-in')),
    ]),
  ]
})
// Clase del componente
export class AppComponent {
  state = 'small';
  authHandler = null;
  constructor(authHandler: AuthVerificator, private router: Router) {
    this.authHandler = authHandler;
  }

  animateMe() {
    this.state = (this.state === 'small' ? 'large' : 'small');
  }

  logTheUserOut() {
    this.authHandler.logout();
    this.router.navigate(['login']);
  }
}
