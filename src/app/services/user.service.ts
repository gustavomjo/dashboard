import { user } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { ConfigService } from './config.service';
import { JwtDecodeService } from './jwt-decode.service';
import {Busca} from './../global/globals.services';
import { usuarios } from '../models/usuarios.model';

@Injectable({
  providedIn:'root'
})

export class UserService{
  private url = "";
  constructor(private HttpClient : HttpClient,
              private configService: ConfigService,
              private Busca : Busca )
  {
    this.configService.getConfig().subscribe(config => {
      environment.api = config.servidor;
      this.url = config.servidor;
    }, error => {
      console.error('Erro ao carregar a configuração', error);
    });
  }

  async getUsuarios(){
    return await this.Busca.getHtml<usuarios[]>('/usuarios')
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

  // _isLogged = () => !! localStorage.getItem('login');

  _isLogged(): boolean {
    // ...outras rotinas
    // console.log(this.jwtDecoder.decodePayloadJWT(localStorage.getItem('token')).dash);

    // Verifica o login
    return !!localStorage.getItem('login');
  }



}

