
// import { userService } from './../services/user.service';
// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {


//   return true;
// };

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './../services/user.service';  // Importe o userService aqui
import { JwtDecodeService } from '../services/jwt-decode.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  dash = false;
  dash_fin = false;
  dash_fat = false;
  dash_farm = false;
  dash_receitas = false;
  admin = false;

  constructor(
    private UserService: UserService,  // Injete o userService aqui
    private router: Router,
    private jwtDecoder : JwtDecodeService,
    private notificationService: NotificationService
  ) {}

  firstRoute(){
    if(this.dash){}
    this.router.navigate(['/dash']);
    if(this.dash_receitas)
      this.router.navigate(['/dash-receitas']);
    if(this.dash_farm)
      this.router.navigate(['/dash-farm']);
    if(this.dash_fin)
      this.router.navigate(['/dash-fin']);
    if(this.dash_fat)
      this.router.navigate(['/dash-fat']);

    // return '';
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    /*
      realizado esta verificação de rotas, pelo arquivo JWT é possivel
      saber quais rotas o usuario tem permissão.
      antes de direcionar a rota, faz uma verificação se o usuário tem
      a permissão, caso nao tiver jogo ele para a primeira rota disponível.

      caso o usuário não tenha nenhuma permissão dou uma mensagem e nao deixo
      ele fazer acessoa nenhum módulo.
    */
    if (this.UserService._isLogged()) {  // Use o userService aqui
      const payload = this.jwtDecoder.decodePayloadJWT(localStorage.getItem('token'));
      this.dash = payload.dash == 'S';
      this.dash_fin = payload.dash_fin == 'S';
      this.dash_fat = payload.dash_fat == 'S';
      this.dash_farm = payload.dash_farm == 'S';
      this.dash_receitas = payload.dash_receitas == 'S';
      this.admin = payload.admin == 'S';
      const currentRoute = state.url.replace('/', '');

      if(this.dash || this.dash_fin || this.dash_fat || this.dash_farm || this.dash_receitas){
        switch(currentRoute){
          case 'dash' :
            if(!this.dash){
              this.firstRoute();
            }
          break;
          case 'dash-fin' :
            if(!this.dash_fin){
              this.firstRoute();
            }
          break;
          case 'dash-fat' :
            if(!this.dash_fat){
              this.firstRoute();
            }
          break;
          case 'dash-farm' :
            if(!this.dash_farm){
              this.firstRoute();
            }
          break;
          case 'dash-receitas' :
            if(!this.dash_receitas){
              this.firstRoute();
            }
          break;

          case 'permissoes' :
            if(!this.admin){
              this.firstRoute();
            }
          break;
        }
      }
      else{
        this.notificationService.showNotification('Usuário sem permissão de acesso!');
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      // Redirecionar para a página de login ou página inicial
      this.router.navigate(['/login']);
      return false;
    }
  }
}
