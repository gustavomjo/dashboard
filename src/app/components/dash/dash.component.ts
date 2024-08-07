import { routes } from './../../app.routes';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject, input } from '@angular/core';

import { ReceitaService } from '../../services/dash/receita.service';
import { Chart,registerables } from 'chart.js';
import { CarouselModule  } from 'ngx-bootstrap/carousel';

import { DespesaService } from '../../services/dash/despesa.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PrazoRecDService } from '../../services/dash/prazorecd.service';
import { PrazoRecAnoService } from '../../services/dash/prazorecano.service';
import { CardFaturamentoService } from '../../services/dash/cardfaturamento.service';
import { CardLeitosService } from '../../services/dash/cardleitos.service';
import { CardAtendService } from '../../services/dash/cardatend.service';
import { Router, NavigationEnd  } from '@angular/router';
import { filter } from 'rxjs';
import { moneyReduct,globalData,globalCores } from '../../globals';
import { CardLeitosComponent } from './card-leitos/card-leitos.component';
import { CardFaturamentoComponent } from './card-faturamento/card-faturamento.component';
import { CardAtendimentosComponent } from './card-atendimentos/card-atendimentos.component';
import { CardReceitaNaturezaComponent } from './card-receita-natureza/card-receita-natureza.component';
import { CardCompDespesasComponent } from './card-comp-despesas/card-comp-despesas.component';


Chart.register(...registerables);

@Component({
    selector: 'app-dash',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    providers: [provideNativeDateAdapter()],
    imports: [CommonModule,MatFormFieldModule, MatDatepickerModule,CarouselModule,
              CardLeitosComponent,CardFaturamentoComponent,CardAtendimentosComponent,
              CardReceitaNaturezaComponent,CardCompDespesasComponent
    ]
})
export class DashComponent implements OnInit{
  mesanoDe = new Date();
  mesanoAte = new Date();
  carTime = 5000; // timmer do carrosel consultas/int/sadt
  intervalVal = 10000;//10*(1000*60);
  // timeRefresh = document.getElementById('refreshTime') as HTMLSelectElement;
  intervalId : any;

