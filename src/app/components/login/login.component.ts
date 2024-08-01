import { Component, Input } from '@angular/core';
import {Router} from "@angular/router"
import { UserService } from '../../services/user.service';
import { Base64Service } from '../../core/services/base64.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private router: Router,
              private UserService:UserService,
              private base64:Base64Service,
              ){ };

  ngOnInit(){
  }

  onLogin(){
    const usuario = document.getElementById('usuario') as HTMLInputElement;
    const senha = document.getElementById('senha') as HTMLInputElement;
    this.UserService.getUser(usuario.value.toUpperCase(),senha.value).subscribe(user=>{
      user = user;
      if(user.token != ''){
        this.UserService.deslogar();
        this.UserService.autorizar(user.token,usuario.value);
        this.router.navigate(['/dash']);
      }
    })


  }




}
