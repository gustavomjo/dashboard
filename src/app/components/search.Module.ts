// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { searchCurvaABC } from './dash-farm/search/search.cuvaABC.pipe';
import { searchMedicamentos } from './dash-farm/search/search.medicamentos.pipe';
import { searchGrupo } from './dash-farm/search/search.Grupo.pipe';
import { searchVencimento } from './dash-farm/search/search.vencimento.pipe';

@NgModule({
  declarations: [searchCurvaABC, searchMedicamentos, searchGrupo,searchVencimento],
  imports: [CommonModule],
  exports: [searchCurvaABC, searchMedicamentos, searchGrupo,searchVencimento]
})
export class searchModule {}
