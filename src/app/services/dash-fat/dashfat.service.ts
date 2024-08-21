import { Injectable } from '@angular/core';
import {Busca} from '../../globals.services';
import { fatTotalAno } from '../../models/dash-fat/fatTotalAno.model';
import { FatSitAnoMes } from '../../models/dash-fat/fatSitAnoMes.model';
import { fatTotalSituacao } from '../../models/dash-fat/fatTotalSituacao.model';

@Injectable({
  providedIn:'root'
})

export class dashFatService{
  constructor (private Busca : Busca
  ){}

  async getFatTotalAno(){
    return await this.Busca.getHtml<fatTotalAno[]>('/fattotalano')
  }

  async getFatSitAnoMes(data_corte : any){
    return await this.Busca.getHtml<FatSitAnoMes[]>('/fatsitanomes?data_corte='+data_corte)
  }

  async getFatTotalSituacao(data_corte : any){
    return await this.Busca.getHtml<fatTotalSituacao[]>('/fattotalsituacao?data_corte='+data_corte)
  }


}

