import { Component, Input } from '@angular/core';
import {Router} from "@angular/router"
import { UserService } from '../../services/user.service';
import { Base64Service } from '../../core/services/base64.service';
import { NotificationService } from '../../services/notification.service';
import { catchError, of } from 'rxjs';
import { NotificationModule } from "../notification/notification.module";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [NotificationModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private router: Router,
              private UserService:UserService,
              private notificationService: NotificationService
              ){ };

  ngOnInit(){
  }

  onLogin(){
    const usuario = document.getElementById('usuario') as HTMLInputElement;
    const senha = document.getElementById('senha') as HTMLInputElement;
    this.UserService.getUser(usuario.value.toUpperCase(), senha.value)
    .pipe(
      catchError(err => {
        console.error('Erro ao fazer login:', err); // Log completo do erro para inspeção
        if (err.status === 401) {
          this.notificationService.showNotification('Usuário ou senha inválido!');
        } else if (err.status === 0) {
          // Verifica se o status é 0, que geralmente indica erro de rede
          this.notificationService.showNotification('Erro de conexão: Servidor indisponível. Tente novamente mais tarde.');
        } else {
          this.notificationService.showNotification('Ocorreu um erro ao tentar fazer login.');
        }
        return of(null);
      })
    )
    .subscribe(user => {
      if (user?.token) {
        this.UserService.deslogar();
        this.UserService.autorizar(user.token, usuario.value);
        this.router.navigate(['/dash']);
      }
    });


  }




}
