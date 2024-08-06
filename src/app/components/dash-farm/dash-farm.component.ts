import { Component} from '@angular/core';

import { CurvaABCComponent } from "./curva-abc/curva-abc.component";
import { MedValidadeComponent } from "./med-validade/med-validade.component";
import { MedDetalhadoComponent } from "./med-detalhado/med-detalhado.component";


@Component({
  selector: 'app-dash-farm',
  standalone: true,
  imports: [CurvaABCComponent, MedValidadeComponent, MedDetalhadoComponent],
  templateUrl: './dash-farm.component.html',
  styleUrl: './dash-farm.component.scss'
})

export class DashFarmComponent  {


}
