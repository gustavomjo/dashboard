import { Busca } from '../../globals.services';
import { Injectable } from '@angular/core';
import { ProdutoValidade } from '../../models/dash-farm/farmProdutovalidade.model'

@Injectable({
  providedIn:'root'
})

export class farmProdutoValidadeService{
  constructor(private Busca : Busca){}

  async getProdutoValidade(){
    return await this.Busca.getHtml<ProdutoValidade[]>('/produtosvalidade')
  }
}

