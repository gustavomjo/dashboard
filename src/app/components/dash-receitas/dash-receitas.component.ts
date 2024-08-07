import { Chart,registerables } from 'chart.js';
import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, OnInit, inject, input } from '@angular/core';


import { recCirurgiasConvService } from './../../services/dash-receitas/recCirurgiasConv.service';
import { recCirurgiasRealiService } from './../../services/dash-receitas/recCirurgiasReali.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { recIntService } from '../../services/dash-receitas/recInt.service';
import { recIntConvService } from '../../services/dash-receitas/recIntConv.service';
import { globalData,globalCores,moneyReduct,globalVars  } from '../../globals';
import { CardCirurgiasRealizadasComponent } from './card-cirurgias-realizadas/card-cirurgias-realizadas.component';
import { CirurgiasRelizadasConvTopComponent } from './cirurgias-relizadas-conv-top/cirurgias-relizadas-conv-top.component';


Chart.register(...registerables);

@Component({
  selector: 'app-dash-receitas',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './dash-receitas.component.html',
  styleUrl: './dash-receitas.component.scss',
  imports: [CommonModule,MatFormFieldModule, MatDatepickerModule,MatNativeDateModule, CardCirurgiasRealizadasComponent, CirurgiasRelizadasConvTopComponent ]
})
export class DashReceitasComponent implements OnInit{
  //variaveis de controle de data inserida no datepiker
  mesanoDe = new Date();
  mesanoAte = new Date();

  isMobile = globalVars.gbMobile;

  constructor(//private recCirurgiasRealiService : recCirurgiasRealiService,
              //private recCirurgiasConvService : recCirurgiasConvService,
              private recInt : recIntService,
              private recIntConv : recIntConvService,
              private BreakpointObserver: BreakpointObserver
  ){
    globalVars.gbMobile = this.BreakpointObserver.isMatched('(max-width: 768px)');
    this.isMobile = globalVars.gbMobile;
  }

