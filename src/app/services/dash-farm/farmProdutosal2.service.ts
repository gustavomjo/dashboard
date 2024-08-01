
import { farmCotacao } from '../../models/dash-farm/farmCotacao.model';
import { farmNfEntrada } from '../../models/dash-farm/farmNfEntrada.model';
import { farmPedidoSal2 } from '../../models/dash-farm/farmPedidoSal2.model';
import { farmPerda } from '../../models/dash-farm/farmPerda.model';
import { farmProduto } from '../../models/dash-farm/farmProduto.model';
import { farmProdutoSal2 } from '../../models/dash-farm/farmprodutosal2.model';
import { farmSaida } from '../../models/dash-farm/farmSaidas.model';
import { Busca } from './../../globals.services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class farmProdutosal2Service{

  constructor(private Busca:Busca){}

  async getProdutos(cod:any){
    return await this.Busca.getHtml<farmProduto[]>('/produtos?codsal='+cod);
  }

  async getNFEntrada(cod:any){
    return await this.Busca.getHtml<farmNfEntrada[]>('/nfentrada?codsal='+cod);
  }

  async getCotacao(cod:any){
    return await this.Busca.getHtml<farmCotacao[]>('/cotacao?codsal='+cod);
  }

  async getPedidoSal2(cod:any){
    return await this.Busca.getHtml<farmPedidoSal2[]>('/pedidosal2?codsal='+cod);
  }

  async getProdutoSal2(){
    return await this.Busca.getHtml<farmProdutoSal2[]>('/produtosal2');
  }

  async getSaidas(cod:any){
    return await this.Busca.getHtml<farmSaida[]>('/saidas?codsal='+cod);
  }

  async getPerda(cod:any){
    return await this.Busca.getHtml<farmPerda[]>('/perda?codsal='+cod);
  }

}

