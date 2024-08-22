import { farmCurvaAbcCusto } from '../../models/dash-farm/farmCurvaAbcCusto.model'
import { Busca } from '../../global/globals.services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class farmCurvaAbcCustoService{

  constructor(private Busca:Busca){}

  async getCurvaAbcCusto(dataDe: string,dataate : string){
    return await this.Busca.getHtml<farmCurvaAbcCusto[]>('/curvaabccusto?datade='+dataDe+'&dataate='+dataate);
  }
}

