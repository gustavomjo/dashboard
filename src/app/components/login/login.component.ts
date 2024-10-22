import { Component, Input } from '@angular/core';
import {Router} from "@angular/router"
import { UserService } from '../../services/user.service';
import { Base64Service } from '../../core/services/base64.service';
import { NotificationService } from '../../services/notification.service';
import { catchError, of } from 'rxjs';
import { NotificationModule } from "../notification/notification.module";
import { ConfigService } from '../../services/config.service';
import { globalVars } from '../../global/globals';
import { environment } from '../../../environments/environment';

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
              private notificationService: NotificationService,
              private configService: ConfigService,
              ){ };

  ngOnInit(){
  }

  onLogin(){
    const usuario = document.getElementById('usuario') as HTMLInputElement;
    const senha = document.getElementById('senha') as HTMLInputElement;
    this.UserService.getUser(usuario.value.toUpperCase(), senha.value)
    .pipe(
      catchError(err => {
        // console.error('Erro ao fazer login:', err); // Log completo do erro para inspeção
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

        this.configService.getConfig().subscribe(config => {
          globalVars.intervalTime = (config.atualizacao || 10) * 1000;
          environment.api = config.servidor;
          // console.log('API URL:', environment.api);
        }, error => {
          console.error('Erro ao carregar a configuração', error);
        });
        // console.log(environment.api)
        this.router.navigate(['/dash']);
      }
    });


  }




}
