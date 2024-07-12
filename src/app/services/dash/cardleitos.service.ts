import { Injectable } from '@angular/core';
import { cardleitos } from '../../models/dash/cardleitos.model';
import {Busca} from '../../globals.services';

@Injectable({
  providedIn : 'root'
})

export class CardLeitosService{

  constructor( private Busca : Busca){}

  async getCardLeitos(){
    return await this.Busca.getHtml<cardleitos[]>('/cardleitos');
  }

}
