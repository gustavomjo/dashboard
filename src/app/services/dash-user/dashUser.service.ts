import { Injectable } from '@angular/core';
import {Busca} from '../../globals.services';
import { dashuser } from '../../models/dash-user/dash-user.model';

@Injectable({
  providedIn:'root'
})

export class dashUserService{

  constructor( private Busca : Busca){}

  async getDash(cod_user : number){
    return await this.Busca.getHtml<dashuser[]>('/dashuser?usuario=1')
  }

  deleteComponent(usuario:number,dash : string):void{
    this.Busca.deleteRequest('/deletecomponent?usuario='+usuario+'&componente='+dash);
  }

  postComponent(usuario:number,dash : string):void{
    this.Busca.postComponent('/postcomponent','usuario='+usuario+'&componente='+dash);
  }

}

