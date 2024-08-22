import { Injectable } from '@angular/core';
import {Busca} from '../../global/globals.services';
import { finContasRP } from '../../models/dash-fin/finContasRP.model';

@Injectable({
  providedIn:'root'
})

export class finContasRPService{

  constructor( private Busca : Busca){}

  async getContasRP(){
    return await this.Busca.getHtml<finContasRP[]>('/contasrp');
  }


}
