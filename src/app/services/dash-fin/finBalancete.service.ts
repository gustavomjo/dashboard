import { Injectable } from '@angular/core';
import {Busca} from '../../global/globals.services';
import { finBalancete } from '../../models/dash-fin/finBalancete.model';

@Injectable({
  providedIn:'root'
})

export class finBalanceteService{

  constructor( private Busca : Busca){}

  async getfinBalancete(ano:string){
    return await this.Busca.getHtml<finBalancete[]>('/finbalancete?ano='+ano)
  }
}


