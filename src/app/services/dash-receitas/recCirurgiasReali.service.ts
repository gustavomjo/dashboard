import { Injectable } from '@angular/core';
import {Busca} from '../../globals.services';
import { recCirurgiasReali } from '../../models/dash-receitas/recCirurgiasReali.model';

@Injectable({
  providedIn:'root'
})

export class recCirurgiasRealiService{

  constructor( private Busca : Busca){}

  async getrecCirurgiasReali(dataDe: string,dataate : string){
    return await this.Busca.getHtml<recCirurgiasReali[]>('/reccirurgiasreali?datade='+dataDe+'&dataate='+dataate)

  }
}
