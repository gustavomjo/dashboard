import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PrazoRecDService } from '../../../services/dash/prazorecd.service';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

Chart.register(...registerables);
@Component({
  selector: 'app-card-prazo-med-receb-mes',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-prazo-med-receb-mes.component.html',
  styleUrl: './card-prazo-med-receb-mes.component.scss'
})
export class CardPrazoMedRecebMesComponent implements OnInit {
  prazo : any[]=[];
  private intervalId : any;
  constructor( private prazoRecDService : PrazoRecDService,
               private configService: ConfigService
  ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      // Utiliza a função global para converter segundos para milissegundos
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.intervalId = setInterval(() => {
        this.prazo = [];
        let chartExist = Chart.getChart("_rcPrazoRecD"); // <canvas> id
        if (chartExist != undefined)
          chartExist.destroy();
        this.getPrazoRecDAPI()
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar configuração', error);
    });
  }

  async getPrazoRecDAPI(){
    (await this.prazoRecDService.getPrazoRecD()).subscribe(dados =>{

      // let prazo :any[]=[];
      this.prazo = this.prazo.concat(dados.body)

      let media :any[]=[];
      let mesano :any[]=[];
      if(this.prazo.length >0){
        for(let i=0;i< this.prazo.length;i++){

          mesano.push(this.prazo[i].mesano.substring(5,7)+'/'+this.prazo[i].mesano.substring(0,4));
          media.push(this.prazo[i].media);
        }
        this._rcPrazoRecD(mesano,media);

      }else{
        this.prazo.push({
          mesano:null,
          media:0
        })
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
        plugins: {
          legend: {
            position: 'top',
            display:false
          },
          title: {
            display: true,
            text: 'Prazo Médio'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

  }

}
