// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { searchCurvaABC } from './search.cuvaABC.pipe';
import { searchMedicamentos } from './search.medicamentos.pipe';

@NgModule({
  declarations: [searchCurvaABC, searchMedicamentos],
  imports: [CommonModule],
  exports: [searchCurvaABC, searchMedicamentos]
})
export class searchModule {}
