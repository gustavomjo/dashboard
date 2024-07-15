// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { searchCurvaABC } from './search.cuvaABC.pipe';
import { searchMedicamentos } from './search.medicamentos.pipe';
import { searchGrupo } from './search.Grupo.pipe';

@NgModule({
  declarations: [searchCurvaABC, searchMedicamentos, searchGrupo],
  imports: [CommonModule],
  exports: [searchCurvaABC, searchMedicamentos, searchGrupo]
})
export class searchModule {}
