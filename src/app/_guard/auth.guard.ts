import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { JwtDecodeService } from '../services/jwt-decode.service';
import { NotificationService } from '../services/notification.service';
import { globalVars } from '../global/globals';

interface Payload {
  dash: string;
  dash_fin: string;
  dash_fat: string;
  dash_farm: string;
  dash_receitas: string;
  admin: string;
  developer : string;
}

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private jwtDecoder: JwtDecodeService,
    private notificationService: NotificationService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.setPermissionsFromToken(); // Defina as permissões ao iniciar

    if (!this.userService._isLogged()) {
      this.router.navigate(['/login']);
      return false;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      this.notificationService.showNotification('Token não encontrado!');
      this.router.navigate(['/login']);
      return false;
    }

    const payload: Payload = this.jwtDecoder.decodePayloadJWT(token);
    if (!payload) {
      this.notificationService.showNotification('Token inválido!');
      this.router.navigate(['/login']);
      return false;
    }

    const hasPermission = this.checkPermissions(payload, state.url);

    if (!hasPermission) {
      this.notificationService.showNotification('Usuário sem permissão de acesso!');
      this.router.navigate(['/login']);
      return false;
    }

    return true; // Permita o acesso se todas as verificações passarem
  }

  private checkPermissions(payload: any, currentUrl: string): boolean {
    // Defina um tipo literal para as chaves do objeto de permissões
    type PermissionKeys = '/dash' | '/dash-fin' | '/dash-fat' | '/dash-farm' |
      '/dash-receitas' | '/permissoes'| '/dash-user' |'/dash-user-edit' | '/ialuk';

    // Use um objeto com tipos explícitos
    const permissions: Record<PermissionKeys, boolean> = {
      '/dash': payload.dash === 'S',
      '/dash-fin': payload.dash_fin === 'S',
      '/dash-fat': payload.dash_fat === 'S',
      '/dash-farm': payload.dash_farm === 'S',
      '/dash-receitas': payload.dash_receitas === 'S',
      '/permissoes': payload.admin === 'S',
      '/dash-user': true,
      '/dash-user-edit': true,
      '/ialuk': true, // colocar no jwt

    };

    if (!permissions[currentUrl as PermissionKeys]) {
      return this.redirectToFirstAvailableRoute(payload);
    }

    return true; // O usuário tem permissão para acessar a rota
  }

  private redirectToFirstAvailableRoute(payload: Payload) : boolean {
    if (payload.dash === 'S') {
      this.router.navigate(['/dash']);
    } else if (payload.dash_fin === 'S') {
      this.router.navigate(['/dash-fin']);
    } else if (payload.dash_fat === 'S') {
      this.router.navigate(['/dash-fat']);
    } else if (payload.dash_farm === 'S') {
      this.router.navigate(['/dash-farm']);
    } else if (payload.dash_receitas === 'S') {
      this.router.navigate(['/dash-receitas']);
    } else {
      return false;
    }
    return true;
  }

  private setPermissionsFromToken(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      return; // Se não houver token, não faz nada
    }

    const payload: Payload = this.jwtDecoder.decodePayloadJWT(token);
    if (payload) {
      globalVars.dash = payload.dash === 'S';
      globalVars.dash_fin = payload.dash_fin === 'S';
      globalVars.dash_fat = payload.dash_fat === 'S';
      globalVars.dash_farm = payload.dash_farm === 'S';
      globalVars.dash_receitas = payload.dash_receitas === 'S';
      globalVars.admin = payload.admin === 'S';
      globalVars.developer = payload.developer === 'S';
    }
  }
}
