import { Component, OnInit } from '@angular/core';
import { recCirurgiasRealiService } from './../../../services/dash-receitas/recCirurgiasReali.service';
import { globalCores, globalData } from '../../../globals';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);
@Component({
  selector: 'app-card-cirurgias-realizadas',
  standalone: true,
  imports: [],
  templateUrl: './card-cirurgias-realizadas.component.html',
  styleUrl: './card-cirurgias-realizadas.component.scss'
})
export class CardCirurgiasRealizadasComponent implements OnInit{

  constructor(private recCirurgiasRealiService : recCirurgiasRealiService){}
  ngOnInit(): void {
    this.getRecCirurgiasReali(globalData.gbDataHoje,globalData.gbDataHoje);
  }

  async getRecCirurgiasReali(dataDe : string,dataAte : string){
    (await this.recCirurgiasRealiService.getrecCirurgiasReali(dataDe,dataAte)).subscribe(dados =>{
      let rec : any[]=[];
      rec = rec.concat(dados.body)

      let mesano :any[]=[];
      let tipo : any[]=[];
      let totalP : any[]=[];
      let totalS : any[]=[];

      let ano='';
      for(let i=0;i<rec.length;i++){
        if(rec[i].tipo != 'Secundaria'){
          mesano.push(globalData.gbMeses[parseInt(rec[i].mes_ano.substring(8,10))-1]+'/'+rec[i].mes_ano.substring(0,4));
        }
        tipo.push(rec[i].tipo);
        rec[i].tipo == 'Principal' ? totalP.push(rec[i].total) : totalS.push(rec[i].total);
      }
      this._rcRecCirurgiasReali(mesano,tipo,totalP,totalS);
    })
  }

  _rcRecCirurgiasReali(_mesano:any,_tipo:any,_totalP:any,_totalS:any){
    let chartExist = Chart.getChart("_rcRecCirurgiasReali"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const data = {
      labels: _mesano,
      datasets: [
        {
          label: 'Principal',
          data: _totalP,
          backgroundColor:globalCores.gbCores[0],
        },
        {
          label: 'Secundárias',
          data: _totalS,
          backgroundColor:globalCores.gbCores[2],
        },

      ]
    };

    let myChart = new Chart("_rcRecCirurgiasReali", {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Cururgias Realizadas'
          },
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }


}
