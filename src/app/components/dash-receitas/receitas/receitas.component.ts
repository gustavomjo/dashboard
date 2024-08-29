import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { recIntService } from '../../../services/dash-receitas/recInt.service';
import { FiltrodataService } from '../../filtrodata/filtrodata.service';
import { ActivatedRoute } from '@angular/router';
import { isValid } from 'date-fns';
import { globalData } from '../../../global/global-data';
import { globalCores } from '../../../global/global-cores';
import { SpinnerComponent } from "../../spinner/spinner.component";
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [SpinnerComponent,CommonModule],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent implements OnInit {
  rec : any[]=[];

  constructor(private recInt : recIntService,
              public filtrodataService: FiltrodataService,
              private route: ActivatedRoute){}
  ngOnInit(): void {

    this.filtrodataService.addOnUpdateCallback(() => this.atualiza());
    this.getRecInt(this.filtrodataService.data_de, this.filtrodataService.data_ate);
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
      this.getRecInt(this.filtrodataService.data_de.replace(/-/g, '/'), this.filtrodataService.data_ate.replace(/-/g, '/'));
  }

  async getRecInt(dataDe : string,dataAte : string){
    (await this.recInt.getRecInt(dataDe,dataAte)).subscribe(dados =>{
      // let rec : any[]=[];
      this.rec = this.rec.concat(dados.body)

      let mesano :any[]=[];
      let tipo :any[]=[];
      let totalI : any[]=[];
      let totalP : any[]=[];
      let totalS : any[]=[];

      for(let i=0;i<this.rec.length;i++){
        if( (i==0) || (this.rec[i-1].mes_ano != this.rec[i].mes_ano) ){
          mesano.push(globalData.gbMeses[parseInt(this.rec[i].mes_ano.substring(8,10))-1]+'/'+this.rec[i].mes_ano.substring(0,4));
        }
        tipo.push(this.rec[i].tipo);
        switch(this.rec[i].tipo) {
          case 'I':
            totalI.push(this.rec[i].total);
            break;
          case 'P':
            totalP.push(this.rec[i].total);
            break;
          case 'S':
            totalS.push(this.rec[i].total);
            break;
        }
      }
      this._rcRecInt(mesano,totalI,totalP,totalS);
    })
  }

  _rcRecInt(_mesano:any,_totalI:any,_totalP:any,_totalS:any){
    let chartExist = Chart.getChart("_rcReceitas"); // <canvas> id
    if (chartExist != undefined)
      chartExist.destroy();

    const data = {
      labels: _mesano,
      datasets: [
        {
          label: 'Internação',
          data: _totalI,
          backgroundColor:globalCores.gbCores[1],
        },
        {
          label: 'Consultas',
          data: _totalP,
          backgroundColor:globalCores.gbCores[2],
        },
        {
          label: 'SADT',
          data: _totalS,
          backgroundColor:globalCores.gbCores[3],
        }

      ]
    };

    let myChart = new Chart("_rcReceitas", {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Internações/Consultas/SADT'
          }
        }
      },
    });
  }

}
