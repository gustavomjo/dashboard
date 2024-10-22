import * as core from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PrazoRecAnoService } from '../../../services/dash/prazorecano.service';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';
import { ConfigService } from '../../../services/config.service';
import { globalVars } from '../../../global/globals';

Chart.register(...registerables);
@core.Component({
  selector: 'app-card-prazo-med-receb-ano',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-prazo-med-receb-ano.component.html',
  styleUrl: './card-prazo-med-receb-ano.component.scss'
})
export class CardPrazoMedRecebAnoComponent implements core.OnInit {
  prazoAno : any[]=[];
  private intervalId : any;
  constructor(private prazoRecAnoService : PrazoRecAnoService,
              private configService: ConfigService
  ){}
  ngOnInit(): void {
    this.configService.getConfig().subscribe(config => {
      // Utiliza a função global para converter segundos para milissegundos
      globalVars.intervalTime = (config.atualizacao || 10) * 1000;
      this.getPrazoRecAnoAPI()
      this.intervalId = setInterval(() => {
        this.prazoAno = [];
        let chartExist = Chart.getChart("_rcPrazoRecAno"); // <canvas> id
        if (chartExist != undefined)
          chartExist.destroy();
        this.getPrazoRecAnoAPI()
      }, globalVars.intervalTime);
    }, error => {
      console.error('Erro ao carregar configuração', error);
    });
  }
  async getPrazoRecAnoAPI(){
    (await this.prazoRecAnoService.getPrazoRecAno()).subscribe(dados =>{
      // let prazoAno :any[]=[];
      this.prazoAno = this.prazoAno.concat(dados.body)

      let media :any[]=[];
      let mesano :any[]=[];
      if(this.prazoAno.length >0){
        for(let i=0;i< this.prazoAno.length;i++){
          mesano.push(this.prazoAno[i].mesano);
          media.push(this.prazoAno[i].media);
        }
        this._rcPrazoRecAno(mesano,media);
      } else{
        this.prazoAno.push({
          mesano:null,
          media:0
        })
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
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
            display:false
          },
          title: {
            display: true,
            text: 'Média do período'
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
