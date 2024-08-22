import { despesa } from '../../models/dash/despesa.model';
import { Injectable } from '@angular/core';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn : 'root'
})

export class DespesaService{

  constructor( private Busca : Busca){}

  async getDespesa(dataDe: string,dataate : string){
    return await this.Busca.getHtml<despesa[]>('/despesa?datade='+dataDe+'&dataate='+dataate)
  }
}
