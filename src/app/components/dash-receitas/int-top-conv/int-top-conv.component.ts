import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { recIntConvService } from '../../../services/dash-receitas/recIntConv.service';
import { globalCores, globalData } from '../../../globals';

Chart.register(...registerables);
@Component({
  selector: 'app-int-top-conv',
  standalone: true,
  imports: [],
  templateUrl: './int-top-conv.component.html',
  styleUrl: './int-top-conv.component.scss'
})
export class IntTopConvComponent implements OnInit {
  constructor( private recIntConv : recIntConvService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getIntConv(globalData.gbDataHoje,globalData.gbDataHoje,'I');
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
