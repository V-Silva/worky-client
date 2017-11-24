import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthVerificator } from '../auth-verificator';

@Injectable()
export class AuthGuardService {

  constructor(public auth: AuthVerificator, public router: Router) { }
  canActivate(): boolean {
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

}
