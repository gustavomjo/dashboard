import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PrazoRecDService } from '../../../services/dash/prazorecd.service';
import { globalCores, globalData } from '../../../globals';

Chart.register(...registerables);
@Component({
  selector: 'app-card-prazo-med-receb-mes',
  standalone: true,
  imports: [],
  templateUrl: './card-prazo-med-receb-mes.component.html',
  styleUrl: './card-prazo-med-receb-mes.component.scss'
})
export class CardPrazoMedRecebMesComponent implements OnInit {
  constructor( private prazoRecDService : PrazoRecDService){}
  ngOnInit(): void {
    this.getPrazoRecDAPI(globalData.gbDataHoje,globalData.gbDataHoje)
  }

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

}
