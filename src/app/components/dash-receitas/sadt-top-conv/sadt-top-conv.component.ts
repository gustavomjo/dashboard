import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { recIntConvService } from '../../../services/dash-receitas/recIntConv.service';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ActivatedRoute } from '@angular/router';
import { isValid } from 'date-fns';
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-sadt-top-conv',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './sadt-top-conv.component.html',
  styleUrl: './sadt-top-conv.component.scss'
})
export class SadtTopConvComponent implements OnInit{
  rec : any[]=[];
  constructor(private recIntConv : recIntConvService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute){}
  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getIntConv(this.filtrodataService.data_de, this.filtrodataService.data_ate,'S');
  }

  public atualiza(): void {
    let rota = ['dash-receitas', 'dash-user'].includes(this.route.snapshot.routeConfig?.path || '');
    if (!rota) return;

    let dataDe: Date = globalData.convertToDate(this.filtrodataService.data_de);
    let dataAte: Date = globalData.convertToDate(this.filtrodataService.data_ate);

    let valid = dataDe < globalData.gbData_atual &&
                (isValid(dataDe) && isValid(dataAte)) &&
                dataAte >= dataDe;

    if (valid)
      this.getIntConv(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'),'S');
  }

  async getIntConv(dataDe : string,dataAte : string,tipo : string){
    (await this.recIntConv.getRecIntConv(dataDe,dataAte,tipo)).subscribe(dados =>{
      // let rec : any[]=[];
      this.rec = this.rec.concat(dados.body)

      let conv:any[]=[];
      let total:any[]=[];
      for(let i=0;i<this.rec.length;i++){

        conv.push(this.rec[i].nomconv);
        total.push(this.rec[i].total);
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
