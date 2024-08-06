import { provideHttpClient } from '@angular/common/http';
import { farmProdutoValidadeService } from './../../services/dash-farm/farmProdutoValidade.service';
import { farmDetalheProdutoService } from './../../services/dash-farm/farmDetalheProduto.service';
import { farmCurvaAbcCustoService } from './../../services/dash-farm/farmCurvaAbcCusto.service';

import { CommonModule} from '@angular/common';
import {  AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

import { Chart,registerables } from 'chart.js';
import { CarouselModule  } from 'ngx-bootstrap/carousel';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { globalCores, globalData } from '../../globals';
import { FormsModule } from '@angular/forms';

import { differenceInDays, parseISO } from 'date-fns';

import { searchModule } from '../search.Module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { farmProdutosal2Service } from '../../services/dash-farm/farmProdutosal2.service';
import { FiltrodataService } from './../filtrodata/filtrodata.service';
import { FiltrodataComponent } from "../filtrodata/filtrodata.component";
import { CurvaABCComponent } from "./curva-abc/curva-abc.component";
import { MedValidadeComponent } from "./med-validade/med-validade.component";
import { MedDetalhadoComponent } from "./med-detalhado/med-detalhado.component";

Chart.register(...registerables);

@Component({
  selector: 'app-dash-farm',
  standalone: true,
  imports: [CurvaABCComponent, MedValidadeComponent, MedDetalhadoComponent],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dash-farm.component.html',
  styleUrl: './dash-farm.component.scss'
})

export class DashFarmComponent  implements OnInit {
  @ViewChildren('progressCircle') progressCircles!: QueryList<ElementRef>;


  constructor( ){}

  ngOnInit(): void {
    // this.getProdutoSal2();
  }

  }
