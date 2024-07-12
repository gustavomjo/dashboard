import { farmProdutoLocal } from './../../models/dash-farm/farmProdutoLocal.model';
import { ProdutoEntradaSaida12 } from './../../models/dash-farm/farmProdutoEntradaSaida12.model';
import { Busca } from './../../globals.services';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn:'root'
})

export class farmDetalheProdutoService{
  constructor(private Busca:Busca){}

  async getEntradaSaida12(codprod:number){
    return await this.Busca.getHtml<ProdutoEntradaSaida12[]>('/farmentradasaida12?codprod='+codprod)
  }

  async getProdutoLocal(codprod:number){
    return await this.Busca.getHtml<farmProdutoLocal[]>('/farmprodutoslocal?codprod='+codprod)
  }
}

