import { Injectable } from '@angular/core';
import { cardfaturamento } from '../../models/dash/cardfaturamento.model';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn : 'root'
})

export class CardFaturamentoService{

  constructor( private Busca : Busca){}

  async getCardFaturamento(){

    return await this.Busca.getHtml<cardfaturamento[]>('/cardfaturamento');
  }

}
