import { farmCurvaAbcCusto } from '../../models/dash-farm/farmCurvaAbcCusto.model'
import { Busca } from './../../globals.services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class farmCurvaAbcCustoService{

  constructor(private Busca:Busca){}

  async getCurvaAbcCusto(){
    return await this.Busca.getHtml<farmCurvaAbcCusto[]>('/curvaabccusto');
  }
}

