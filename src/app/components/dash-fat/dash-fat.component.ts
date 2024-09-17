import { Component } from '@angular/core';
import { CardFatTotalAnoComponent } from "./card-fat-total-ano/card-fat-total-ano.component";
import { CardFatSitAnoMesComponent } from "./card-fat-sit-ano-mes/card-fat-sit-ano-mes.component";
import { CardFatTotalSituacaoComponent } from "./card-fat-total-situacao/card-fat-total-situacao.component";
import { CardListPendenteComponent } from "./card-list-pendente/card-list-pendente.component";
import { CardGraphConvFaturadosComponent } from "./card-graph-conv-faturados/card-graph-conv-faturados.component";
import { Router } from '@angular/router';
import { FiltrodataService } from '../filtrodata/filtrodata.service';
import { FiltrodataComponent } from "../filtrodata/filtrodata.component";
import { provideNativeDateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-dash-fat',
  standalone: true,
  imports: [CardFatTotalAnoComponent,
    CardFatSitAnoMesComponent,
    CardFatTotalSituacaoComponent,
    FiltrodataComponent,
    CardListPendenteComponent,
    CardGraphConvFaturadosComponent],

  templateUrl: './dash-fat.component.html',
  styleUrl: './dash-fat.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DashFatComponent {
  constructor(private rota: Router, public filtrodataService: FiltrodataService) {
    filtrodataService.data_de = "";
    filtrodataService.data_ate = "";
   }
}
