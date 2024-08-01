import { user } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';

@Injectable({
  providedIn:'root'
})

export class UserService{
  private url = "";
  constructor(private HttpClient : HttpClient,private configService: ConfigService  ){
    this.configService.getConfig().subscribe(config => {
      environment.api = config.servidor;
      this.url = config.servidor;
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
  }

  getUser(user:string,senha:string){
    return this.HttpClient.get<user>(this.url+'/getuser?usuario='+user+'&senha='+senha);
  }

  autorizar(token:string,user:string){
    //para a validação de token
    //armazenar o token no localstorage e verificar no server se e valida;
    localStorage.setItem('login','sim');
    localStorage.setItem('token',token);
    localStorage.setItem('user',user);
  }

  deslogar(){
    localStorage.clear();
  }

  _isLogged = () => !! localStorage.getItem('login');



}

