import { Injectable } from '@angular/core';
import { recIntConv } from '../../models/dash-receitas/recIntConv.model';
import {Busca} from '../../globals.services';

@Injectable({
  providedIn:'root'
})

export class recIntConvService{

  constructor( private Busca : Busca){}

  async getRecIntConv(dataDe: string,dataate : string,tipo : string){
    return await this.Busca.getHtml<recIntConv[]>('/recintconv?datade='+dataDe+'&dataate='+dataate+'&tipo='+tipo)
  }

}


