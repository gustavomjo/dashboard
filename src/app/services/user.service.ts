import { user } from './../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn:'root'
})

export class userService{
  private url = environment.api;
  constructor(private HttpClient : HttpClient  ){}

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

