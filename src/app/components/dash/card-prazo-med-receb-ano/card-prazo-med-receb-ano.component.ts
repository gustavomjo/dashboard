import * as core from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PrazoRecAnoService } from '../../../services/dash/prazorecano.service';
import { globalCores, globalData } from '../../../globals';

Chart.register(...registerables);
@core.Component({
  selector: 'app-card-prazo-med-receb-ano',
  standalone: true,
  imports: [],
  templateUrl: './card-prazo-med-receb-ano.component.html',
  styleUrl: './card-prazo-med-receb-ano.component.scss'
})
export class CardPrazoMedRecebAnoComponent implements core.OnInit {
  constructor(private prazoRecAnoService : PrazoRecAnoService){}
  ngOnInit(): void {
    this.getPrazoRecAnoAPI()
  }
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

}
