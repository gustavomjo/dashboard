import { Injectable } from '@angular/core';
import {Busca} from '../../global/globals.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class ialucService{

  constructor( private Busca : Busca){}

  async ia(question : string){
    return await this.Busca.getHtml<any>('/ia?question='+question)
  }

  async iaListInstrucoes(){
    // console.log('enviando requisicao')
    return await this.Busca.getHtml<any>('/IAInstrucoes');
  }

  upsertInstrucao(codigo: number, tabela: string, tipo: string, campo: string, instrucao: string): Observable<any> {

    const params = new URLSearchParams({
      codigo: codigo > 0 ? codigo.toString() : '0',
      tabela: encodeURIComponent(tabela),
      tipo: encodeURIComponent(tipo),
      campo: encodeURIComponent(campo),
      instrucao: encodeURIComponent(instrucao),
    }).toString();

    if (codigo > 0) {
      // Operação de atualização
      return this.Busca.putComponent('/upsertInstrucao', params);
    } else {
      // Operação de inserção
      return this.Busca.postComponent('/upsertInstrucao', params);
    }
  }


  deleteInstrucao(codigo: number): Observable<any> {
    return this.Busca.deleteRequest(`/deleteInstrucao?codigo=${codigo}`);
  }


}

