import { Component} from '@angular/core';

import { CurvaABCComponent } from "./curva-abc/curva-abc.component";
import { MedValidadeComponent } from "./med-validade/med-validade.component";
import { MedDetalhadoComponent } from "./med-detalhado/med-detalhado.component";
import { IonicModule } from '@ionic/angular';
import { FiltrodataService } from '../filtrodata/filtrodata.service';


@Component({
  selector: 'app-dash-farm',
  standalone: true,
  imports: [CurvaABCComponent, MedValidadeComponent, MedDetalhadoComponent,IonicModule],
  templateUrl: './dash-farm.component.html',
  styleUrl: './dash-farm.component.scss'
})

export class DashFarmComponent  {

  constructor( public filtrodataService: FiltrodataService) {
    filtrodataService.data_de = "";
    filtrodataService.data_ate = "";
   }



}
