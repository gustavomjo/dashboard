import { Injectable } from '@angular/core';
import { finDRE } from '../../models/dash-fin/finDRE.model';
import {Busca} from '../../global/globals.services';

@Injectable({
  providedIn:'root'
})

export class finDREGrupoService{
  constructor (private Busca : Busca
  ){}

  async getDREGrupo(ano:string){
    return await this.Busca.getHtml<finDRE[]>('/dregrupo?ano='+ano)
  }

  async getDRESubgrupo(ano:string){
    return await this.Busca.getHtml<finDRE[]>('/dresubgrupo?ano='+ano)
  }

  async getDRECC(ano:string){
    return await this.Busca.getHtml<finDRE[]>('/drecc?ano='+ano)
  }
}


