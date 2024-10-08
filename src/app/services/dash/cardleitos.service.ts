import { Injectable } from '@angular/core';
import { cardleitos } from '../../models/dash/cardleitos.model';
import {Busca} from '../../global/globals.services';
import { cardleitosdetalhado } from '../../models/dash/cardleitosdetalhado.model';

@Injectable({
  providedIn : 'root'
})

export class CardLeitosService{

  constructor( private Busca : Busca){}

  async getCardLeitos(){
    return await this.Busca.getHtml<cardleitos[]>('/cardleitos');
  }

  async getCardLeitosDetalhado(){
    return await this.Busca.getHtml<cardleitosdetalhado[]>('/leitodetalhado');
  }

}
