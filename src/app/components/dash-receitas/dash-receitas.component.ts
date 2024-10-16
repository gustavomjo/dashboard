import { Chart,registerables } from 'chart.js';
import { CUSTOM_ELEMENTS_SCHEMA, Component} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { globalVars  } from '../../global/globals';
import { CardCirurgiasRealizadasComponent } from './card-cirurgias-realizadas/card-cirurgias-realizadas.component';
import { CirurgiasRelizadasConvTopComponent } from './cirurgias-relizadas-conv-top/cirurgias-relizadas-conv-top.component';
import { ReceitasComponent } from './receitas/receitas.component';
import { IntTopConvComponent } from './int-top-conv/int-top-conv.component';
import { ConsTopConvComponent } from './cons-top-conv/cons-top-conv.component';
import { SadtTopConvComponent } from './sadt-top-conv/sadt-top-conv.component';
import { FiltrodataComponent } from '../filtrodata/filtrodata.component';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FiltrodataService } from '../filtrodata/filtrodata.service';


Chart.register(...registerables);

@Component({
  selector: 'app-dash-receitas',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dash-receitas.component.html',
  styleUrl: './dash-receitas.component.scss',
  imports: [ CardCirurgiasRealizadasComponent,
             CirurgiasRelizadasConvTopComponent,
             ReceitasComponent,
             IntTopConvComponent,
             IntTopConvComponent,
             ConsTopConvComponent,
             SadtTopConvComponent,
             FiltrodataComponent ]
})
export class DashReceitasComponent {

  isMobile = globalVars.gbMobile;

  constructor(private BreakpointObserver: BreakpointObserver,
              public filtrodataService: FiltrodataService
  ){
    globalVars.gbMobile = this.BreakpointObserver.isMatched('(max-width: 768px)');
    this.isMobile = globalVars.gbMobile;

    filtrodataService.data_de = "";
    filtrodataService.data_ate = "";
  }

}
