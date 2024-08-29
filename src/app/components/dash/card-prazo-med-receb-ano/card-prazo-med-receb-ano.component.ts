import * as core from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PrazoRecAnoService } from '../../../services/dash/prazorecano.service';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

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
  constructor(private prazoRecAnoService : PrazoRecAnoService){}
  ngOnInit(): void {
    this.getPrazoRecAnoAPI()
  }
  async getPrazoRecAnoAPI(){
    (await this.prazoRecAnoService.getPrazoRecAno()).subscribe(dados =>{
      // let prazoAno :any[]=[];
      this.prazoAno = this.prazoAno.concat(dados.body)

      let media :any[]=[];
      let mesano :any[]=[];
      if(this.prazoAno != null){
        for(let i=0;i< this.prazoAno.length;i++){
          mesano.push(this.prazoAno[i].mesano);
          media.push(this.prazoAno[i].media);
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
