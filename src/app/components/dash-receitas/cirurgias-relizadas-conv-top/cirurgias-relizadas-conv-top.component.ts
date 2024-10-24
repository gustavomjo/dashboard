import { Component, OnInit } from '@angular/core';
import { recCirurgiasConvService } from './../../../services/dash-receitas/recCirurgiasConv.service';
import { Chart, registerables } from 'chart.js';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ActivatedRoute } from '@angular/router';
import { isValid } from 'date-fns';
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-cirurgias-relizadas-conv-top',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './cirurgias-relizadas-conv-top.component.html',
  styleUrl: './cirurgias-relizadas-conv-top.component.scss'
})
export class CirurgiasRelizadasConvTopComponent implements OnInit {
  rec : any =[];
  constructor(private recCirurgiasConvService : recCirurgiasConvService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getReceitasConv(this.filtrodataService.data_de, this.filtrodataService.data_ate);
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
      this.getReceitasConv(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getReceitasConv(dataDe : string,dataAte : string){
    (await this.recCirurgiasConvService.getrecCirurgiasConv(dataDe,dataAte)).subscribe(dados =>{
      // let rec : any[]=[];
      this.rec = this.rec.concat(dados.body)

      let conv:any[]=[];
      let total:any[]=[];
      for(let i=0;i<this.rec.length;i++){
        conv.push(this.rec[i].nomconv);
        total.push(this.rec[i].total);
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
