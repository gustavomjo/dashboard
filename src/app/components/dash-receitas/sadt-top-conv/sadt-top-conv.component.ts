import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { recIntConvService } from '../../../services/dash-receitas/recIntConv.service';
import { globalCores, globalData } from '../../../globals';

Chart.register(...registerables);
@Component({
  selector: 'app-sadt-top-conv',
  standalone: true,
  imports: [],
  templateUrl: './sadt-top-conv.component.html',
  styleUrl: './sadt-top-conv.component.scss'
})
export class SadtTopConvComponent implements OnInit{
  constructor(private recIntConv : recIntConvService){}
  ngOnInit(): void {
    this.getIntConv(globalData.gbDataHoje,globalData.gbDataHoje,'S');
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
