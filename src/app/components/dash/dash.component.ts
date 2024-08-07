import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject, input } from '@angular/core';

import { CarouselModule  } from 'ngx-bootstrap/carousel';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router, NavigationEnd  } from '@angular/router';
import { globalData } from '../../globals';
import { CardLeitosComponent } from './card-leitos/card-leitos.component';
import { CardFaturamentoComponent } from './card-faturamento/card-faturamento.component';
import { CardAtendimentosComponent } from './card-atendimentos/card-atendimentos.component';
import { CardReceitaNaturezaComponent } from './card-receita-natureza/card-receita-natureza.component';
import { CardCompDespesasComponent } from './card-comp-despesas/card-comp-despesas.component';
import { CardPrazoMedRecebMesComponent } from './card-prazo-med-receb-mes/card-prazo-med-receb-mes.component';
import { CardPrazoMedRecebAnoComponent } from './card-prazo-med-receb-ano/card-prazo-med-receb-ano.component';



@Component({
    selector: 'app-dash',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule,MatFormFieldModule, MatDatepickerModule,CarouselModule,
              CardLeitosComponent,CardFaturamentoComponent,CardAtendimentosComponent,
              CardReceitaNaturezaComponent,CardCompDespesasComponent,
              CardPrazoMedRecebMesComponent,CardPrazoMedRecebAnoComponent
    ]
})
export class DashComponent implements OnInit{
  mesanoDe = new Date();
  mesanoAte = new Date();
  carTime = 5000; // timmer do carrosel consultas/int/sadt
  intervalVal = 10000;//10*(1000*60);
  // timeRefresh = document.getElementById('refreshTime') as HTMLSelectElement;
  intervalId : any;

  constructor(
              private rota : Router

            ){ };

  ngOnInit()
  {
    this.upDash(globalData.gbDataHoje,globalData.gbDataHoje);
    this.rota.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (this.rota.url === '/dash') {
          this.startInterval();
        } else {
          this.stopInterval();
        }
      }
    });
  }

  startInterval() {
    this.intervalId = setInterval(() => {
      const _datade = new Date(this.mesanoDe);
      const dataDe = _datade.toLocaleDateString('pt-BR', {  year: 'numeric', month: 'numeric', day: 'numeric' });

      const _dataate = new Date(this.mesanoAte);
      const dataAte = _dataate.toLocaleDateString('pt-BR', {  year: 'numeric', month: 'numeric', day: 'numeric' });


      this.upDash(dataDe,dataAte);
    }, this.intervalVal); // Por exemplo, intervalo de 1 segundo
  }

  stopInterval() {
    clearInterval(this.intervalId);
  }

  public upDash(dtDe: string,dtAte: string){

  }

  public onDateIn(event: any): void {
    this.mesanoDe = event;
    this.mesanoDe=new Date(event);
  }

  public onDateUntil(event: any): void {
    this.mesanoAte = event;
    this.mesanoAte = new Date(event);

    const _datade = new Date(this.mesanoDe);
    const dataDe = _datade.toLocaleDateString('pt-BR', {  year: 'numeric', month: 'numeric', day: 'numeric' });

    const _dataate = new Date(event);
    const dataAte = _dataate.toLocaleDateString('pt-BR', {  year: 'numeric', month: 'numeric', day: 'numeric' });

    if(event != null){
      this.upDash(dataDe,dataAte);
    }
  }

}
