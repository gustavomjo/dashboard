import { Injectable } from '@angular/core';
import { finDRE } from '../../models/dash-fin/finDRE.model';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn:'root'
})

export class finDREGrupoService{
  constructor (private Busca : Busca
  ){}

  async getDREGrupo(dataDe: string,dataate : string){
    return await this.Busca.getHtml<finDRE[]>('/dregrupo?datade='+dataDe+'&dataate='+dataate)
  }

  async getDRESubgrupo(dataDe: string,dataate : string){
    return await this.Busca.getHtml<finDRE[]>('/dresubgrupo?datade='+dataDe+'&dataate='+dataate)
  }

  async getDRECC(dataDe: string,dataate : string){
    return await this.Busca.getHtml<finDRE[]>('/drecc?datade='+dataDe+'&dataate='+dataate)
  }

  async getDREReceitaDetail(ano:string,params:string){
    return await this.Busca.getHtml<finDRE[]>('/dredetailsreceita?ano='+ano+params)
  }

  async getDREDespesaDetail(ano:string,params:string){
    return await this.Busca.getHtml<finDRE[]>('/dredetailsdespesa?ano='+ano+params)
  }
  async getDREDespesaFinanceiraDetail(ano:string,params:string){
    return await this.Busca.getHtml<finDRE[]>('/dredetailsdespesafinanceira?ano='+ano+params)
  }
}