  constructor(private receitaService : ReceitaService,
              private despesaService : DespesaService,
              private prazoRecDService : PrazoRecDService,
              private prazoRecAnoService : PrazoRecAnoService,
              private cardFaturamento : CardFaturamentoService,
              private cardLeitos : CardLeitosService,
              private cardAtend : CardAtendService,
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
    // this.getReceitasAPI(dtDe,dtAte);
    // this.getDespesaAPI(dtDe,dtAte);
    this.getPrazoRecDAPI(dtDe,dtAte);
    // this.getCardLeitos();
    this.getPrazoRecAnoAPI();
    // this.getCardFaturamento();
    // this.getCardAtend()
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

//-------------------------------------------------------------------
//--------------------------RECEITA----------------------------------
//--------------------------_rcNatureza------------------------------
  // async getReceitasAPI(dataDe : string,dataAte : string){
  //   let labelReceita : any[]=[];
  //   let realReceita :any[]=[];

  //   (await this.receitaService.getReceita(dataDe,dataAte)).subscribe(dados =>{
  //     let receitas :any[]=[];
  //     receitas = receitas.concat(dados.body)

  //     if (receitas!=null){
  //       for(const key of Object.keys(receitas[0]))
  //       {
  //         switch (key)
  //         {
  //           case 'valor_diarias': labelReceita.push('Valor Diaria'); break;
  //           case 'valor_taxas': labelReceita.push('Valor Taxas'); break;
  //           case 'valor_mat_med': labelReceita.push('Valor Mat/Med'); break;
  //           case 'valor_honorarios': labelReceita.push('Valor Honorários'); break;
  //           case 'valor_serv_compl': labelReceita.push('Valor SADT'); break;
  //           case 'valor_pacotes': labelReceita.push('Valor Pacotes'); break;
  //           case 'valor_total': labelReceita.push('Valor Total'); break;
  //         }
  //       }
  //       realReceita=Object.values(receitas[0]);
  //       this._rcNatureza(labelReceita,realReceita);
  //     }
  //   });
  // }
  // //Popular no chart
  // _rcNatureza(_lbReceita:any,_vrReceita:any){
  //   let chartExist = Chart.getChart("_rcNatureza"); // <canvas> id
  //   if (chartExist != undefined)
  //     chartExist.destroy();

  //   let myChart = new Chart("_rcNatureza", {
  //     type: 'bar',
  //     data: {
  //       labels: _lbReceita,
  //       datasets: [{
  //         label: 'Receita por Natureza',
  //         data:  _vrReceita,
  //         backgroundColor:[globalCores.gbCores[0],globalCores.gbCores[1],globalCores.gbCores[2],globalCores.gbCores[3],globalCores.gbCores[4],globalCores.gbCores[5]],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });
  // }

//-------------------------------------------------------------------
//--------------------------DESPESA----------------------------------
//--------------------------_rcDespesa-------------------------------
  // async getDespesaAPI(dataDe : string,dataAte : string){
  //   (await this.despesaService.getDespesa(dataDe,dataAte)).subscribe(dados =>{
  //     let despesa :any[]=[];
  //     despesa = despesa.concat(dados.body)
  //     let dsDespesa :any[]=[];
  //     let vrDespesa :any[]=[];
  //     if(despesa != null){
  //       for(let i=0;i< despesa.length;i++){
  //         dsDespesa.push(despesa[i].ds_subgrupo);
  //         vrDespesa.push(despesa[i].valor);
  //       }
  //       this._rcDespesa(dsDespesa,vrDespesa);
  //     }
  //   })
  // }

  // _rcDespesa(_lbDespesa:any,_vrDespesa:any){
  //   let chartExist = Chart.getChart("_rcDespesa"); // <canvas> id
  //   if (chartExist != undefined)
  //     chartExist.destroy();

  //   const myChart = new Chart("_rcDespesa", {
  //     type: 'bar',
  //     data: {
  //       labels: _lbDespesa,
  //       datasets: [{
  //         label: 'Composição de despesas',
  //         data:  _vrDespesa,
  //         backgroundColor:[globalCores.gbCores[0],globalCores.gbCores[1],globalCores.gbCores[2],globalCores.gbCores[3],globalCores.gbCores[4],globalCores.gbCores[5]],
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       scales: {
  //         y: {
  //           beginAtZero: true
  //         }
  //       }
  //     }
  //   });

  // }

//-------------------------------------------------------------------
//--------------------------PRAZO RECEB. DIAS------------------------
//--------------------------_rcPrazoRecD-----------------------------
  async getPrazoRecDAPI(dataDe : string,dataAte : string){
    (await this.prazoRecDService.getPrazoRecD(dataDe,dataAte)).subscribe(dados =>{

      let prazo :any[]=[];
      prazo = prazo.concat(dados.body)

      let media :any[]=[];
      let mesano :any[]=[];
      if(prazo != null){
        for(let i=0;i< prazo.length;i++){

          mesano.push(prazo[i].mesano.substring(5,7)+'/'+prazo[i].mesano.substring(0,4));
          media.push(prazo[i].media);
        }
        this._rcPrazoRecD(mesano,media);

      }
    })

  }
  _rcPrazoRecD(_lbmesano:any,_media:any){
    let chartExist = Chart.getChart("_rcPrazoRecD"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_rcPrazoRecD", {
      type: 'line',
      data: {
        labels: _lbmesano,
        datasets: [{
          label: 'Prazo Médio',
          data:  _media,
          borderColor :globalCores.gbCores[2],
          backgroundColor:globalCores.gbCoresTransp[2],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }
//-------------------------------------------------------------------
//--------------------------PRAZO RECEB. ANO------------------------
//--------------------------_rcPrazoRecAno-----------------------------
  async getPrazoRecAnoAPI(){
    (await this.prazoRecAnoService.getPrazoRecAno()).subscribe(dados =>{
      let prazoAno :any[]=[];
      prazoAno = prazoAno.concat(dados.body)

      let media :any[]=[];
      let mesano :any[]=[];
      if(prazoAno != null){
        for(let i=0;i< prazoAno.length;i++){
          mesano.push(prazoAno[i].mesano);
          media.push(prazoAno[i].media);
        }
        this._rcPrazoRecAno(mesano,media);
      }
    })
  }
  _rcPrazoRecAno(_mesano:any,_media:any){
    let chartExist = Chart.getChart("_rcPrazoRecAno"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const myChart = new Chart("_rcPrazoRecAno", {
      type: 'bar',
      data: {
        labels: _mesano,
        datasets: [{
          label: 'Média do período',
          data:  _media,
          backgroundColor:[globalCores.gbCores[2],globalCores.gbCores[0]],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  //-------------------------------------------------------------------
  //------------------------------Cards TOP----------------------------
  //-------------------------------------------------------------------

  //------------------------------Leitos----------------------------------
  // async getCardLeitos(){
  //   (await this.cardLeitos.getCardLeitos()).subscribe(dados=>{

  //     let card :any[]=[];
  //     card = card.concat(dados.body)

  //     let v = ( (card[0].total*100)/card[2].total ).toFixed(2);
  //     let lbPorcent = document.getElementById('lbporcent') as HTMLElement;

  //     let lbLeitosD = document.getElementById('lbLeitosD') as HTMLElement;
  //     lbLeitosD.innerHTML = card[0].total.toString();


  //     let v1 = ( (card[1].total*100)/card[2].total ).toFixed(2);
  //     let lbPorcent1 = document.getElementById('lbporcentO') as HTMLElement;

  //     let lbLeitosO = document.getElementById('lbLeitosO') as HTMLElement;
  //     lbLeitosO.innerHTML = card[1].total.toString();

  //     let lbLeitosT = document.getElementById('lbLeitosT') as HTMLElement;
  //     lbLeitosT.innerHTML = card[2].total.toString();
  //   })
  // }


  //---------------------------faturamento-----------------------------
  // async getCardFaturamento(){
  //   (await this.cardFaturamento.getCardFaturamento()).subscribe(dados =>{
  //     let card :any[]=[];
  //     card = card.concat(dados.body)

  //     let arr : any[]=['', 'K', 'M', 'B', 'T', 'q', 'Q'];
  //     let total = 0.00;
  //     let cont =0;

  //     for(let i=0;i<card.length;i++){
  //       cont =0;
  //       total =card[i].total;
  //       card[i].human = moneyReduct(total);
  //     }

  //     let cardfat_mes = document.getElementById('cardfat_mes') as HTMLElement;
  //     cardfat_mes.innerHTML =card[0].human;
  //     let cardfat_mesp = document.getElementById('cardfat_mesp') as HTMLElement;
  //     let cardfat_ano = document.getElementById('cardfat_ano') as HTMLElement;
  //     cardfat_ano.innerHTML =card[2].human;
  //   })
  // }
  //---------------------------Card Atendimento-----------------------------
  // async getCardAtend(){
  //   (await this.cardAtend.getCardAtend()).subscribe(dados =>{
  //     let card :any[]=[];
  //     card = card.concat(dados.body)

  //     let cardConsM = document.getElementById('cardConsultaM') as HTMLElement;
  //     let cardConsA = document.getElementById('cardConsultaA') as HTMLElement;
  //     let cardIntM = document.getElementById('cardIntM') as HTMLElement;
  //     let cardIntA = document.getElementById('cardIntA') as HTMLElement;
  //     let cardSADTM = document.getElementById('cardSADTM') as HTMLElement;
  //     let cardSADTA = document.getElementById('cardSADTA') as HTMLElement;

  //     cardConsM.innerHTML = '0';
  //     cardConsA.innerHTML = '0';
  //     cardIntM.innerHTML = '0';
  //     cardIntA.innerHTML = '0';
  //     cardSADTM.innerHTML = '0';
  //     cardSADTA.innerHTML = '0';

  //     for(let i=0;i<card.length;i++){
  //       switch (card[i].tipo) {
  //         case 'P':
  //           switch (card[i].periodo) {
  //             case 'Este Mes':
  //               cardConsM.innerHTML = card[i].total.toString();
  //               break;
  //             case 'Este Ano':
  //               cardConsA.innerHTML = card[i].total.toString();
  //               break;
  //           }
  //           break;
  //         case 'I':
  //           switch (card[i].periodo) {
  //             case 'Este Mes':
  //               cardIntM.innerHTML = card[i].total.toString();
  //               break;
  //             case 'Este Ano':
  //               cardIntA.innerHTML = card[i].total.toString();
  //               break;
  //           }
  //           break;
  //         case 'S':
  //           switch (card[i].periodo) {
  //             case 'Este Mes':
  //               cardSADTM.innerHTML = card[i].total.toString();
  //               break;
  //             case 'Este Ano':
  //               cardSADTA.innerHTML = card[i].total.toString();
  //               break;
  //           }
  //           break;
  //       }
  //     }
  //   })
  // }
}
