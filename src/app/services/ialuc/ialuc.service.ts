import { Injectable } from '@angular/core';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn:'root'
})

export class ialucService{

  constructor( private Busca : Busca){}

  async ia(question : string){
    // console.log('enviando requisicao')
    return await this.Busca.getHtml<any>('/ia?question='+question)
  }

  async iaListInstrucoes(){
    // console.log('enviando requisicao')
    return await this.Busca.getHtml<any>('/IAInstrucoes');
  }


}

