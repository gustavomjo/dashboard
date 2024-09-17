import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FiltrodataService } from '../filtrodata/filtrodata.service';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CardLeitosComponent } from './card-leitos/card-leitos.component';
import { CardFaturamentoComponent } from './card-faturamento/card-faturamento.component';
import { CardAtendimentosComponent } from './card-atendimentos/card-atendimentos.component';
import { CardReceitaNaturezaComponent } from './card-receita-natureza/card-receita-natureza.component';
import { CardCompDespesasComponent } from './card-comp-despesas/card-comp-despesas.component';
import { CardPrazoMedRecebMesComponent } from './card-prazo-med-receb-mes/card-prazo-med-receb-mes.component';
import { CardPrazoMedRecebAnoComponent } from './card-prazo-med-receb-ano/card-prazo-med-receb-ano.component';
import { FiltrodataComponent } from '../filtrodata/filtrodata.component';


@Component({
  selector: 'app-dash',
  standalone: true,
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.scss'],
  providers: [provideNativeDateAdapter()],
  imports: [

    CardLeitosComponent,
    CardFaturamentoComponent,
    CardAtendimentosComponent,
    CardReceitaNaturezaComponent,
    CardCompDespesasComponent,
    CardPrazoMedRecebMesComponent,
    CardPrazoMedRecebAnoComponent,
    FiltrodataComponent
  ]
})
export class DashComponent {
  constructor(private rota: Router, public filtrodataService: FiltrodataService) {
    filtrodataService.data_de = "";
    filtrodataService.data_ate = "";
   }


}
