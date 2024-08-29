import { Component, OnInit } from '@angular/core';
import { recCirurgiasRealiService } from './../../../services/dash-receitas/recCirurgiasReali.service';
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
  selector: 'app-card-cirurgias-realizadas',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './card-cirurgias-realizadas.component.html',
  styleUrl: './card-cirurgias-realizadas.component.scss'
})
export class CardCirurgiasRealizadasComponent implements OnInit{
  rec : any []=[];
  constructor(private recCirurgiasRealiService : recCirurgiasRealiService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getRecCirurgiasReali(this.filtrodataService.data_de, this.filtrodataService.data_ate);
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
      this.getRecCirurgiasReali(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getRecCirurgiasReali(dataDe : string,dataAte : string){
    (await this.recCirurgiasRealiService.getrecCirurgiasReali(dataDe,dataAte)).subscribe(dados =>{
      // let rec : any[]=[];
      this.rec = this.rec.concat(dados.body)

      let mesano :any[]=[];
      let tipo : any[]=[];
      let totalP : any[]=[];
      let totalS : any[]=[];

      let ano='';
      for(let i=0;i<this.rec.length;i++){
        if(this.rec[i].tipo != 'Secundaria'){
          mesano.push(globalData.gbMeses[parseInt(this.rec[i].mes_ano.substring(8,10))-1]+'/'+this.rec[i].mes_ano.substring(0,4));
        }
        tipo.push(this.rec[i].tipo);
        this.rec[i].tipo == 'Principal' ? totalP.push(this.rec[i].total) : totalS.push(this.rec[i].total);
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
