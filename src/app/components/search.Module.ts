// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { searchCurvaABC } from './dash-farm/search/search.cuvaABC.pipe';
import { searchMedicamentos } from './dash-farm/search/search.medicamentos.pipe';
import { searchGrupo } from './dash-farm/search/search.Grupo.pipe';
import { searchVencimento } from './dash-farm/search/search.vencimento.pipe';
import { searchInternacao } from './dash-fat/search/search.internacao.pipe';
import { searchConvenio } from './dash-fat/search/search.conv.pipe';

@NgModule({
  declarations: [searchCurvaABC,searchMedicamentos, searchGrupo,searchVencimento,
                 searchInternacao,searchConvenio
  ],
  imports: [CommonModule],
  exports: [searchCurvaABC, searchMedicamentos, searchGrupo,searchVencimento,
            searchInternacao,searchConvenio
  ]
})
export class searchModule {}