  ngOnInit(): void {
    //this.getRecCirurgiasReali(globalData.gbDataHoje,globalData.gbDataHoje);
    //this.getReceitasConv(globalData.gbDataHoje,globalData.gbDataHoje);
    this.getRecInt(globalData.gbDataHoje,globalData.gbDataHoje);
    this.getIntConv(globalData.gbDataHoje,globalData.gbDataHoje,'I');
    this.getIntConv(globalData.gbDataHoje,globalData.gbDataHoje,'P');
    this.getIntConv(globalData.gbDataHoje,globalData.gbDataHoje,'S');
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

  // async getRecCirurgiasReali(dataDe : string,dataAte : string){
  //   (await this.recCirurgiasRealiService.getrecCirurgiasReali(dataDe,dataAte)).subscribe(dados =>{
  //     let rec : any[]=[];
  //     rec = rec.concat(dados.body)

  //     let mesano :any[]=[];
  //     let tipo : any[]=[];
  //     let totalP : any[]=[];
  //     let totalS : any[]=[];

  //     let ano='';
  //     for(let i=0;i<rec.length;i++){
  //       if(rec[i].tipo != 'Secundaria'){
  //         mesano.push(globalData.gbMeses[parseInt(rec[i].mes_ano.substring(8,10))-1]+'/'+rec[i].mes_ano.substring(0,4));
  //       }
  //       tipo.push(rec[i].tipo);
  //       rec[i].tipo == 'Principal' ? totalP.push(rec[i].total) : totalS.push(rec[i].total);
  //     }
  //     this._rcRecCirurgiasReali(mesano,tipo,totalP,totalS);
  //   })
  // }

  // _rcRecCirurgiasReali(_mesano:any,_tipo:any,_totalP:any,_totalS:any){
  //   let chartExist = Chart.getChart("_rcRecCirurgiasReali"); // <canvas> id
  //   if (chartExist != undefined)
  //     chartExist.destroy();

  //   const data = {
  //     labels: _mesano,
  //     datasets: [
  //       {
  //         label: 'Principal',
  //         data: _totalP,
  //         backgroundColor:globalCores.gbCores[0],
  //       },
  //       {
  //         label: 'Secundárias',
  //         data: _totalS,
  //         backgroundColor:globalCores.gbCores[2],
  //       },

  //     ]
  //   };

  //   let myChart = new Chart("_rcRecCirurgiasReali", {
  //     type: 'bar',
  //     data: data,
  //     options: {
  //       plugins: {
  //         title: {
  //           display: true,
  //           text: 'Cururgias Realizadas'
  //         },
  //       },
  //       responsive: true,
  //       scales: {
  //         x: {
  //           stacked: true,
  //         },
  //         y: {
  //           stacked: true
  //         }
  //       }
  //     }
  //   });
  // }

  // async getReceitasConv(dataDe : string,dataAte : string){
  //   (await this.recCirurgiasConvService.getrecCirurgiasConv(dataDe,dataAte)).subscribe(dados =>{
  //     let rec : any[]=[];
  //     rec = rec.concat(dados.body)

  //     let conv:any[]=[];
  //     let total:any[]=[];
  //     for(let i=0;i<rec.length;i++){
  //       conv.push(rec[i].nomconv);
  //       total.push(rec[i].total);
  //     }
  //     this._rcRecCirurgiasConv(conv,total);
  //   })
  // }

  // _rcRecCirurgiasConv(conv:any,total:any){
  //   let chartExist = Chart.getChart("_rcRecCirurgiasConv"); // <canvas> id
  //   if (chartExist != undefined)
  //     chartExist.destroy();

  //   const data = {
  //     labels: conv,
  //     datasets: [
  //       {
  //         //label: conv,
  //         data: total,
  //         backgroundColor:globalCores.gbCores
  //       }
  //     ]
  //   };

  //   let myChart = new Chart("_rcRecCirurgiasConv", {
  //     type: 'doughnut',
  //     data: data,
  //     options: {
  //       responsive: true,
  //       plugins: {
  //         legend: {
  //           display:false,
  //           position: 'top',
  //         },
  //         title: {
  //           display: true,
  //           text: 'Cururgias Realizadas - Top 15 Convênios'
  //         }
  //       }
  //     },
  //   })
  // }

  async getRecInt(dataDe : string,dataAte : string){
    (await this.recInt.getRecInt(dataDe,dataAte)).subscribe(dados =>{
      let rec : any[]=[];
      rec = rec.concat(dados.body)

      let mesano :any[]=[];
      let tipo :any[]=[];
      let totalI : any[]=[];
      let totalP : any[]=[];
      let totalS : any[]=[];

      for(let i=0;i<rec.length;i++){
        if( (i==0) || (rec[i-1].mes_ano != rec[i].mes_ano) ){
          mesano.push(globalData.gbMeses[parseInt(rec[i].mes_ano.substring(8,10))-1]+'/'+rec[i].mes_ano.substring(0,4));
        }
        tipo.push(rec[i].tipo);
        switch(rec[i].tipo) {
          case 'I':
            totalI.push(rec[i].total);
            break;
          case 'P':
            totalP.push(rec[i].total);
            break;
          case 'S':
            totalS.push(rec[i].total);
            break;
        }
      }
      this._rcRecInt(mesano,totalI,totalP,totalS);
    })
  }

  _rcRecInt(_mesano:any,_totalI:any,_totalP:any,_totalS:any){
    let chartExist = Chart.getChart("_rcRecInt"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const data = {
      labels: _mesano,
      datasets: [
        {
          label: 'Internação',
          data: _totalI,
          backgroundColor:globalCores.gbCores[1],
        },
        {
          label: 'Consultas',
          data: _totalP,
          backgroundColor:globalCores.gbCores[2],
        },
        {
          label: 'SADT',
          data: _totalS,
          backgroundColor:globalCores.gbCores[3],
        }

      ]
    };

    let myChart = new Chart("_rcRecInt", {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Internações/Consultas/SADT'
          }
        }
      },
    });
  }

  async getIntConv(dataDe : string,dataAte : string,tipo : string){
    (await this.recIntConv.getRecIntConv(dataDe,dataAte,tipo)).subscribe(dados =>{
      let rec : any[]=[];
      rec = rec.concat(dados.body)

      let conv:any[]=[];
      let total:any[]=[];
      for(let i=0;i<rec.length;i++){

        conv.push(rec[i].nomconv);
        total.push(rec[i].total);
      }
      this._rcIntConv(conv,total,tipo);
    })
  }

  _rcIntConv(conv:any,total:any,tipo:any){
    let chartExist : any;
    let chartName = '';
    let txt = '';
    switch(tipo) {
      case 'I':
        chartExist = Chart.getChart("_rcIntConv"); // <canvas> id
        chartName = '_rcIntConv'
        txt = 'Internações - Top 15 Convênios'
        break;
      case 'P':
         chartExist = Chart.getChart("_rcConsConv"); // <canvas> id
         chartName = '_rcConsConv'
         txt = 'Consultas - Top 15 Convênios'
        break;
      case 'S':
         chartExist = Chart.getChart("_rcSADTConv"); // <canvas> id
         chartName = '_rcSADTConv'
         txt = 'Sadt - Top 15 Convênios'
        break;
    }
    if (chartExist != undefined)
      chartExist.destroy();

    const data = {
      labels: conv,
      datasets: [
        {
          //label: conv,
          data: total,
          backgroundColor:globalCores.gbCores
        }
      ]
    };

    let myChart = new Chart(chartName, {
      type: 'doughnut',
      data: data,
      options: {

        responsive: true,

        plugins: {
          legend: {
            display:false,
            position: 'top',
          },
          title: {
            display: true,
            text: txt
          }
        }
      },
    })
  }
}
