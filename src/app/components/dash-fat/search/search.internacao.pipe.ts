import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchInternacao'
})
export class searchInternacao implements PipeTransform {
  transform(value: any[], args?: any): any[] {
    if (!args || args.length < 3 || args.trim() === '') {
      return value;
    }

    args = args.trim().toUpperCase();

    return value.filter((dados: any) => {
      // Verifica se 'cod_internacao' e 'nompac' estão definidos e são strings antes de chamar toUpperCase()
      const codInternacao = dados.cod_internacao ? dados.cod_internacao.toUpperCase() : '';
      const nompac = dados.nompac ? dados.nompac.toUpperCase() : '';

      // Retorna verdadeiro se qualquer um dos campos corresponder ao filtro
      return codInternacao.includes(args) || nompac.includes(args);
    });
  }
}
