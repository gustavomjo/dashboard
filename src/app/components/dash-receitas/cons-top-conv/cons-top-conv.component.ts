import { Component, OnInit } from '@angular/core';
import { recIntConvService } from '../../../services/dash-receitas/recIntConv.service';
import { globalCores, globalData } from '../../../globals';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-cons-top-conv',
  standalone: true,
  imports: [],
  templateUrl: './cons-top-conv.component.html',
  styleUrl: './cons-top-conv.component.scss'
})
export class ConsTopConvComponent implements OnInit {

  constructor( private recIntConv : recIntConvService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getIntConv(globalData.gbDataHoje,globalData.gbDataHoje,'P');
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

    chartExist = Chart.getChart("_rcConsConv"); // <canvas> id
    chartName = '_rcConsConv'
    txt = 'Consultas - Top 15 Convênios'

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
