import { Component, OnInit } from '@angular/core';
import { recCirurgiasConvService } from './../../../services/dash-receitas/recCirurgiasConv.service';
import { globalCores, globalData } from '../../../globals';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-cirurgias-relizadas-conv-top',
  standalone: true,
  imports: [],
  templateUrl: './cirurgias-relizadas-conv-top.component.html',
  styleUrl: './cirurgias-relizadas-conv-top.component.scss'
})
export class CirurgiasRelizadasConvTopComponent implements OnInit {

  constructor(private recCirurgiasConvService : recCirurgiasConvService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getReceitasConv(globalData.gbDataHoje,globalData.gbDataHoje);
  }

  async getReceitasConv(dataDe : string,dataAte : string){
    (await this.recCirurgiasConvService.getrecCirurgiasConv(dataDe,dataAte)).subscribe(dados =>{
      let rec : any[]=[];
      rec = rec.concat(dados.body)

      let conv:any[]=[];
      let total:any[]=[];
      for(let i=0;i<rec.length;i++){
        conv.push(rec[i].nomconv);
        total.push(rec[i].total);
      }
      this._rcRecCirurgiasConv(conv,total);
    })
  }

  _rcRecCirurgiasConv(conv:any,total:any){
    let chartExist = Chart.getChart("_rcRecCirurgiasConv"); // <canvas> id
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

    let myChart = new Chart("_rcRecCirurgiasConv", {
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
            text: 'Cururgias Realizadas - Top 15 Convênios'
          }
        }
      },
    })
  }

}
