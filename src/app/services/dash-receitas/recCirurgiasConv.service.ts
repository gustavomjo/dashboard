import { Injectable } from '@angular/core';
import {Busca} from '../../globals.services';
import { recCirurgiasConv } from '../../models/dash-receitas/recCirurgiasConv.model';


@Injectable({
  providedIn:'root'
})

export class recCirurgiasConvService{
  constructor( private Busca : Busca){}

  async getrecCirurgiasConv(dataDe: string,dataate : string){
    return await this.Busca.getHtml<recCirurgiasConv[]>('/reccirurgiasconv?datade='+dataDe+'&dataate='+dataate)
  }


}
