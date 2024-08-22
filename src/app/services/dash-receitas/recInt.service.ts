import { Injectable } from '@angular/core';
import { recInt } from '../../models/dash-receitas/recInt.model';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn:'root'
})

export class recIntService{

  constructor( private Busca : Busca){}

  async getRecInt(dataDe: string,dataate : string){
    return await this.Busca.getHtml<recInt[]>('/recint?datade='+dataDe+'&dataate='+dataate)
  }
}

