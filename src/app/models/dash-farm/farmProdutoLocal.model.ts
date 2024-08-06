export interface farmProdutoLocal{
  ds_setor : string,
  lote : string,
  validade : Date,
  qtd : number,
  dias : number,
  total : number
}


export interface AgrupadosPorSetor {
  [key: string]: farmProdutoLocal[];
}
