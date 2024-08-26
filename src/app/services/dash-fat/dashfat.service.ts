import { Injectable } from '@angular/core';
import {Busca} from '../../global/globals.services';
import { fatTotalAno } from '../../models/dash-fat/fatTotalAno.model';
import { FatSitAnoMes } from '../../models/dash-fat/fatSitAnoMes.model';
import { fatTotalSituacao } from '../../models/dash-fat/fatTotalSituacao.model';
import { fatListPendente } from '../../models/dash-fat/fatListPendente.model';
import { fatConvFaturado } from '../../models/dash-fat/fatConvFaturado.model';

@Injectable({
  providedIn:'root'
})

export class dashFatService{
  constructor (private Busca : Busca
  ){}

  async getFatTotalAno(){
    return await this.Busca.getHtml<fatTotalAno[]>('/fattotalano')
  }

  async getFatSitAnoMes(data_corte : any,dataDe : any,dataAte : any){
    return await this.Busca.getHtml<FatSitAnoMes[]>('/fatsitanomes?data_corte='+data_corte+'&dataDe='+dataDe+'&dataAte='+dataAte)
  }

  async getFatTotalSituacao(data_corte : any,dataDe : any,dataAte : any){
    return await this.Busca.getHtml<fatTotalSituacao[]>('/fattotalsituacao?data_corte='+data_corte+'&dataDe='+dataDe+'&dataAte='+dataAte)
  }

  async getFatListPendente(data_corte : any,dataDe : any,dataAte : any){
    return await this.Busca.getHtml<fatListPendente[]>('/fatlistpendente?data_corte='+data_corte+'&dataDe='+dataDe+'&dataAte='+dataAte)
  }

  async getFatConvFaturados(data_corte : any,dataDe : any,dataAte : any){
    return await this.Busca.getHtml<fatConvFaturado[]>('/fatconvfaturados?data_corte='+data_corte+'&dataDe='+dataDe+'&dataAte='+dataAte)
  }

}


