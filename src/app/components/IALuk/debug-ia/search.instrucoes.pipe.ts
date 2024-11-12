import { Pipe,PipeTransform } from '@angular/core';

@Pipe({
  name : 'searchInstrucoes'
})
export class searchInstrucoes implements PipeTransform{
  transform(value: any[], searchTable?: string, searchTipo?: string, searchCampo?: string): any[] {
    if (!value) return [];

    if (searchTable) {
      searchTable = searchTable.trim().toUpperCase();
      value = value.filter(item => typeof item.tabela === 'string' && item.tabela.toUpperCase().includes(searchTable));
    }

    if (searchTipo) {
      searchTipo = searchTipo.trim().toUpperCase();
      value = value.filter(item => typeof item.tipo === 'string' && item.tipo.toUpperCase().includes(searchTipo));
    }

    if (searchCampo) {
      searchCampo = searchCampo.trim().toUpperCase();
      value = value.filter(item => typeof item.campo === 'string' && item.campo.toUpperCase().includes(searchCampo));
    }

    return value;
  }

}

