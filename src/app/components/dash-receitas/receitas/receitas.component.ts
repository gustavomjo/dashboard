import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { recIntService } from '../../../services/dash-receitas/recInt.service';
import { globalCores, globalData } from '../../../globals';

Chart.register(...registerables);
@Component({
  selector: 'app-receitas',
  standalone: true,
  imports: [],
  templateUrl: './receitas.component.html',
  styleUrl: './receitas.component.scss'
})
export class ReceitasComponent implements OnInit {

  constructor(private recInt : recIntService){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.getRecInt(globalData.gbDataHoje,globalData.gbDataHoje);
  }

  async getRecInt(dataDe : string,dataAte : string){
    (await this.recInt.getRecInt(dataDe,dataAte)).subscribe(dados =>{
      let rec : any[]=[];
      rec = rec.concat(dados.body)

      let mesano :any[]=[];
      let tipo :any[]=[];
      let totalI : any[]=[];
      let totalP : any[]=[];
      let totalS : any[]=[];

      for(let i=0;i<rec.length;i++){
        if( (i==0) || (rec[i-1].mes_ano != rec[i].mes_ano) ){
          mesano.push(globalData.gbMeses[parseInt(rec[i].mes_ano.substring(8,10))-1]+'/'+rec[i].mes_ano.substring(0,4));
        }
        tipo.push(rec[i].tipo);
        switch(rec[i].tipo) {
          case 'I':
            totalI.push(rec[i].total);
            break;
          case 'P':
            totalP.push(rec[i].total);
            break;
          case 'S':
            totalS.push(rec[i].total);
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
