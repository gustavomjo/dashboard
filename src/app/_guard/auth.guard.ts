
// import { userService } from './../services/user.service';
// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {


//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './../services/user.service';  // Importe o userService aqui

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {

  constructor(
    private UserService: UserService,  // Injete o userService aqui
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    //falta realizar uma validação de token
    //esta validação é fraca.
    if (this.UserService._isLogged()) {  // Use o userService aqui
      return true;
    } else {
      // Redirecionar para a página de login ou página inicial
      this.router.navigate(['/login']);
      return false;
    }
  }
}
