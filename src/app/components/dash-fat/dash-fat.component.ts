import { Component } from '@angular/core';
import { CardFatTotalAnoComponent } from "./card-fat-total-ano/card-fat-total-ano.component";
import { CardFatSitAnoMesComponent } from "./card-fat-sit-ano-mes/card-fat-sit-ano-mes.component";
import { CardFatTotalSituacaoComponent } from "./card-fat-total-situacao/card-fat-total-situacao.component";
import { FiltrodataComponent } from "../filtrodata/filtrodata.component";
import { CardListPendenteComponent } from "./card-list-pendente/card-list-pendente.component";

@Component({
  selector: 'app-dash-fat',
  standalone: true,
  imports: [CardFatTotalAnoComponent, CardFatSitAnoMesComponent, CardFatTotalSituacaoComponent, FiltrodataComponent, CardListPendenteComponent],
  templateUrl: './dash-fat.component.html',
  styleUrl: './dash-fat.component.scss'
})
export class DashFatComponent {

}
