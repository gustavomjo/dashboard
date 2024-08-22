import { Injectable } from '@angular/core';
import { receita } from '../../models/dash/receita.model';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn : 'root'
})
export class ReceitaService{
  constructor( private Busca : Busca){}

  async getReceita(dataDe: string,dataate : string){
    return await this.Busca.getHtml<receita[]>('/receita?datade='+dataDe+'&dataate='+dataate)
  }
}
